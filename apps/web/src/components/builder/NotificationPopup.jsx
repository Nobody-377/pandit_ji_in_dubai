import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import popupService, { DEFAULT_POPUP_SETTINGS } from '@/services/popupService';
import localPhotoDb from '@/services/localPhotoDb';

const SESSION_SHOWN_KEY = 'pj_popup_shown_in_session';
const LAST_UPDATED_KEY = 'pj_popup_last_seen_timestamp';

export default function NotificationPopup() {
	const location = useLocation();
	const navigate = useNavigate();

	// Initialize synchronously from local persistent cache (zero delay / flicker)
	const [settings, setSettings] = useState(() => {
		const sync = localPhotoDb.getPopupSettingsSync();
		return sync ? { ...DEFAULT_POPUP_SETTINGS, ...sync } : DEFAULT_POPUP_SETTINGS;
	});
	const [isOpen, setIsOpen] = useState(false);

	// Suppress popup inside any variant of Admin Portal routes
	const isAdminRoute =
		location.pathname.startsWith('/admin-portal') ||
		location.pathname.startsWith('/admin_portal') ||
		location.pathname.startsWith('/admin');

	// Check if URL has ?preview_popup=true to force preview for testing
	const isPreviewMode =
		location.search.includes('preview_popup=true') ||
		location.hash.includes('preview-popup');

	const timerRef = useRef(null);

	const triggerPopup = useCallback((activeSettings, force = false) => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		if (activeSettings.is_enabled === false && !force) {
			setIsOpen(false);
			return;
		}

		// If preview mode or forced by admin broadcast, trigger immediately (or 600ms)
		if (force || isPreviewMode) {
			sessionStorage.removeItem(SESSION_SHOWN_KEY);
			timerRef.current = setTimeout(() => {
				setIsOpen(true);
			}, 600);
			return;
		}

		// Check if already shown in this session
		if (sessionStorage.getItem(SESSION_SHOWN_KEY)) {
			return;
		}

		const delay = (Number(activeSettings.delay_seconds) || 3) * 1000;
		timerRef.current = setTimeout(() => {
			if (!window.location.pathname.startsWith('/admin')) {
				sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
				setIsOpen(true);
			}
		}, delay);
	}, [isPreviewMode]);

	const loadSettings = useCallback(async (forceTrigger = false) => {
		try {
			const data = await popupService.fetchPopupSettings();
			const current = data || DEFAULT_POPUP_SETTINGS;
			setSettings(current);

			// If admin updated popup settings, clear session suppression so visitor immediately sees the new banner
			if (current.updated_at) {
				const lastSeen = sessionStorage.getItem(LAST_UPDATED_KEY);
				if (lastSeen !== current.updated_at) {
					sessionStorage.removeItem(SESSION_SHOWN_KEY);
					sessionStorage.setItem(LAST_UPDATED_KEY, current.updated_at);
				}
			}

			if (!isAdminRoute) {
				triggerPopup(current, forceTrigger);
			}
		} catch (err) {
			console.warn('Error loading popup settings:', err);
		}
	}, [isAdminRoute, triggerPopup]);

	// Initial Mount & Route Change Effect
	useEffect(() => {
		if (isAdminRoute) {
			setIsOpen(false);
			if (timerRef.current) clearTimeout(timerRef.current);
			return;
		}

		loadSettings(isPreviewMode);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [isAdminRoute, isPreviewMode, loadSettings]);

	// Real-time synchronization across browser tabs and admin updates
	useEffect(() => {
		const handleDataUpdate = (event) => {
			const detail = event?.detail;
			if (!detail || detail.type === 'popup') {
				// Admin saved new popup settings: update and trigger so user sees changes immediately
				sessionStorage.removeItem(SESSION_SHOWN_KEY);
				loadSettings(true);
			}
		};

		const handleStorage = (e) => {
			if (!e.key || e.key === 'pj_local_popup_settings' || e.key === 'pj_last_sync_timestamp') {
				sessionStorage.removeItem(SESSION_SHOWN_KEY);
				loadSettings(true);
			}
		};

		window.addEventListener('pj_site_data_updated', handleDataUpdate);
		window.addEventListener('storage', handleStorage);

		let channel = null;
		try {
			if ('BroadcastChannel' in window) {
				channel = new BroadcastChannel('pj_sync_channel');
				channel.onmessage = (msg) => {
					if (!msg?.data || msg.data.type === 'popup') {
						sessionStorage.removeItem(SESSION_SHOWN_KEY);
						loadSettings(true);
					}
				};
			}
		} catch (_) {}

		return () => {
			window.removeEventListener('pj_site_data_updated', handleDataUpdate);
			window.removeEventListener('storage', handleStorage);
			if (channel) {
				try {
					channel.close();
				} catch (_) {}
			}
		};
	}, [loadSettings]);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape' && isOpen) {
				handleClose();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);

	const handleClose = (e) => {
		if (e) e.stopPropagation();
		// Mark as seen for this session
		sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
		setIsOpen(false);
	};

	const handleImageClick = (e) => {
		e.stopPropagation();
		// Mark as seen for this session
		sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
		setIsOpen(false);

		const target = settings.target_url || '/authentic-vedic-pooja-dubai';

		if (target.startsWith('http://') || target.startsWith('https://')) {
			window.open(target, '_blank', 'noopener,noreferrer');
		} else if (target.startsWith('tel:') || target.startsWith('mailto:')) {
			window.location.href = target;
		} else {
			// Internal route navigation
			navigate(target.startsWith('/') ? target : `/${target}`);
		}
	};

	if (isAdminRoute || !isOpen || settings.is_enabled === false) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
			onClick={handleClose}
			role="dialog"
			aria-modal="true"
		>
			{/* Centered Modal Card */}
			<div
				className="relative max-w-md w-full bg-[#1A1412] border-2 border-[#E5B361]/60 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 group cursor-pointer"
				onClick={handleImageClick}
				title="Click to view details"
			>
				{/* ========================================================================= */}
				{/* CUT / CLOSE ICON ON UPPER RIGHT */}
				{/* ========================================================================= */}
				<button
					type="button"
					onClick={handleClose}
					aria-label="Close Pop-up"
					className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/80 hover:bg-[#8C2B1D] text-white border border-[#E5B361]/50 hover:border-white flex items-center justify-center transition-all duration-200 shadow-lg group-hover:scale-105"
				>
					<X className="w-5 h-5 text-[#FAF6F0]" />
				</button>

				{/* Promotional Banner Image (Clickable) */}
				<div className="relative w-full aspect-[4/5] sm:aspect-square bg-black/60 overflow-hidden">
					<img
						key={settings.image_url}
						src={settings.image_url}
						alt={settings.title || 'Special Pooja Announcement'}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					{/* Subtle Top Gradient for Close Button Visibility */}
					<div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

					{/* Bottom CTA Banner */}
					<div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end text-left pointer-events-none">
						{settings.title && (
							<h3 className="text-sm sm:text-base font-bold text-[#FAF6F0] drop-shadow-md mb-1.5 flex items-center gap-1.5 font-['Marcellus',serif]">
								<Sparkles className="w-4 h-4 text-[#E5B361] shrink-0" />
								<span>{settings.title}</span>
							</h3>
						)}

						<div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E5B361] uppercase tracking-wider font-['Poppins',sans-serif]">
							<span>Tap to Read Pooja Information & Vidhi</span>
							<ExternalLink className="w-3.5 h-3.5" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
