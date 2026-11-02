import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import localPhotoDb, { fileToDataUrl } from '@/services/localPhotoDb';

const BUCKET_NAME = 'site-photos';

export const photoService = {
	/**
	 * Fetch all photos for a specific page section.
	 * 1. Checks Supabase cloud database if configured.
	 * 2. If unconfigured or empty, checks local persistent IndexedDB storage.
	 * 3. Returns null if neither has custom entries (triggering fallback to default images).
	 */
	async fetchSectionPhotos(pageId, sectionId) {
		// 1. Try Hostinger Server API first (persisted cross-device source of truth)
		try {
			const res = await fetch(`/api/photos.php?pageId=${encodeURIComponent(pageId)}&sectionId=${encodeURIComponent(sectionId)}&t=${Date.now()}`);
			if (res.ok) {
				const serverData = await res.json();
				if (serverData && Array.isArray(serverData) && serverData.length > 0) {
					try {
						await localPhotoDb.saveSectionPhotos(pageId, sectionId, serverData);
					} catch (_) {}
					return serverData;
				}
			}
		} catch (_) {
			// Hostinger API unreachable or local dev mode
		}

		// 2. Try Supabase Cloud Database first
		if (isSupabaseConfigured && supabase) {
			try {
				const { data, error } = await supabase
					.from('site_photos')
					.select('*')
					.eq('page_id', pageId)
					.eq('section_id', sectionId)
					.eq('is_active', true)
					.order('sort_order', { ascending: true })
					.order('created_at', { ascending: true });

				if (!error && data && data.length > 0) {
					return data.map((row) => ({
						id: row.id,
						src: row.image_url,
						alt: row.alt_text || '',
						title: row.title || '',
						sortOrder: row.sort_order ?? 0,
						storagePath: row.storage_path,
						createdAt: row.created_at,
						source: 'cloud',
					}));
				}
			} catch (cloudErr) {
				console.warn('Supabase fetch failed, trying local storage:', cloudErr);
			}
		}

		// 2. Check local persistent IndexedDB storage
		try {
			const local = await localPhotoDb.getSectionPhotos(pageId, sectionId);
			if (local !== null && Array.isArray(local)) {
				return local;
			}
		} catch (localErr) {
			console.warn('Local storage read error:', localErr);
		}

		return null;
	},

	/**
	 * Reset a section back to its original default photos.
	 */
	async restoreDefaultPhotos(pageId, sectionId) {
		await localPhotoDb.removeSectionOverride(pageId, sectionId);
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('site_photos').delete().eq('page_id', pageId).eq('section_id', sectionId);
			} catch (_) {}
		}
		return null;
	},

	/**
	 * Upload a new image file.
	 * Saves to Supabase Cloud if configured; otherwise saves to IndexedDB persistent storage.
	 */
	async uploadPhoto(file, { pageId, sectionId, title = '', altText = '', sortOrder = 0, existingPhotos = [] }) {
		// 1. If Supabase is configured, upload to cloud storage
		if (isSupabaseConfigured && supabase) {
			const ext = file.name.split('.').pop() || 'jpg';
			const cleanName = file.name
				.replace(/\.[^/.]+$/, '')
				.replace(/[^a-zA-Z0-9]/g, '_')
				.toLowerCase();
			const filePath = `${pageId}/${sectionId}/${Date.now()}_${cleanName}.${ext}`;

			const { error: uploadError } = await supabase.storage
				.from(BUCKET_NAME)
				.upload(filePath, file, {
					cacheControl: '31536000',
					upsert: false,
				});

			if (uploadError) throw uploadError;

			const { data: urlData } = supabase.storage
				.from(BUCKET_NAME)
				.getPublicUrl(filePath);

			const publicUrl = urlData.publicUrl;

			const { data: record, error: dbError } = await supabase
				.from('site_photos')
				.insert([
					{
						page_id: pageId,
						section_id: sectionId,
						title,
						alt_text: altText,
						image_url: publicUrl,
						storage_path: filePath,
						sort_order: sortOrder,
						is_active: true,
					},
				])
				.select()
				.single();

			if (dbError) {
				await supabase.storage.from(BUCKET_NAME).remove([filePath]);
				throw dbError;
			}

			const created = {
				id: record.id,
				src: record.image_url,
				alt: record.alt_text || '',
				title: record.title || '',
				sortOrder: record.sort_order ?? 0,
				storagePath: record.storage_path,
				source: 'cloud',
			};

			// Also cache locally for instant offline access
			try {
				const isSingle = sectionId !== 'home_gallery' && sectionId !== 'authentic_gallery';
				const current = await localPhotoDb.getSectionPhotos(pageId, sectionId) || existingPhotos || [];
				const list = isSingle ? [created] : [...current, created];
				await localPhotoDb.saveSectionPhotos(pageId, sectionId, list);
			} catch (_) {}

			return created;
		}

		// 2. Try Hostinger Server Upload API
		let serverPhotoUrl = '';
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await fetch('/api/upload.php', { method: 'POST', body: formData });
			if (res.ok) {
				const uploadData = await res.json();
				if (uploadData && uploadData.url) {
					serverPhotoUrl = uploadData.url;
				}
			}
		} catch (_) {}

		const finalSrc = serverPhotoUrl || (await fileToDataUrl(file));
		const newId = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

		const newPhoto = {
			id: newId,
			src: finalSrc,
			alt: altText,
			title,
			sortOrder,
			storagePath: '',
			source: serverPhotoUrl ? 'server' : 'local',
			createdAt: new Date().toISOString(),
		};

		const current = (await localPhotoDb.getSectionPhotos(pageId, sectionId)) || existingPhotos || [];
		const isSingle = sectionId !== 'home_gallery' && sectionId !== 'authentic_gallery';
		const updatedList = isSingle ? [newPhoto] : [...current, newPhoto];
		await localPhotoDb.saveSectionPhotos(pageId, sectionId, updatedList);

		// Persist to Hostinger Server API
		try {
			await fetch('/api/photos.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					pageId,
					sectionId,
					photos: updatedList,
				}),
			});
		} catch (_) {}

		return newPhoto;
	},

	/**
	 * Update an existing photo or replace its image file.
	 * Can update both custom photos and default templates.
	 */
	async updatePhoto(targetPhoto, updates, newFile = null, { pageId, sectionId, allPhotos = [] }) {
		let newImageUrl = targetPhoto.src;
		let newStoragePath = targetPhoto.storagePath || '';

		// 1. If a new image file was provided, upload or convert it
		if (newFile) {
			if (isSupabaseConfigured && supabase) {
				const ext = newFile.name.split('.').pop() || 'jpg';
				const cleanName = newFile.name
					.replace(/\.[^/.]+$/, '')
					.replace(/[^a-zA-Z0-9]/g, '_')
					.toLowerCase();
				const filePath = `${pageId}/${sectionId}/${Date.now()}_${cleanName}.${ext}`;

				const { error: uploadError } = await supabase.storage
					.from(BUCKET_NAME)
					.upload(filePath, newFile, {
						cacheControl: '31536000',
						upsert: false,
					});

				if (!uploadError) {
					const { data: urlData } = supabase.storage
						.from(BUCKET_NAME)
						.getPublicUrl(filePath);
					newImageUrl = urlData.publicUrl;
					newStoragePath = filePath;

					// Remove old storage file if it existed
					if (targetPhoto.storagePath) {
						supabase.storage.from(BUCKET_NAME).remove([targetPhoto.storagePath]).catch(() => {});
					}
				}
			} else {
				// Convert to persistent Data URL
				newImageUrl = await fileToDataUrl(newFile);
			}
		}

		const isCloudRecord = targetPhoto.id && !String(targetPhoto.id).startsWith('local_') && targetPhoto.source === 'cloud';

		// 2. If it's a cloud record in Supabase
		if (isCloudRecord && isSupabaseConfigured && supabase) {
			const dbUpdates = {};
			if (updates.title !== undefined) dbUpdates.title = updates.title;
			if (updates.altText !== undefined) dbUpdates.alt_text = updates.altText;
			if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;
			if (newFile) {
				dbUpdates.image_url = newImageUrl;
				dbUpdates.storage_path = newStoragePath;
			}
			dbUpdates.updated_at = new Date().toISOString();

			const { data, error } = await supabase
				.from('site_photos')
				.update(dbUpdates)
				.eq('id', targetPhoto.id)
				.select()
				.single();

			if (error) {
				console.error('Supabase update failed:', error);
				throw error;
			}

			const updated = {
				id: data.id,
				src: data.image_url,
				alt: data.alt_text || '',
				title: data.title || '',
				sortOrder: data.sort_order ?? 0,
				storagePath: data.storage_path,
				source: 'cloud',
			};

			// Sync to local cache
			const localCurrent = (await localPhotoDb.getSectionPhotos(pageId, sectionId)) || allPhotos;
			const updatedLocalList = localCurrent.map((p) => (p.id === targetPhoto.id ? updated : p));
			await localPhotoDb.saveSectionPhotos(pageId, sectionId, updatedLocalList);

			return updated;
		}

		// 3. Local / Offline mode or converting a default template into a stored photo
		const generatedId = targetPhoto.id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
		const updatedPhoto = {
			...targetPhoto,
			id: generatedId,
			src: newImageUrl,
			title: updates.title !== undefined ? updates.title : targetPhoto.title,
			alt: updates.altText !== undefined ? updates.altText : targetPhoto.alt,
			sortOrder: updates.sortOrder !== undefined ? Number(updates.sortOrder) : (targetPhoto.sortOrder || 0),
			storagePath: newStoragePath,
			source: 'local',
			updatedAt: new Date().toISOString(),
		};

		// Update the list of photos for this section
		const baseList = (await localPhotoDb.getSectionPhotos(pageId, sectionId)) || allPhotos || [];
		const isSingle = sectionId !== 'home_gallery' && sectionId !== 'authentic_gallery';
		let found = false;
		let updatedList = baseList.map((p) => {
			if ((targetPhoto.id && p.id === targetPhoto.id) || (p.src && targetPhoto.src && p.src === targetPhoto.src)) {
				found = true;
				return updatedPhoto;
			}
			return p;
		});

		if (isSingle) {
			updatedList = [updatedPhoto];
		} else if (!found) {
			updatedList.push(updatedPhoto);
		}

		await localPhotoDb.saveSectionPhotos(pageId, sectionId, updatedList);
		return updatedPhoto;
	},

	/**
	 * Permanently delete a photo: removes the DB record, purges storage file, and updates local store.
	 */
	async deletePhoto(targetPhoto, { pageId, sectionId, allPhotos = [] }) {
		// 1. Delete from Supabase if cloud record
		if (isSupabaseConfigured && supabase && targetPhoto.id && !String(targetPhoto.id).startsWith('local_')) {
			try {
				await supabase.from('site_photos').delete().eq('id', targetPhoto.id);
				if (targetPhoto.storagePath) {
					await supabase.storage.from(BUCKET_NAME).remove([targetPhoto.storagePath]);
				}
			} catch (cloudErr) {
				console.warn('Supabase delete error:', cloudErr);
			}
		}

		// 2. Remove from local persistent storage
		const current = (await localPhotoDb.getSectionPhotos(pageId, sectionId)) || allPhotos || [];
		const filtered = current.filter((p) => {
			if (targetPhoto.id && p.id) {
				return p.id !== targetPhoto.id;
			}
			return p.src !== targetPhoto.src;
		});

		await localPhotoDb.saveSectionPhotos(pageId, sectionId, filtered);
		return true;
	},

	/**
	 * Batch reorder photos
	 */
	async reorderPhotos(orderedPhotos, { pageId, sectionId }) {
		// Save to local storage first for instant feedback
		await localPhotoDb.saveSectionPhotos(pageId, sectionId, orderedPhotos);

		// If cloud is active, sync sort order to cloud
		if (isSupabaseConfigured && supabase) {
			const updates = orderedPhotos
				.filter((photo) => photo.id && !String(photo.id).startsWith('local_'))
				.map((photo, index) =>
					supabase
						.from('site_photos')
						.update({ sort_order: index, updated_at: new Date().toISOString() })
						.eq('id', photo.id)
				);

			await Promise.all(updates).catch((err) => console.warn('Cloud reorder failed:', err));
		}
	},
};

export default photoService;
