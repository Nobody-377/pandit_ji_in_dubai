import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import localPhotoDb, { fileToDataUrl } from '@/services/localPhotoDb';

/**
 * Mapping between service IDs and their corresponding page sections
 * so photos stay perfectly synchronized between the individual pooja landing
 * pages and the pooja service cards in both the website and admin panel.
 */
export const SERVICE_SECTION_MAP = {
	srv_griha_pravesh: [{ pageId: 'griha-pravesh-and-vastu', sectionId: 'grihapravesh_feature' }],
	srv_wedding: [
		{ pageId: 'wedding-ceremonies', sectionId: 'wedding_feature_1' },
		{ pageId: 'wedding-ceremonies', sectionId: 'wedding_feature_2' }
	],
	srv_shanti_havan: [
		{ pageId: 'shanti-havan-and-yagna', sectionId: 'shantihavan_feature' },
		{ pageId: 'shanti-havan-and-yagna', sectionId: 'shantihavan_benefits' }
	],
	srv_satyanarayan: [{ pageId: 'satyanarayan-and-festivals', sectionId: 'satyanarayan_feature' }],
	srv_rudrabhishek: [{ pageId: 'rudrabhishek-and-planets', sectionId: 'rudrabhishek_feature' }],
	srv_car_pooja: [{ pageId: 'car-pooja-in-dubai-vehicle-pooja-in-dubai', sectionId: 'carpooja_feature' }],
	srv_pitru_paksha: [{ pageId: 'pitru-paksha-pooja-dubai', sectionId: 'pitrupaksha_feature' }],
};

