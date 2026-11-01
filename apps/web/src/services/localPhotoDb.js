/**
 * Local Dual Persistent Storage (localStorage + IndexedDB) for Pandit Ji in Dubai.
 * Ensures zero-configuration offline persistence so all admin panel changes (photos,
 * pooja services, popup settings, reviews, credentials) persist permanently and update
 * in real-time across browser tabs and reloads.
 */

const DB_NAME = 'panditji_site_storage';
const DB_VERSION = 5;
const STORE_PHOTOS = 'section_photos';
const STORE_POPUP = 'popup_settings';
const STORE_REVIEWS = 'customer_reviews';
const STORE_SERVICES = 'pooja_services';
const STORE_CREDENTIALS = 'admin_credentials';

let dbInstance = null;
let dbOpenPromise = null;

/**
 * Open or retrieve the persistent IndexedDB instance safely with timeout and block handling.
 */
function getDb() {
	if (typeof window === 'undefined' || !window.indexedDB) {
		return Promise.resolve(null);
	}
	if (dbInstance) {
		return Promise.resolve(dbInstance);
	}
	if (dbOpenPromise) {
		return dbOpenPromise;
	}

	dbOpenPromise = new Promise((resolve) => {
		let isResolved = false;
		const finish = (result) => {
			if (!isResolved) {
				isResolved = true;
				dbInstance = result;
				resolve(result);
			}
		};

		// Safety timeout: Never hang a component render if IndexedDB takes too long
		const timeoutId = setTimeout(() => {
			console.warn('IndexedDB connection timed out (1.5s), operating with localStorage.');
			finish(null);
		}, 1500);

		try {
			const request = window.indexedDB.open(DB_NAME, DB_VERSION);

			request.onblocked = () => {
				console.warn('IndexedDB version upgrade blocked by another open tab.');
				clearTimeout(timeoutId);
				finish(null);
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				const stores = [STORE_PHOTOS, STORE_POPUP, STORE_REVIEWS, STORE_SERVICES, STORE_CREDENTIALS];
				stores.forEach((name) => {
					if (!db.objectStoreNames.contains(name)) {
						db.createObjectStore(name);
					}
				});
			};

			request.onsuccess = () => {
				clearTimeout(timeoutId);
				const db = request.result;
				db.onversionchange = () => {
					try {
						db.close();
					} catch (_) {}
					dbInstance = null;
					dbOpenPromise = null;
				};
				finish(db);
			};

			request.onerror = () => {
				clearTimeout(timeoutId);
				console.warn('IndexedDB failed to open:', request.error);
				finish(null);
			};
		} catch (err) {
			clearTimeout(timeoutId);
			console.warn('IndexedDB exception on open:', err);
			finish(null);
		}
	});

	return dbOpenPromise;
}

/**
 * Broadcast storage changes to all open tabs and active React components immediately.
 */
export function broadcastDataChange(type, details = {}) {
	if (typeof window === 'undefined') return;

	// 1. Storage timestamp to trigger cross-tab 'storage' event
	try {
		localStorage.setItem('pj_last_sync_timestamp', `${Date.now()}_${Math.random()}`);
	} catch (_) {}

	// 2. CustomEvent for immediate reactivity within the same window
	try {
		window.dispatchEvent(
			new CustomEvent('pj_site_data_updated', {
				detail: { type, ...details },
			})
		);
	} catch (_) {}

	// 3. BroadcastChannel for cross-tab communication
	try {
		if ('BroadcastChannel' in window) {
			const channel = new BroadcastChannel('pj_sync_channel');
			channel.postMessage({ type, ...details, timestamp: Date.now() });
			channel.close();
		}
	} catch (_) {}
}

/**
 * Convert a File object to an optimized Data URL (with canvas compression for fast loading).
 * Uses 1000px max width and 0.78 quality to keep file sizes well under 100KB,
 * preventing browser localStorage quota exhaustion (5MB limit) while preserving high visual clarity.
 */
