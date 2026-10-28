/**
 * Local IndexedDB persistent storage for photos and popup settings.
 * Ensures zero-configuration offline persistence so all admin panel changes
 * persist permanently across reloads and sessions even before Supabase is connected.
 */

const DB_NAME = 'panditji_site_storage';
const DB_VERSION = 4;
const STORE_PHOTOS = 'section_photos';
const STORE_POPUP = 'popup_settings';
const STORE_REVIEWS = 'customer_reviews';
const STORE_SERVICES = 'pooja_services';
const STORE_CREDENTIALS = 'admin_credentials';

function getDb() {
	return new Promise((resolve, reject) => {
		if (typeof window === 'undefined' || !window.indexedDB) {
			resolve(null);
			return;
		}

		const request = window.indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
				// key: `${pageId}::${sectionId}`
				db.createObjectStore(STORE_PHOTOS);
			}
			if (!db.objectStoreNames.contains(STORE_POPUP)) {
				// single key 'active'
				db.createObjectStore(STORE_POPUP);
			}
			if (!db.objectStoreNames.contains(STORE_REVIEWS)) {
				// single key 'all_reviews'
				db.createObjectStore(STORE_REVIEWS);
			}
			if (!db.objectStoreNames.contains(STORE_SERVICES)) {
				// single key 'all_services'
				db.createObjectStore(STORE_SERVICES);
			}
			if (!db.objectStoreNames.contains(STORE_CREDENTIALS)) {
				// single key 'active'
				db.createObjectStore(STORE_CREDENTIALS);
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => {
			console.warn('IndexedDB failed to open:', request.error);
			resolve(null);
		};
	});
}

/**
 * Convert a File object to an optimized Data URL (with optional canvas compression).
 */
export async function fileToDataUrl(file, maxWidth = 1600, quality = 0.88) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				let { width, height } = img;
				if (width > maxWidth || height > maxWidth) {
					if (width > height) {
						height = Math.round((height * maxWidth) / width);
						width = maxWidth;
					} else {
						width = Math.round((width * maxWidth) / height);
						height = maxWidth;
					}
				}

				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);

				const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
				const dataUrl = canvas.toDataURL(mimeType, quality);
				resolve(dataUrl);
			};
			img.onerror = () => resolve(e.target.result); // Fallback to raw dataUrl
			img.src = e.target.result;
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

