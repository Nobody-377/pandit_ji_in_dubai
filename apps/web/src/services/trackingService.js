/**
 * Pandit Ji in Dubai - Centralized Google Ads & Analytics Tracking Service
 *
 * Strict Compliance:
 * 1. Tracks only genuine clicks on verified business phone CTA (+971504192987).
 * 2. Does NOT classify a click as a completed phone call (named as CTA click / lead intent).
 * 3. Supports dynamically generated phone buttons via safe event delegation.
 * 4. Protects against duplicate event listeners and rapid duplicate clicks.
 * 5. Uses safe Element checks before accessing properties.
 * 6. Preserves normal telephone navigation even if Google Tag is blocked or unavailable.
 * 7. Implements event_callback and event_timeout fallback for safe dispatch.
 * 8. Never prevents users from initiating calls.
 * 9. Completely excludes admin portal routes (/admin, /admin-portal, /admin_portal) & test sessions.
 * 10. Prepared for Enquiry Form conversions, but kept strictly DISABLED until client provides label.
 * 11. No personal customer information (PII) exposed in tracking events.
 * 12. SPA route tracking ready if a GA4 Measurement ID is provided in the future.
 */

export const TRACKING_CONFIG = {
	// Google Ads Base Account ID (AW-XXXXXXX)
	googleAdsId: 'AW-18533461761',

	// Phone Call CTA Lead Configuration
	phoneCallLead: {
		// Official Google Ads conversion label provided by client
		conversionLabel: 'G5X7CPXz1bAdEIHeuIVF',
		// Strict destination telephone verification (canonical format)
		targetPhoneCanonical: '+971504192987',
		enabled: true,
	},

	// Enquiry Form Conversion Configuration
	enquiryFormLead: {
		// PENDING CLIENT CONFIRMATION: Client has not supplied a form conversion label yet.
		// Strictly DISABLED and NEVER reuses the phone conversion label.
		conversionLabel: '',
		enabled: false,
	},

	// Google Analytics 4 (GA4) Configuration
	ga4: {
		// PENDING CLIENT CONFIRMATION: Neither GA4 nor GTM is currently configured.
		// Do not invent an ID. When client provides G-XXXXXXX, set it here.
		measurementId: '',
		enabled: false,
	},
};

/**
 * Normalizes phone numbers for strict verification against official business number.
 * Removes 'tel:', whitespaces, dashes, dots, and parentheses.
 * Converts '00971...' to '+971...'.
 */
export function normalizePhoneNumber(rawTel) {
	if (!rawTel || typeof rawTel !== 'string') return '';
	let cleaned = rawTel.replace(/^tel:/i, '').replace(/[\s\-\(\)\.]/g, '').trim();
	if (cleaned.startsWith('00971')) {
		cleaned = '+971' + cleaned.slice(5);
	}
	return cleaned;
}

/**
 * Checks whether current execution or path is an internal administrative context.
 */
export function isAdminContext() {
	if (typeof window === 'undefined') return true;
	const path = window.location.pathname.toLowerCase();
	const search = window.location.search.toLowerCase();

	return (
		path.startsWith('/admin') ||
		path.startsWith('/admin-portal') ||
		path.startsWith('/admin_portal') ||
		search.includes('preview_popup=true') ||
		search.includes('admin_test=true')
	);
}

// Module-level guard to prevent duplicate listener registration
let isPhoneTrackingInitialized = false;
let lastPhoneClickTimestamp = 0;
const CLICK_DEBOUNCE_MS = 1500;

/**
 * Dispatches a phone call CTA click conversion event to Google Ads.
 * Ensures navigation is never blocked, and honors event_callback with timeout.
 */