export const DEFAULT_POOJA_SERVICES = [
	{
		id: 'srv_griha_pravesh',
		title: 'Griha Pravesh & Vastu Shanti',
		badge: 'Housewarming',
		description: 'Establish peace and positive vibrations in your new home with authentic Vedic Griha Pravesh, Vastu Pooja, and Navagraha Havan.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=768&fit=crop',
		targetUrl: '/griha-pravesh-and-vastu',
		buttonText: 'View Details & Vidhi',
		isActive: true,
		sortOrder: 1,
		isDefault: true,
		createdAt: '2026-01-01T00:00:00.000Z',
	},
	{
		id: 'srv_wedding',
		title: 'Vedic Wedding Ceremonies (Vivah)',
		badge: 'Sacred Union',
		description: 'Complete Hindu wedding rituals including Jaimala, Kanyadaan, Saptapadi (7 sacred pheras), and Sindoor Daan as per Vedic scriptures.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/bjsvd5-Pm2XA7u3Bhsxt41k.png?width=768&fit=crop',
		targetUrl: '/wedding-ceremonies',
		buttonText: 'View Details & Vidhi',
		isActive: true,
		sortOrder: 2,
		isDefault: true,
		createdAt: '2026-01-02T00:00:00.000Z',
	},
	{
		id: 'srv_shanti_havan',
		title: 'Griha Shanti Havan & Yagna',
		badge: 'Purification',
		description: 'Powerful sacred fire ceremonies to dispel negative energy, calm planetary disturbances, and bring auspicious blessings to the entire family.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-FPqXfKUnedc9mRXi.png?width=768&fit=crop',
		targetUrl: '/shanti-havan-and-yagna',
		buttonText: 'View Details & Vidhi',
		isActive: true,
		sortOrder: 3,
		isDefault: true,
		createdAt: '2026-01-03T00:00:00.000Z',
	},
	{
		id: 'srv_satyanarayan',
		title: 'Satyanarayan Katha & Festivals',
		badge: 'Devotion',
		description: 'Auspicious recitation of the 5 adhyayas of Lord Satyanarayan Katha with Panchamrit, Sheera prasad, and Aarti for family well-being.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-Wer3mZjaMh9kGTR9.png?width=768&fit=crop',
		targetUrl: '/satyanarayan-and-festivals',
		buttonText: 'View Details & Vidhi',
		isActive: true,
		sortOrder: 4,
		isDefault: true,
		createdAt: '2026-01-04T00:00:00.000Z',
	},
	{
		id: 'srv_rudrabhishek',
		title: 'Shiva Rudrabhishek & Planets',
		badge: 'Health & Peace',
		description: 'Abhishek of Lord Shiva with panchamrit, bilva patra, sugarcane juice, and Vedic Rudri path chanting to overcome difficulties and health issues.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=768&fit=crop',
		targetUrl: '/rudrabhishek-and-planets',
		buttonText: 'View Details & Vidhi',
		isActive: true,
		sortOrder: 5,
		isDefault: true,
		createdAt: '2026-01-05T00:00:00.000Z',
	},
	{
		id: 'srv_car_pooja',
		title: 'Car & Vehicle Pooja (Vahan Pooja)',
		badge: 'Divine Protection',
		description: 'Swastika blessing, lemon ritual, coconut breaking, and Lord Ganesha blessings for accident-free and prosperous travels in Dubai & UAE.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-2VtWj9NpLbLZZmNI.png?width=768&fit=crop',
		targetUrl: '/car-pooja-in-dubai-vehicle-pooja-in-dubai',
		buttonText: 'View Details & Vidhi',
		isActive: true,
		sortOrder: 6,
		isDefault: true,
		createdAt: '2026-01-06T00:00:00.000Z',
	},
	{
		id: 'srv_pitru_paksha',
		title: 'Pitru Paksha Pooja & Shradh Tarpan',
		badge: 'Ancestral Peace',
		description: 'Sacred ancestral offerings, Pind Daan, and Pitru Tarpan rituals performed with Vedic devotion to bring peace to departed souls.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/vczdfl-K9nbyFiOC3NqnzYB.png?width=768&fit=crop',
		targetUrl: '/pitru-paksha-pooja-dubai',
		buttonText: 'View Details & Vidhi',
		isActive: true,
		sortOrder: 7,
		isDefault: true,
		createdAt: '2026-01-07T00:00:00.000Z',
	},
	{
		id: 'srv_office_business',
		title: 'Office & Business Opening Pooja',
		badge: 'Prosperity',
		description: 'Vastu purification and Lakshmi-Ganesh invocation for new shops, offices, warehouses, and commercial establishments in Dubai.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=768&fit=crop',
		targetUrl: '/book-pandit-in-dubai',
		buttonText: 'Book This Pooja',
		isActive: true,
		sortOrder: 8,
		isDefault: true,
		createdAt: '2026-01-08T00:00:00.000Z',
	},
];

/**
 * Reconcile services with section photos and correct any legacy mismatched URLs.
 */
