import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import localPhotoDb, { fileToDataUrl, ensureHostedImageUrl } from '@/services/localPhotoDb';

const BUCKET_NAME = 'site-photos';

export const DEFAULT_POPUP_SETTINGS = {
	id: 'main_popup',
	is_enabled: true,
	image_url: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=768&fit=crop',
	storage_path: '',
	target_url: '/authentic-vedic-pooja-dubai',
	title: 'Authentic Vedic Pooja Vidhi & Ritual Information',
	delay_seconds: 3,
};

export const popupService = {
	/**
	 * Fetch current popup settings from Hostinger Server API, Supabase, or local persistent storage.
	 */
	async fetchPopupSettings() {
		// 1. Try Hostinger Server API first (cross-device source of truth for all visitors)
		try {
			const res = await fetch(`/api/popup.php?t=${Date.now()}`);
			if (res.ok) {
				const serverData = await res.json();
				if (serverData && serverData.image_url) {
					const merged = { ...DEFAULT_POPUP_SETTINGS, ...serverData };
					// Cache locally quietly without re-broadcasting or posting back
					try {
						await localPhotoDb.savePopupSettings(merged, false);
					} catch (_) {}
					return merged;
				}
			}
		} catch (_) {
			// Hostinger API unreachable or running on local dev server without PHP
		}

		// 2. Try Supabase Cloud Database if configured
		if (isSupabaseConfigured && supabase) {
			try {
				const { data, error } = await supabase
					.from('popup_settings')
					.select('*')
					.eq('id', 'main_popup')
					.maybeSingle();

				if (!error && data) {
					await localPhotoDb.savePopupSettings(data, false);
					return data;
				}
			} catch (cloudErr) {
				console.warn('Supabase fetchPopupSettings failed, reading local:', cloudErr);
			}
		}

		// 3. Read IndexedDB (authoritative local database with no 5MB quota limitation)
		try {
			const idbData = await localPhotoDb.getPopupSettings();
			if (idbData && idbData.image_url) {
				return { ...DEFAULT_POPUP_SETTINGS, ...idbData };
			}
		} catch (_) {}

		// 4. Fallback to synchronous localStorage cache
		try {
			const syncLocal = localPhotoDb.getPopupSettingsSync();
			if (syncLocal && syncLocal.image_url) {
				return { ...DEFAULT_POPUP_SETTINGS, ...syncLocal };
			}
		} catch (_) {}

		return DEFAULT_POPUP_SETTINGS;
	},

	/**
	 * Upload a promotional banner image (Hostinger Server, Cloud, or Local Data URL).
	 */
	async uploadPopupImage(file) {
		// 1. Try Hostinger Server Upload API
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await fetch('/api/upload.php', {
				method: 'POST',
				body: formData,
			});
			if (res.ok) {
				const data = await res.json();
				if (data && data.url) {
					return {
						publicUrl: data.url,
						storagePath: data.filename || '',
					};
				}
			}
		} catch (_) {
			// Fallback to other providers
		}

		// 2. Try Supabase if configured
		if (isSupabaseConfigured && supabase) {
			try {
				const ext = file.name.split('.').pop() || 'jpg';
				const cleanName = file.name
					.replace(/\.[^/.]+$/, '')
					.replace(/[^a-zA-Z0-9]/g, '_')
					.toLowerCase();
				const filePath = `popup/${Date.now()}_${cleanName}.${ext}`;

				const { error: uploadError } = await supabase.storage
					.from(BUCKET_NAME)
					.upload(filePath, file, {
						cacheControl: '31536000',
						upsert: false,
					});

				if (!uploadError) {
					const { data: urlData } = supabase.storage
						.from(BUCKET_NAME)
						.getPublicUrl(filePath);

					return {
						publicUrl: urlData.publicUrl,
						storagePath: filePath,
					};
				}
			} catch (_) {}
		}

		// 3. Local persistent mode (compressed data URL)
		const dataUrl = await fileToDataUrl(file);
		return {
			publicUrl: dataUrl,
			storagePath: '',
		};
	},

	/**
	 * Save updated popup settings (Hostinger Server, Cloud & Local).
	 */
	async savePopupSettings(settings) {
		let finalImageUrl = settings.image_url || DEFAULT_POPUP_SETTINGS.image_url;

		// Convert any Base64 data URL to hosted server file
		if (finalImageUrl && finalImageUrl.startsWith('data:image/')) {
			finalImageUrl = await ensureHostedImageUrl(finalImageUrl);
		}

		const payload = {
			id: 'main_popup',
			is_enabled: Boolean(settings.is_enabled),
			image_url: finalImageUrl,
			storage_path: settings.storage_path || '',
			target_url: settings.target_url || DEFAULT_POPUP_SETTINGS.target_url,
			title: settings.title !== undefined ? settings.title : DEFAULT_POPUP_SETTINGS.title,
			delay_seconds: Number(settings.delay_seconds) || 3,
			updated_at: new Date().toISOString(),
		};

		// 1. Save to Hostinger Server API so all visitors see updates immediately
		try {
			const res = await fetch('/api/popup.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			let saved = null;
			try {
				saved = await res.json();
			} catch (_) {}

			if (!res.ok || !saved || saved.success === false) {
				const errMsg = (saved && saved.error) ? saved.error : `Popup API save failed (HTTP ${res.status})`;
				throw new Error(errMsg);
			}
			payload.image_url = saved.image_url || payload.image_url;
			payload.updated_at = saved.updated_at || payload.updated_at;
		} catch (serverErr) {
			console.error('Hostinger popup settings could not be saved:', serverErr);
			// On the live site, do not report success when the cross-device source of truth failed.
			if (import.meta.env.PROD) {
				throw serverErr;
			}
		}

		// 2. Always save to local persistent storage and broadcast change
		await localPhotoDb.savePopupSettings(payload, true);

		// 3. If Cloud is active, upsert to Supabase
		if (isSupabaseConfigured && supabase) {
			try {
				const { data, error } = await supabase
					.from('popup_settings')
					.upsert(payload, { onConflict: 'id' })
					.select()
					.single();

				if (!error && data) {
					return data;
				}
			} catch (cloudErr) {
				console.warn('Could not sync popup to cloud:', cloudErr);
			}
		}

		return payload;
	},
};

export default popupService;
