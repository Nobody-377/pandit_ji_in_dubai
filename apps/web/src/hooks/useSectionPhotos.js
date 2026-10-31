import { useState, useEffect, useCallback, useRef } from 'react';
import photoService from '@/services/photoService';
import localPhotoDb from '@/services/localPhotoDb';

/**
 * Custom React hook that fetches dynamic photos for a page section.
 * - Reads synchronously from local persistent cache immediately (zero flash/delay).
 * - Checks Supabase Cloud first (if configured), then local IndexedDB storage.
 * - Listens in real-time across browser tabs, windows, and focus events.
 * - Gracefully falls back to default photos if no overrides exist.
 */
export function useSectionPhotos(pageId, sectionId, defaultPhotos = []) {
	// Initialize immediately from synchronous storage if available
	const [photos, setPhotos] = useState(() => {
		const cached = localPhotoDb.getSectionPhotosSync(pageId, sectionId);
		return cached && Array.isArray(cached) && cached.length > 0 ? cached : defaultPhotos;
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isLive, setIsLive] = useState(false);

	const defaultPhotosRef = useRef(defaultPhotos);
	useEffect(() => {
		defaultPhotosRef.current = defaultPhotos;
	}, [defaultPhotos]);

	const loadPhotos = useCallback(async () => {
		try {
			const livePhotos = await photoService.fetchSectionPhotos(pageId, sectionId);

			if (livePhotos !== null && Array.isArray(livePhotos) && livePhotos.length > 0) {
				setPhotos(livePhotos);
				setIsLive(true);
			} else {
				setPhotos(defaultPhotosRef.current);
				setIsLive(false);
			}
			setError(null);
		} catch (err) {
			console.warn(`Falling back to default photos for ${pageId}/${sectionId}:`, err);
			setError(err);
			const fallback = localPhotoDb.getSectionPhotosSync(pageId, sectionId) || defaultPhotosRef.current;
			setPhotos(fallback);
			setIsLive(false);
		}
	}, [pageId, sectionId]);

	useEffect(() => {
		loadPhotos();

		// Real-time synchronization listeners across tabs and local events
		const handleDataUpdate = (event) => {
			const detail = event?.detail;
			if (!detail || !detail.pageId || (detail.pageId === pageId && detail.sectionId === sectionId)) {
				loadPhotos();
			}
		};

		const handleStorage = (e) => {
			if (!e.key || e.key === `pj_photos_${pageId}_${sectionId}` || e.key === 'pj_last_sync_timestamp') {
				loadPhotos();
			}
		};

		const handleFocus = () => {
			loadPhotos();
		};

		window.addEventListener('pj_site_data_updated', handleDataUpdate);
		window.addEventListener('storage', handleStorage);
		window.addEventListener('focus', handleFocus);

		let channel = null;
		try {
			if ('BroadcastChannel' in window) {
				channel = new BroadcastChannel('pj_sync_channel');
				channel.onmessage = (msg) => {
					const data = msg?.data;
					if (!data || !data.pageId || (data.pageId === pageId && data.sectionId === sectionId)) {
						loadPhotos();
					}
				};
			}
		} catch (_) {}

		return () => {
			window.removeEventListener('pj_site_data_updated', handleDataUpdate);
			window.removeEventListener('storage', handleStorage);
			window.removeEventListener('focus', handleFocus);
			if (channel) {
				try {
					channel.close();
				} catch (_) {}
			}
		};
	}, [loadPhotos, pageId, sectionId]);

	return {
		photos,
		loading,
		error,
		isLive,
		refresh: loadPhotos,
	};
}

export default useSectionPhotos;