async function syncWithSectionPhotosAndDefaults(services) {
	if (!Array.isArray(services)) return services;
	let changed = false;
	const defaultMap = new Map(DEFAULT_POOJA_SERVICES.map((d) => [d.id, d]));

	const updated = await Promise.all(
		services.map(async (srv) => {
			const def = defaultMap.get(srv.id);
			let nextUrl = srv.imageUrl;

			// 1. If service image is missing, adopt from mapped section photo
			const mappings = SERVICE_SECTION_MAP[srv.id];
			if (mappings && !nextUrl) {
				const mapList = Array.isArray(mappings) ? mappings : [mappings];
				for (const m of mapList) {
					try {
						const sectionPhotos = await localPhotoDb.getSectionPhotos(m.pageId, m.sectionId);
						if (sectionPhotos && Array.isArray(sectionPhotos) && sectionPhotos.length > 0 && sectionPhotos[0]?.src) {
							nextUrl = sectionPhotos[sectionPhotos.length - 1].src;
							changed = true;
							break;
						}
					} catch (e) {
						console.warn('Error syncing section photo for', srv.id, e);
					}
				}
			}

			// 2. If it's a default service, check if it contains any legacy mismatched URLs
			if (def) {
				const isMismatched =
					!nextUrl ||
					(srv.id === 'srv_satyanarayan' && nextUrl.includes('generated-2VtWj9NpLbLZZmNI')) || // had car pooja image
					(srv.id === 'srv_wedding' && nextUrl.includes('img-20230916-wa0012')) || // had rudrabhishek image
					(srv.id === 'srv_griha_pravesh' && nextUrl.includes('img-20260712-wa0014')) || // had office image
					(srv.id === 'srv_shanti_havan' && nextUrl.includes('img-20260712-wa0016')) || // had wrong image
					(srv.id === 'srv_pitru_paksha' && nextUrl.includes('1786093528068-GtztxnybZC7umoSY')); // had portrait

				if (isMismatched) {
					nextUrl = def.imageUrl;
					changed = true;
				}
			}

			// 3. Mirror customized service image to mapped section photos
			if (nextUrl && def && nextUrl !== def.imageUrl && mappings) {
				const mapList = Array.isArray(mappings) ? mappings : [mappings];
				for (const m of mapList) {
					try {
						const existingSec = await localPhotoDb.getSectionPhotos(m.pageId, m.sectionId);
						const active = existingSec?.[existingSec.length - 1];
						if (!active || active.src !== nextUrl) {
							await localPhotoDb.saveSectionPhotos(m.pageId, m.sectionId, [
								{
									src: nextUrl,
									title: srv.title || active?.title || '',
									alt: srv.title || active?.alt || '',
									sortOrder: 0,
									source: 'synced_from_service',
								}
							]);
						}
					} catch (_) {}
				}
			}

			if (nextUrl !== srv.imageUrl) {
				return { ...srv, imageUrl: nextUrl };
			}
			return srv;
		})
	);

	if (changed) {
		await localPhotoDb.savePoojaServices(updated);
	}
	return updated;
}

