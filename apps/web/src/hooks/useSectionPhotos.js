import { useState, useEffect, useCallback } from 'react';
import photoService from '@/services/photoService';

/**
 * Custom React hook that fetches dynamic photos for a page section.
 * Automatically checks Supabase Cloud first, then local persistent storage,
 * and gracefully falls back to default hardcoded photos if neither has custom entries,
 * ensuring zero downtime or broken images.
 */
export function useSectionPhotos(pageId, sectionId, defaultPhotos = []) {
	const [photos, setPhotos] = useState(defaultPhotos);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isLive, setIsLive] = useState(false);

	const loadPhotos = useCallback(async () => {
		try {
			setLoading(true);
			const livePhotos = await photoService.fetchSectionPhotos(pageId, sectionId);

			if (livePhotos !== null && Array.isArray(livePhotos)) {
				setPhotos(livePhotos);
				setIsLive(true);
			} else {
				setPhotos(defaultPhotos);
				setIsLive(false);
			}
			setError(null);
		} catch (err) {
			console.warn(`Falling back to default photos for ${pageId}/${sectionId}:`, err);
			setError(err);
			setPhotos(defaultPhotos);
			setIsLive(false);
		} finally {
			setLoading(false);
		}
	}, [pageId, sectionId, defaultPhotos]);

	useEffect(() => {
		loadPhotos();
	}, [loadPhotos]);

	return {
		photos,
		loading,
		error,
		isLive,
		refresh: loadPhotos,
	};
}

export default useSectionPhotos;
