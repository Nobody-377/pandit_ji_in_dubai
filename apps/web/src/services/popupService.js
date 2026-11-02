import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import localPhotoDb, { fileToDataUrl } from '@/services/localPhotoDb';

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
	 * Fetch current popup settings from Supabase or local persistent storage.
	 */
	async fetchPopupSettings() {
		// 1. Try Supabase Cloud Database first
		if (isSupabaseConfigured && supabase) {
			try {
				const { data, error } = await supabase
					.from('popup_settings')
					.select('*')
					.eq('id', 'main_popup')
					.maybeSingle();

				if (!error && data) {
					// Cache locally
					await localPhotoDb.savePopupSettings(data);
					return data;
				}
			} catch (cloudErr) {
				console.warn('Supabase fetchPopupSettings failed, reading local:', cloudErr);
			}
		}

		// 2. ALWAYS read IndexedDB first (authoritative database with no 5MB quota limitation)
		try {
			const idbData = await localPhotoDb.getPopupSettings();
			if (idbData && idbData.image_url) {
				return { ...DEFAULT_POPUP_SETTINGS, ...idbData };
			}
		} catch (_) {}

		// 3. Fallback to synchronous localStorage cache
		try {
			const syncLocal = localPhotoDb.getPopupSettingsSync();
			if (syncLocal && syncLocal.image_url) {
				return { ...DEFAULT_POPUP_SETTINGS, ...syncLocal };
			}
		} catch (_) {}

		return DEFAULT_POPUP_SETTINGS;
	},

	/**
	 * Upload a promotional banner image (Cloud or Local Data URL).
	 */
	async uploadPopupImage(file) {
		if (isSupabaseConfigured && supabase) {
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

			if (uploadError) throw uploadError;

			const { data: urlData } = supabase.storage
				.from(BUCKET_NAME)
				.getPublicUrl(filePath);

			return {
				publicUrl: urlData.publicUrl,
				storagePath: filePath,
			};
		}

		// Local persistent mode
		const dataUrl = await fileToDataUrl(file);
		return {
			publicUrl: dataUrl,
			storagePath: '',
		};
	},

	/**
	 * Save updated popup settings (Cloud & Local).
	 */
	async savePopupSettings(settings) {
		const payload = {
			id: 'main_popup',
			is_enabled: Boolean(settings.is_enabled),
			image_url: settings.image_url || DEFAULT_POPUP_SETTINGS.image_url,
			storage_path: settings.storage_path || '',
			target_url: settings.target_url || DEFAULT_POPUP_SETTINGS.target_url,
			title: settings.title !== undefined ? settings.title : DEFAULT_POPUP_SETTINGS.title,
			delay_seconds: Number(settings.delay_seconds) || 3,
			updated_at: new Date().toISOString(),
		};

		// 1. Always save to local persistent storage for instant offline resilience
		await localPhotoDb.savePopupSettings(payload);

		// 2. If Cloud is active, upsert to Supabase
		if (isSupabaseConfigured && supabase) {
			try {
				const { data, error } = await supabase
					.from('popup_settings')
					.upsert(payload, { onConflict: 'id' })
					.select()
					.single();

				if (error) {
					console.error('Supabase savePopupSettings error:', error);
				} else if (data) {
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