export const poojaService = {
	/**
	 * Fetch all pooja services with auto-sync and reconciliation.
	 */
	async fetchServices(onlyActive = true) {
		// 1. Try Supabase Cloud
		if (isSupabaseConfigured && supabase) {
			try {
				let query = supabase
					.from('pooja_services')
					.select('*')
					.order('sort_order', { ascending: true });

				if (onlyActive) {
					query = query.eq('is_active', true);
				}

				const { data, error } = await query;
				if (!error && data && data.length > 0) {
					const mapped = data.map((s) => ({
						id: s.id,
						title: s.title,
						badge: s.badge || '',
						description: s.description || '',
						imageUrl: s.image_url || '',
						targetUrl: s.target_url || '/book-pandit-in-dubai',
						buttonText: s.button_text || 'Book This Pooja',
						isActive: s.is_active ?? true,
						sortOrder: Number(s.sort_order) || 0,
						isDefault: s.is_default ?? false,
						createdAt: s.created_at,
						source: 'cloud',
					}));
					const synced = await syncWithSectionPhotosAndDefaults(mapped);
					await localPhotoDb.savePoojaServices(synced);
					return onlyActive ? synced.filter((s) => s.isActive !== false) : synced;
				}
			} catch (cloudErr) {
				console.warn('Supabase pooja services fetch error, using local:', cloudErr);
			}
		}

		// 2. Try Local IndexedDB
		try {
			const local = await localPhotoDb.getPoojaServices();
			if (local !== null && Array.isArray(local) && local.length > 0) {
				const synced = await syncWithSectionPhotosAndDefaults(local);
				return onlyActive ? synced.filter((s) => s.isActive !== false) : synced;
			}
		} catch (localErr) {
			console.warn('Local storage pooja services fetch error:', localErr);
		}

		// 3. Fallback to default starter services
		const initialSynced = await syncWithSectionPhotosAndDefaults(DEFAULT_POOJA_SERVICES);
		await localPhotoDb.savePoojaServices(initialSynced);
		return onlyActive
			? initialSynced.filter((s) => s.isActive !== false)
			: initialSynced;
	},

	/**
	 * Add a new pooja service box.
	 */
	async addService({ title, description, imageFile = null, imageUrl = '', badge = '', targetUrl = '/book-pandit-in-dubai', buttonText = 'Book This Pooja' }) {
		let finalImageUrl = imageUrl;

		// Process image upload if file selected
		if (imageFile) {
			if (isSupabaseConfigured && supabase) {
				try {
					const ext = imageFile.name.split('.').pop() || 'jpg';
					const cleanName = imageFile.name
						.replace(/\.[^/.]+$/, '')
						.replace(/[^a-zA-Z0-9]/g, '_')
						.toLowerCase();
					const filePath = `services/${Date.now()}_${cleanName}.${ext}`;

					const { error: uploadError } = await supabase.storage
						.from('site-photos')
						.upload(filePath, imageFile, { cacheControl: '31536000', upsert: false });

					if (!uploadError) {
						const { data: urlData } = supabase.storage.from('site-photos').getPublicUrl(filePath);
						finalImageUrl = urlData.publicUrl;
					}
				} catch (err) {
					console.warn('Cloud upload failed, falling back to local dataUrl:', err);
					finalImageUrl = await fileToDataUrl(imageFile);
				}
			} else {
				finalImageUrl = await fileToDataUrl(imageFile);
			}
		}

		// Fallback image if none provided
		if (!finalImageUrl) {
			finalImageUrl = 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=600&fit=crop';
		}

		const current = (await localPhotoDb.getPoojaServices()) || DEFAULT_POOJA_SERVICES;
		const nextOrder = current.length > 0 ? Math.max(...current.map((s) => s.sortOrder || 0)) + 1 : 1;

		const newService = {
			id: `srv_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
			title: title.trim(),
			badge: badge.trim(),
			description: description.trim(),
			imageUrl: finalImageUrl,
			targetUrl: targetUrl.trim() || '/book-pandit-in-dubai',
			buttonText: buttonText.trim() || 'Book This Pooja',
			isActive: true,
			sortOrder: nextOrder,
			isDefault: false,
			createdAt: new Date().toISOString(),
		};

		// 1. Save to local storage
		const updated = [...current, newService];
		await localPhotoDb.savePoojaServices(updated);

		// 2. Save to Supabase if configured
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('pooja_services').insert([
					{
						id: newService.id,
						title: newService.title,
						badge: newService.badge,
						description: newService.description,
						image_url: newService.imageUrl,
						target_url: newService.targetUrl,
						button_text: newService.buttonText,
						is_active: true,
						sort_order: newService.sortOrder,
						is_default: false,
					},
				]);
			} catch (cloudErr) {
				console.warn('Supabase service insert error:', cloudErr);
			}
		}

		return newService;
	},

	/**
	 * Update an existing pooja service box.
	 */
	async updateService(id, updates, imageFile = null) {
		let finalImageUrl = updates.imageUrl;

		if (imageFile) {
			if (isSupabaseConfigured && supabase) {
				try {
					const ext = imageFile.name.split('.').pop() || 'jpg';
					const cleanName = imageFile.name
						.replace(/\.[^/.]+$/, '')
						.replace(/[^a-zA-Z0-9]/g, '_')
						.toLowerCase();
					const filePath = `services/${Date.now()}_${cleanName}.${ext}`;

					const { error: uploadError } = await supabase.storage
						.from('site-photos')
						.upload(filePath, imageFile, { cacheControl: '31536000', upsert: false });

					if (!uploadError) {
						const { data: urlData } = supabase.storage.from('site-photos').getPublicUrl(filePath);
						finalImageUrl = urlData.publicUrl;
					}
				} catch (err) {
					finalImageUrl = await fileToDataUrl(imageFile);
				}
			} else {
				finalImageUrl = await fileToDataUrl(imageFile);
			}
		}

		const current = (await localPhotoDb.getPoojaServices()) || DEFAULT_POOJA_SERVICES;
		const updated = current.map((s) => {
			if (s.id === id) {
				return {
					...s,
					...updates,
					imageUrl: finalImageUrl || s.imageUrl,
				};
			}
			return s;
		});

		await localPhotoDb.savePoojaServices(updated);

		// Mirror to corresponding section photos so the pooja landing page updates too!
		if (finalImageUrl && SERVICE_SECTION_MAP[id]) {
			const mappings = Array.isArray(SERVICE_SECTION_MAP[id])
				? SERVICE_SECTION_MAP[id]
				: [SERVICE_SECTION_MAP[id]];

			for (const mapping of mappings) {
				const { pageId, sectionId } = mapping;
				try {
					const currentSectionPhotos = await localPhotoDb.getSectionPhotos(pageId, sectionId);
					const firstPhoto = currentSectionPhotos?.[0] || {};
					const updatedSectionPhotos = [
						{
							...firstPhoto,
							src: finalImageUrl,
							title: updates.title || firstPhoto.title || '',
							alt: updates.title || firstPhoto.alt || '',
							sortOrder: 0,
							source: 'synced_from_service',
						},
					];
					await localPhotoDb.saveSectionPhotos(pageId, sectionId, updatedSectionPhotos);
				} catch (e) {
					console.warn('Could not mirror photo to section:', pageId, sectionId, e);
				}
			}
		}

		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('pooja_services').update({
					title: updates.title,
					badge: updates.badge,
					description: updates.description,
					image_url: finalImageUrl,
					target_url: updates.targetUrl,
					button_text: updates.buttonText,
				}).eq('id', id);
			} catch (_) {}
		}

		return updated;
	},

	/**
	 * Sync a specific service when its corresponding section photo was updated in the Photos module.
	 */
	async syncSectionToService(pageId, sectionId, newPhotoUrl) {
		const serviceEntry = Object.entries(SERVICE_SECTION_MAP).find(([, mappings]) => {
			const arr = Array.isArray(mappings) ? mappings : [mappings];
			return arr.some((m) => m.pageId === pageId && m.sectionId === sectionId);
		});
		if (!serviceEntry) return null;
		const [serviceId] = serviceEntry;

		const current = (await localPhotoDb.getPoojaServices()) || DEFAULT_POOJA_SERVICES;
		const fallbackUrl = DEFAULT_POOJA_SERVICES.find((d) => d.id === serviceId)?.imageUrl || '';
		const targetUrl = newPhotoUrl || fallbackUrl;

		const updated = current.map((s) => {
			if (s.id === serviceId) {
				return { ...s, imageUrl: targetUrl };
			}
			return s;
		});
		await localPhotoDb.savePoojaServices(updated);

		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('pooja_services').update({ image_url: targetUrl }).eq('id', serviceId);
			} catch (_) {}
		}
		return updated;
	},

	/**
	 * Delete / Remove a pooja service box.
	 */
	async deleteService(id) {
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('pooja_services').delete().eq('id', id);
			} catch (_) {}
		}

		const current = (await localPhotoDb.getPoojaServices()) || DEFAULT_POOJA_SERVICES;
		const filtered = current.filter((s) => s.id !== id);
		await localPhotoDb.savePoojaServices(filtered);
		return filtered;
	},

	/**
	 * Toggle visibility (Show / Hide box on website).
	 */
	async toggleVisibility(id, isActive) {
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('pooja_services').update({ is_active: isActive }).eq('id', id);
			} catch (_) {}
		}

		const current = (await localPhotoDb.getPoojaServices()) || DEFAULT_POOJA_SERVICES;
		const updated = current.map((s) => (s.id === id ? { ...s, isActive } : s));
		await localPhotoDb.savePoojaServices(updated);
		return updated;
	},

	/**
	 * Restore default pooja services.
	 */
	async restoreDefaultServices() {
		await localPhotoDb.savePoojaServices(DEFAULT_POOJA_SERVICES);
		return DEFAULT_POOJA_SERVICES;
	},
};

export default poojaService;