export function trackPhoneCallCtaClick(targetTel, onComplete) {
	// 1. Exclude admin portal activity
	if (isAdminContext()) {
		if (typeof onComplete === 'function') onComplete();
		return false;
	}

	// 2. Strict destination phone number verification
	const normalized = normalizePhoneNumber(targetTel);
	if (normalized !== TRACKING_CONFIG.phoneCallLead.targetPhoneCanonical) {
		if (typeof onComplete === 'function') onComplete();
		return false;
	}

	// 3. Debounce rapid duplicate clicks
	const now = Date.now();
	if (now - lastPhoneClickTimestamp < CLICK_DEBOUNCE_MS) {
		if (typeof onComplete === 'function') onComplete();
		return false;
	}
	lastPhoneClickTimestamp = now;

	// 4. Check Google Tag availability
	if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
		if (typeof onComplete === 'function') onComplete();
		return true;
	}

	// 5. Dispatch conversion with timeout and callback safety
	let callbackExecuted = false;
	const safeCallback = () => {
		if (!callbackExecuted) {
			callbackExecuted = true;
			if (typeof onComplete === 'function') {
				onComplete();
			}
		}
	};

	// Safe fallback timer so user navigation is never hung if Google Ads endpoint is slow
	const fallbackTimer = setTimeout(safeCallback, 800);

	try {
		const sendTo = `${TRACKING_CONFIG.googleAdsId}/${TRACKING_CONFIG.phoneCallLead.conversionLabel}`;

		window.gtag('event', 'conversion', {
			send_to: sendTo,
			// Descriptive analytics parameters (strictly no PII)
			event_category: 'Lead',
			event_label: 'Phone Call CTA Click',
			value: 1.0,
			currency: 'AED',
			event_callback: () => {
				clearTimeout(fallbackTimer);
				safeCallback();
			},
			event_timeout: 1000,
		});
		return true;
	} catch (err) {
		clearTimeout(fallbackTimer);
		safeCallback();
		return false;
	}
}

/**
 * Initializes global click listener for all current and dynamically created phone buttons.
 * Uses event delegation on document, handles Element instances safely, and avoids duplicate registration.
 */
export function initPhoneCallTracking() {
	if (typeof window === 'undefined' || isPhoneTrackingInitialized) {
		return;
	}
	isPhoneTrackingInitialized = true;

	document.addEventListener(
		'click',
		(event) => {
			// 1. Safe Element check
			if (!event.target || !(event.target instanceof Element)) {
				return;
			}

			// 2. Find closest anchor tag
			const anchor = event.target.closest('a');
			if (!anchor) return;

			const href = anchor.getAttribute('href') || '';
			if (!href.toLowerCase().startsWith('tel:')) {
				return;
			}

			// 3. Verify phone number and track
			const destination = href.slice(4);
			trackPhoneCallCtaClick(destination);

			// We purposefully DO NOT call event.preventDefault() here.
			// This ensures mobile browsers (iOS Safari, Android Chrome) can invoke
			// their native dialer immediately without security restrictions on async gestures.
		},
		{ capture: true, passive: true }
	);
}

// Module-level submission deduping set
const processedSubmissionIds = new Set();

/**
 * Enquiry Form Conversion Tracker
 * Stays strictly DISABLED until the client provides a dedicated form conversion label.
 */
export function trackEnquiryFormSuccess(formId, submissionId = null) {
	// 1. Check if configured and enabled
	if (!TRACKING_CONFIG.enquiryFormLead.enabled || !TRACKING_CONFIG.enquiryFormLead.conversionLabel) {
		return false;
	}

	// 2. Exclude admin portal
	if (isAdminContext()) {
		return false;
	}

	// 3. Prevent duplicate conversions for same submission
	const dedupKey = submissionId || `${formId}_${Date.now()}`;
	if (processedSubmissionIds.has(dedupKey)) {
		return false;
	}
	processedSubmissionIds.add(dedupKey);

	// 4. Dispatch only if gtag is present
	if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
		try {
			window.gtag('event', 'conversion', {
				send_to: `${TRACKING_CONFIG.googleAdsId}/${TRACKING_CONFIG.enquiryFormLead.conversionLabel}`,
				event_category: 'Lead',
				event_label: `Form Submission: ${formId}`,
				// Strict: NO PII (name, phone, email) is ever passed in tracking payload
			});
			return true;
		} catch (err) {
			console.warn('[Tracking] Form conversion dispatch error:', err);
		}
	}
	return false;
}

/**
 * SPA Page View Tracking (for future GA4 integration)
 */
export function trackSpaPageView(pathname) {
	if (isAdminContext() || !TRACKING_CONFIG.ga4.enabled || !TRACKING_CONFIG.ga4.measurementId) {
		return;
	}
	if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
		try {
			window.gtag('config', TRACKING_CONFIG.ga4.measurementId, {
				page_path: pathname,
			});
		} catch (_) {}
	}
}

export default {
	TRACKING_CONFIG,
	normalizePhoneNumber,
	isAdminContext,
	trackPhoneCallCtaClick,
	initPhoneCallTracking,
	trackEnquiryFormSuccess,
	trackSpaPageView,
};
