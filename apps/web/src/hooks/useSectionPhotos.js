import { useState, useEffect, useCallback, useRef } from 'react';
import photoService from '@/services/photoService';
import localPhotoDb, { isBannedPhotoUrl, purgeBannedPlaceholders } from '@/services/localPhotoDb';
import { SERVICE_SECTION_MAP } from '@/services/poojaService';

/**
 * Helper to retrieve a mapped Pooja service photo for a given pageId & sectionId.
 */
function getMappedServicePhoto(services, pageId, sectionId) {
	if (!services || !Array.isArray(services)) return null;
	const match = Object.entries(SERVICE_SECTION_MAP).find(([, mappings]) => {
		const arr = Array.isArray(mappings) ? mappings : [mappings];
		return arr.some((m) => m.pageId === pageId && m.sectionId === sectionId);
	});
	if (!match) return null;
	const [serviceId] = match;
	const srv = services.find((s) => s.id === serviceId);
	if (srv && srv.imageUrl && !isBannedPhotoUrl(srv.imageUrl)) {
		return srv.imageUrl;
	}
	return null;
}

/**
 * Filter out any obsolete or banned placeholder URLs (e.g. amenities.jpg)
 * and prioritize the latest valid custom photo or mapped service photo.
 */
function sanitizePhotos(list, defaultList, isSingle, serviceFallbackUrl = null) {
	const validDefaults = (Array.isArray(defaultList) ? defaultList : []).filter(
		(p) => p && p.src && !isBannedPhotoUrl(p.src)
	);

	if (list && Array.isArray(list) && list.length > 0) {
		const cleanList = list.filter((p) => p && p.src && !isBannedPhotoUrl(p.src));
		if (cleanList.length > 0) {
			return isSingle ? [cleanList[cleanList.length - 1]] : cleanList;
		}
	}

	// If no valid section photo exists, check if the mapped pooja service has a custom photo
	if (serviceFallbackUrl && !isBannedPhotoUrl(serviceFallbackUrl)) {
		return [
			{
				src: serviceFallbackUrl,
				alt: validDefaults[0]?.alt || '',
				title: validDefaults[0]?.title || '',
				source: 'synced_from_service',
			},
		];
	}

	return validDefaults;
}

export function useSectionPhotos(pageId, sectionId, defaultPhotos = []) {
	const isSingle = sectionId !== 'home_gallery' && sectionId !== 'authentic_gallery';

	// Initialize immediately from synchronous storage if available
	const [photos, setPhotos] = useState(() => {
		purgeBannedPlaceholders();
		const cached = localPhotoDb.getSectionPhotosSync(pageId, sectionId);
		const cachedServices = localPhotoDb.getPoojaServicesSync();
		const servicePhoto = getMappedServicePhoto(cachedServices, pageId, sectionId);
		return sanitizePhotos(cached, defaultPhotos, isSingle, servicePhoto);
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
			const liveServices = await localPhotoDb.getPoojaServices().catch(() => null);
			const servicePhoto = getMappedServicePhoto(liveServices, pageId, sectionId);

			if (livePhotos !== null && Array.isArray(livePhotos) && livePhotos.length > 0) {
				const sanitized = sanitizePhotos(livePhotos, defaultPhotosRef.current, isSingle, servicePhoto);
				setPhotos(sanitized);
				setIsLive(true);
			} else if (servicePhoto) {
				setPhotos([
					{
						src: servicePhoto,
						alt: defaultPhotosRef.current[0]?.alt || '',
						title: defaultPhotosRef.current[0]?.title || '',
						source: 'synced_from_service',
					},
				]);
				setIsLive(true);
			} else {
				setPhotos(defaultPhotosRef.current);
				setIsLive(false);
			}
			setError(null);
		} catch (err) {
			console.warn(`Falling back to default photos for ${pageId}/${sectionId}:`, err);
			setError(err);
			const fallback = localPhotoDb.getSectionPhotosSync(pageId, sectionId);
			const fallbackServices = localPhotoDb.getPoojaServicesSync();
			const servicePhoto = getMappedServicePhoto(fallbackServices, pageId, sectionId);
			setPhotos(sanitizePhotos(fallback, defaultPhotosRef.current, isSingle, servicePhoto));
			setIsLive(false);
		}
	}, [pageId, sectionId, isSingle]);

	useEffect(() => {
		loadPhotos();

		// Real-time synchronization listeners across tabs and local events
		const handleDataUpdate = (event) => {
			const detail = event?.detail;
			if (
				!detail ||
				!detail.pageId ||
				(detail.pageId === pageId && detail.sectionId === sectionId) ||
				detail.type === 'services' ||
				detail.type === 'photos'
			) {
				loadPhotos();
			}
		};

		const handleStorage = (e) => {
			if (
				!e.key ||
				e.key === `pj_photos_${pageId}_${sectionId}` ||
				e.key === 'pj_pooja_services' ||
				e.key === 'pj_last_sync_timestamp'
			) {
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
					if (
						!data ||
						!data.pageId ||
						(data.pageId === pageId && data.sectionId === sectionId) ||
						data.type === 'services' ||
						data.type === 'photos'
					) {
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