export async function fileToDataUrl(file, maxWidth = 1000, quality = 0.78) {
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

/**
 * Blacklisted placeholder URLs that must NEVER be rendered on the website or stored in database.
 */
export const BANNED_PHOTO_PATTERNS = [
	'amenities.jpg',
	'cdn-builder-placeholders',
	'zyrosite.com/cdn-builder-placeholders'
];

export function isBannedPhotoUrl(src) {
	if (!src || typeof src !== 'string') return false;
	return BANNED_PHOTO_PATTERNS.some((pattern) => src.includes(pattern));
}

/**
 * Purge any obsolete placeholder data (like amenities.jpg) from localStorage and IndexedDB immediately.
 */
export function purgeBannedPlaceholders() {
	if (typeof window === 'undefined') return;
	try {
		// 1. Clean localStorage
		const keysToRemove = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith('pj_photos_')) {
				const val = localStorage.getItem(key);
				if (val && isBannedPhotoUrl(val)) {
					keysToRemove.push(key);
				}
			}
		}
		keysToRemove.forEach((k) => {
			try {
				localStorage.removeItem(k);
			} catch (_) {}
		});

		// Clean pooja services in localStorage if any entry has amenities
		const servicesRaw = localStorage.getItem('pj_pooja_services');
		if (servicesRaw && isBannedPhotoUrl(servicesRaw)) {
			try {
				const services = JSON.parse(servicesRaw);
				const cleanedServices = services.map((s) => {
					if (s.imageUrl && isBannedPhotoUrl(s.imageUrl)) {
						return {
							...s,
							imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/bjsvd5-Pm2XA7u3Bhsxt41k.png?width=768&fit=crop',
						};
					}
					return s;
				});
				localStorage.setItem('pj_pooja_services', JSON.stringify(cleanedServices));
			} catch (_) {
				localStorage.removeItem('pj_pooja_services');
			}
		}
	} catch (_) {}

	// 2. Clean IndexedDB asynchronously
	getDb().then((db) => {
		if (!db) return;
		try {
			if (db.objectStoreNames.contains(STORE_PHOTOS)) {
				const tx = db.transaction(STORE_PHOTOS, 'readwrite');
				const store = tx.objectStore(STORE_PHOTOS);
				const req = store.openCursor();
				req.onsuccess = (e) => {
					const cursor = e.target.result;
					if (cursor) {
						const strVal = JSON.stringify(cursor.value || '');
						if (isBannedPhotoUrl(strVal)) {
							cursor.delete();
						}
						cursor.continue();
					}
				};
			}
		} catch (_) {}
	});
}

// Auto-purge obsolete placeholders immediately when module loads
if (typeof window !== 'undefined') {
	try {
		purgeBannedPlaceholders();
	} catch (_) {}
}

