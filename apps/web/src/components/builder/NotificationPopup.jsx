import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import popupService, { DEFAULT_POPUP_SETTINGS } from '@/services/popupService';

const SESSION_SHOWN_KEY = 'pj_popup_shown_in_session';

export default function NotificationPopup() {
	const location = useLocation();
	const navigate = useNavigate();

	const [settings, setSettings] = useState(DEFAULT_POPUP_SETTINGS);
	const [isOpen, setIsOpen] = useState(false);

	// Suppress popup inside the Admin Portal
	const isAdminRoute = location.pathname.startsWith('/admin-portal');

	useEffect(() => {
		// Do not trigger on admin routes
		if (isAdminRoute) {
			setIsOpen(false);
			return;
		}

		// Check if already shown/dismissed during this browsing session
		// This guarantees it does NOT pop up again when navigating between pages
		if (sessionStorage.getItem(SESSION_SHOWN_KEY)) {
			return;
		}

		let isMounted = true;
		let timer = null;

		// 1. Fetch live settings
		popupService.fetchPopupSettings().then((data) => {
			if (!isMounted) return;
			const currentSettings = data || DEFAULT_POPUP_SETTINGS;
			setSettings(currentSettings);

			// If disabled in admin panel, do not trigger
			if (currentSettings.is_enabled === false) {
				return;
			}

			// If shown while settings were loading
			if (sessionStorage.getItem(SESSION_SHOWN_KEY)) {
				return;
			}

			// 2. Trigger popup after 3 seconds on initial visit
			const delay = (Number(currentSettings.delay_seconds) || 3) * 1000;
			timer = setTimeout(() => {
				if (isMounted && !window.location.pathname.startsWith('/admin-portal')) {
					// Mark as shown so navigating between internal pages never triggers it again
					sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
					setIsOpen(true);
				}
			}, delay);
		});

		return () => {
			isMounted = false;
			if (timer) clearTimeout(timer);
		};
	}, [isAdminRoute]); // Deliberately NOT depending on location.pathname to prevent re-triggering on page changes!

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