export const localPhotoDb = {
	async getSectionPhotos(pageId, sectionId) {
		const db = await getDb();
		if (!db) {
			// Fallback to localStorage
			try {
				const raw = localStorage.getItem(`pj_photos_${pageId}_${sectionId}`);
				return raw ? JSON.parse(raw) : null;
			} catch {
				return null;
			}
		}

		return new Promise((resolve) => {
			try {
				const tx = db.transaction(STORE_PHOTOS, 'readonly');
				const store = tx.objectStore(STORE_PHOTOS);
				const req = store.get(`${pageId}::${sectionId}`);
				req.onsuccess = () => resolve(req.result || null);
				req.onerror = () => resolve(null);
			} catch {
				resolve(null);
			}
		});
	},

	async saveSectionPhotos(pageId, sectionId, photos) {
		const key = `${pageId}::${sectionId}`;
		const db = await getDb();

		if (!db) {
			try {
				localStorage.setItem(`pj_photos_${pageId}_${sectionId}`, JSON.stringify(photos));
			} catch (e) {
				console.warn('localStorage save failed:', e);
			}
			return photos;
		}

		return new Promise((resolve, reject) => {
			try {
				const tx = db.transaction(STORE_PHOTOS, 'readwrite');
				const store = tx.objectStore(STORE_PHOTOS);
				const req = store.put(photos, key);
				req.onsuccess = () => resolve(photos);
				req.onerror = () => reject(req.error);
			} catch (err) {
				reject(err);
			}
		});
	},

	async removeSectionOverride(pageId, sectionId) {
		const key = `${pageId}::${sectionId}`;
		const db = await getDb();
		if (!db) {
			try {
				localStorage.removeItem(`pj_photos_${pageId}_${sectionId}`);
			} catch (_) {}
			return;
		}

		return new Promise((resolve) => {
			try {
				const tx = db.transaction(STORE_PHOTOS, 'readwrite');
				const store = tx.objectStore(STORE_PHOTOS);
				store.delete(key);
				tx.oncomplete = () => resolve();
				tx.onerror = () => resolve();
			} catch (_) {
				resolve();
			}
		});
	},

	async getPopupSettings() {
		const db = await getDb();
		if (!db) {
			try {
				const raw = localStorage.getItem('pj_local_popup_settings');
				return raw ? JSON.parse(raw) : null;
			} catch {
				return null;
			}
		}

		return new Promise((resolve) => {
			try {
				const tx = db.transaction(STORE_POPUP, 'readonly');
				const store = tx.objectStore(STORE_POPUP);
				const req = store.get('active');
				req.onsuccess = () => resolve(req.result || null);
				req.onerror = () => resolve(null);
			} catch {
				resolve(null);
			}
		});
	},

	async savePopupSettings(settings) {
		const db = await getDb();
		if (!db) {
			try {
				localStorage.setItem('pj_local_popup_settings', JSON.stringify(settings));
			} catch (e) {
				console.warn('localStorage save failed:', e);
			}
			return settings;
		}

		return new Promise((resolve, reject) => {
			try {
				const tx = db.transaction(STORE_POPUP, 'readwrite');
				const store = tx.objectStore(STORE_POPUP);
				const req = store.put(settings, 'active');
				req.onsuccess = () => resolve(settings);
				req.onerror = () => reject(req.error);
			} catch (err) {
				reject(err);
			}
		});
	},

	async getReviews() {
		const db = await getDb();
		if (!db) {
			try {
				const raw = localStorage.getItem('pj_customer_reviews');
				return raw ? JSON.parse(raw) : null;
			} catch {
				return null;
			}
		}

		return new Promise((resolve) => {
			try {
				const tx = db.transaction(STORE_REVIEWS, 'readonly');
				const store = tx.objectStore(STORE_REVIEWS);
				const req = store.get('all_reviews');
				req.onsuccess = () => resolve(req.result || null);
				req.onerror = () => resolve(null);
			} catch {
				resolve(null);
			}
		});
	},

	async saveReviews(reviews) {
		const db = await getDb();
		if (!db) {
			try {
				localStorage.setItem('pj_customer_reviews', JSON.stringify(reviews));
			} catch (e) {
				console.warn('localStorage save reviews failed:', e);
			}
			return reviews;
		}

		return new Promise((resolve, reject) => {
			try {
				const tx = db.transaction(STORE_REVIEWS, 'readwrite');
				const store = tx.objectStore(STORE_REVIEWS);
				const req = store.put(reviews, 'all_reviews');
				req.onsuccess = () => resolve(reviews);
				req.onerror = () => reject(req.error);
			} catch (err) {
				reject(err);
			}
		});
	},

	async getPoojaServices() {
		const db = await getDb();
		if (!db) {
			try {
				const raw = localStorage.getItem('pj_pooja_services');
				return raw ? JSON.parse(raw) : null;
			} catch {
				return null;
			}
		}

		return new Promise((resolve) => {
			try {
				const tx = db.transaction(STORE_SERVICES, 'readonly');
				const store = tx.objectStore(STORE_SERVICES);
				const req = store.get('all_services');
				req.onsuccess = () => resolve(req.result || null);
				req.onerror = () => resolve(null);
			} catch {
				resolve(null);
			}
		});
	},

	async savePoojaServices(services) {
		const db = await getDb();
		if (!db) {
			try {
				localStorage.setItem('pj_pooja_services', JSON.stringify(services));
			} catch (e) {
				console.warn('localStorage save services failed:', e);
			}
			return services;
		}

		return new Promise((resolve, reject) => {
			try {
				const tx = db.transaction(STORE_SERVICES, 'readwrite');
				const store = tx.objectStore(STORE_SERVICES);
				const req = store.put(services, 'all_services');
				req.onsuccess = () => resolve(services);
				req.onerror = () => reject(req.error);
			} catch (err) {
				reject(err);
			}
		});
	},

	/**
	 * Retrieve custom admin credentials synchronously from localStorage.
	 */
	getAdminCredentialsSync() {
		try {
			const raw = localStorage.getItem('pj_admin_custom_credentials');
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	},

	/**
	 * Retrieve custom admin credentials if configured.
	 */
	async getAdminCredentials() {
		const local = this.getAdminCredentialsSync();
		if (local && local.email && local.password) {
			return local;
		}

		const db = await getDb();
		if (!db) return local;

		return new Promise((resolve) => {
			try {
				if (!db.objectStoreNames.contains(STORE_CREDENTIALS)) {
					resolve(this.getAdminCredentialsSync());
					return;
				}
				const tx = db.transaction(STORE_CREDENTIALS, 'readonly');
				const store = tx.objectStore(STORE_CREDENTIALS);
				const req = store.get('active');
				req.onsuccess = () => resolve(req.result || this.getAdminCredentialsSync());
				req.onerror = () => resolve(this.getAdminCredentialsSync());
			} catch {
				resolve(this.getAdminCredentialsSync());
			}
		});
	},

	/**
	 * Save updated admin credentials.
	 */
	async saveAdminCredentials(creds) {
		try {
			localStorage.setItem('pj_admin_custom_credentials', JSON.stringify(creds));
		} catch (e) {
			console.warn('localStorage save admin credentials failed:', e);
		}

		const db = await getDb();
		if (!db || !db.objectStoreNames.contains(STORE_CREDENTIALS)) {
			return creds;
		}

		return new Promise((resolve) => {
			try {
				const tx = db.transaction(STORE_CREDENTIALS, 'readwrite');
				const store = tx.objectStore(STORE_CREDENTIALS);
				const req = store.put(creds, 'active');
				req.onsuccess = () => resolve(creds);
				req.onerror = () => resolve(creds);
			} catch {
				resolve(creds);
			}
		});
	},

	/**
	 * Reset admin credentials back to default.
	 */
	async resetAdminCredentials() {
		try {
			localStorage.removeItem('pj_admin_custom_credentials');
		} catch (_) {}

		const db = await getDb();
		if (!db || !db.objectStoreNames.contains(STORE_CREDENTIALS)) return;

		return new Promise((resolve) => {
			try {
				const tx = db.transaction(STORE_CREDENTIALS, 'readwrite');
				const store = tx.objectStore(STORE_CREDENTIALS);
				const req = store.delete('active');
				req.onsuccess = () => resolve();
				req.onerror = () => resolve();
			} catch {
				resolve();
			}
		});
	}
};

export default localPhotoDb;