export const localPhotoDb = {
	// =========================================================================
	// SECTION PHOTOS
	// =========================================================================

	/**
	 * Synchronously read section photos from localStorage.
	 */
	getSectionPhotosSync(pageId, sectionId) {
		if (typeof window === 'undefined') return null;
		try {
			const raw = localStorage.getItem(`pj_photos_${pageId}_${sectionId}`);
			if (!raw) return null;
			if (isBannedPhotoUrl(raw)) {
				localStorage.removeItem(`pj_photos_${pageId}_${sectionId}`);
				return null;
			}
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) return null;
			const clean = parsed.filter((p) => p && p.src && !isBannedPhotoUrl(p.src));
			return clean.length > 0 ? clean : null;
		} catch {
			return null;
		}
	},

	/**
	 * Asynchronously read section photos from IndexedDB with instant fallback to localStorage.
	 */
	async getSectionPhotos(pageId, sectionId) {
		const syncVal = this.getSectionPhotosSync(pageId, sectionId);
		const db = await getDb();
		if (!db) return syncVal;

		return new Promise((resolve) => {
			try {
				if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
					resolve(syncVal);
					return;
				}
				const tx = db.transaction(STORE_PHOTOS, 'readonly');
				const store = tx.objectStore(STORE_PHOTOS);
				const req = store.get(`${pageId}::${sectionId}`);
				req.onsuccess = () => {
					if (req.result && Array.isArray(req.result)) {
						const clean = req.result.filter((p) => p && p.src && !isBannedPhotoUrl(p.src));
						if (clean.length > 0) {
							// Mirror to localStorage for synchronous instant access
							try {
								localStorage.setItem(`pj_photos_${pageId}_${sectionId}`, JSON.stringify(clean));
							} catch (_) {}
							resolve(clean);
						} else {
							// Clean up obsolete store record
							try {
								const delTx = db.transaction(STORE_PHOTOS, 'readwrite');
								delTx.objectStore(STORE_PHOTOS).delete(`${pageId}::${sectionId}`);
							} catch (_) {}
							resolve(syncVal);
						}
					} else {
						resolve(syncVal);
					}
				};
				req.onerror = () => resolve(syncVal);
			} catch {
				resolve(syncVal);
			}
		});
	},

	/**
	 * Dual-write section photos to both localStorage and IndexedDB.
	 */
	async saveSectionPhotos(pageId, sectionId, photos) {
		const key = `${pageId}::${sectionId}`;
		const cleanPhotos = Array.isArray(photos)
			? photos.filter((p) => p && p.src && !isBannedPhotoUrl(p.src))
			: [];

		// 1. Immediate synchronous localStorage write
		try {
			localStorage.setItem(`pj_photos_${pageId}_${sectionId}`, JSON.stringify(cleanPhotos));
		} catch (e) {
			console.warn('localStorage save photos warning (IndexedDB will persist):', e);
		}

		// 2. Asynchronous IndexedDB write for permanent persistence
		const db = await getDb();
		if (db && db.objectStoreNames.contains(STORE_PHOTOS)) {
			await new Promise((resolve) => {
				try {
					const tx = db.transaction(STORE_PHOTOS, 'readwrite');
					const store = tx.objectStore(STORE_PHOTOS);
					const req = store.put(cleanPhotos, key);
					req.onsuccess = () => resolve(cleanPhotos);
					req.onerror = () => resolve(cleanPhotos);
				} catch {
					resolve(cleanPhotos);
				}
			});
		}

		// 3. Broadcast real-time change to all listeners
		broadcastDataChange('photos', { pageId, sectionId });
		return cleanPhotos;
	},

	/**
	 * Remove a section override (restoring site default photos).
	 */
	async removeSectionOverride(pageId, sectionId) {
		const key = `${pageId}::${sectionId}`;
		try {
			localStorage.removeItem(`pj_photos_${pageId}_${sectionId}`);
		} catch (_) {}

		const db = await getDb();
		if (db && db.objectStoreNames.contains(STORE_PHOTOS)) {
			await new Promise((resolve) => {
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
		}

		broadcastDataChange('photos', { pageId, sectionId });
	},

	// =========================================================================
	// POOJA SERVICES
	// =========================================================================

	/**
	 * Synchronously read pooja services from localStorage.
	 */
	getPoojaServicesSync() {
		if (typeof window === 'undefined') return null;
		try {
			const raw = localStorage.getItem('pj_pooja_services');
			if (!raw) return null;
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
		} catch {
			return null;
		}
	},

	/**
	 * Asynchronously read pooja services from IndexedDB with fallback to localStorage.
	 */
	async getPoojaServices() {
		const syncVal = this.getPoojaServicesSync();
		const db = await getDb();
		if (!db) return syncVal;

		return new Promise((resolve) => {
			try {
				if (!db.objectStoreNames.contains(STORE_SERVICES)) {
					resolve(syncVal);
					return;
				}
				const tx = db.transaction(STORE_SERVICES, 'readonly');
				const store = tx.objectStore(STORE_SERVICES);
				const req = store.get('all_services');
				req.onsuccess = () => {
					if (req.result && Array.isArray(req.result) && req.result.length > 0) {
						try {
							localStorage.setItem('pj_pooja_services', JSON.stringify(req.result));
						} catch (_) {}
						resolve(req.result);
					} else {
						resolve(syncVal);
					}
				};
				req.onerror = () => resolve(syncVal);
			} catch {
				resolve(syncVal);
			}
		});
	},

	/**
	 * Dual-write pooja services to both localStorage and IndexedDB.
	 */
	async savePoojaServices(services) {
		// 1. Immediate synchronous localStorage write
		try {
			localStorage.setItem('pj_pooja_services', JSON.stringify(services));
		} catch (e) {
			console.warn('localStorage save services warning:', e);
		}

		// 2. Asynchronous IndexedDB write
		const db = await getDb();
		if (db && db.objectStoreNames.contains(STORE_SERVICES)) {
			await new Promise((resolve) => {
				try {
					const tx = db.transaction(STORE_SERVICES, 'readwrite');
					const store = tx.objectStore(STORE_SERVICES);
					const req = store.put(services, 'all_services');
					req.onsuccess = () => resolve(services);
					req.onerror = () => resolve(services);
				} catch {
					resolve(services);
				}
			});
		}

		// 3. Broadcast real-time change to all listeners
		broadcastDataChange('services');
		return services;
	},

	// =========================================================================
	// POPUP NOTIFICATIONS
	// =========================================================================

	getPopupSettingsSync() {
		if (typeof window === 'undefined') return null;
		try {
			const raw = localStorage.getItem('pj_local_popup_settings');
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	},

	async getPopupSettings() {
		const syncVal = this.getPopupSettingsSync();
		const db = await getDb();
		if (!db) return syncVal;

		return new Promise((resolve) => {
			try {
				if (!db.objectStoreNames.contains(STORE_POPUP)) {
					resolve(syncVal);
					return;
				}
				const tx = db.transaction(STORE_POPUP, 'readonly');
				const store = tx.objectStore(STORE_POPUP);
				const req = store.get('active');
				req.onsuccess = () => {
					if (req.result) {
						try {
							localStorage.setItem('pj_local_popup_settings', JSON.stringify(req.result));
						} catch (_) {}
						resolve(req.result);
					} else {
						resolve(syncVal);
					}
				};
				req.onerror = () => resolve(syncVal);
			} catch {
				resolve(syncVal);
			}
		});
	},

	async savePopupSettings(settings) {
		try {
			localStorage.setItem('pj_local_popup_settings', JSON.stringify(settings));
		} catch (e) {
			console.warn('localStorage save popup warning:', e);
		}

		const db = await getDb();
		if (db && db.objectStoreNames.contains(STORE_POPUP)) {
			await new Promise((resolve) => {
				try {
					const tx = db.transaction(STORE_POPUP, 'readwrite');
					const store = tx.objectStore(STORE_POPUP);
					const req = store.put(settings, 'active');
					req.onsuccess = () => resolve(settings);
					req.onerror = () => resolve(settings);
				} catch {
					resolve(settings);
				}
			});
		}

		broadcastDataChange('popup');
		return settings;
	},

	// =========================================================================
	// REVIEWS
	// =========================================================================

	getReviewsSync() {
		if (typeof window === 'undefined') return null;
		try {
			const raw = localStorage.getItem('pj_customer_reviews');
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	},

	async getReviews() {
		const syncVal = this.getReviewsSync();
		const db = await getDb();
		if (!db) return syncVal;

		return new Promise((resolve) => {
			try {
				if (!db.objectStoreNames.contains(STORE_REVIEWS)) {
					resolve(syncVal);
					return;
				}
				const tx = db.transaction(STORE_REVIEWS, 'readonly');
				const store = tx.objectStore(STORE_REVIEWS);
				const req = store.get('all_reviews');
				req.onsuccess = () => {
					if (req.result && Array.isArray(req.result)) {
						try {
							localStorage.setItem('pj_customer_reviews', JSON.stringify(req.result));
						} catch (_) {}
						resolve(req.result);
					} else {
						resolve(syncVal);
					}
				};
				req.onerror = () => resolve(syncVal);
			} catch {
				resolve(syncVal);
			}
		});
	},

	async saveReviews(reviews) {
		try {
			localStorage.setItem('pj_customer_reviews', JSON.stringify(reviews));
		} catch (e) {
			console.warn('localStorage save reviews warning:', e);
		}

		const db = await getDb();
		if (db && db.objectStoreNames.contains(STORE_REVIEWS)) {
			await new Promise((resolve) => {
				try {
					const tx = db.transaction(STORE_REVIEWS, 'readwrite');
					const store = tx.objectStore(STORE_REVIEWS);
					const req = store.put(reviews, 'all_reviews');
					req.onsuccess = () => resolve(reviews);
					req.onerror = () => resolve(reviews);
				} catch {
					resolve(reviews);
				}
			});
		}

		broadcastDataChange('reviews');
		return reviews;
	},

	// =========================================================================
	// ADMIN CREDENTIALS
	// =========================================================================

	getAdminCredentialsSync() {
		if (typeof window === 'undefined') return null;
		try {
			const raw = localStorage.getItem('pj_admin_custom_credentials');
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	},

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
					resolve(local);
					return;
				}
				const tx = db.transaction(STORE_CREDENTIALS, 'readonly');
				const store = tx.objectStore(STORE_CREDENTIALS);
				const req = store.get('active');
				req.onsuccess = () => resolve(req.result || local);
				req.onerror = () => resolve(local);
			} catch {
				resolve(local);
			}
		});
	},

	async saveAdminCredentials(creds) {
		try {
			localStorage.setItem('pj_admin_custom_credentials', JSON.stringify(creds));
		} catch (e) {
			console.warn('localStorage save admin credentials warning:', e);
		}

		const db = await getDb();
		if (db && db.objectStoreNames.contains(STORE_CREDENTIALS)) {
			await new Promise((resolve) => {
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
		}

		broadcastDataChange('credentials');
		return creds;
	},

	async resetAdminCredentials() {
		try {
			localStorage.removeItem('pj_admin_custom_credentials');
		} catch (_) {}

		const db = await getDb();
		if (db && db.objectStoreNames.contains(STORE_CREDENTIALS)) {
			await new Promise((resolve) => {
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

		broadcastDataChange('credentials');
	},
};

export default localPhotoDb;
