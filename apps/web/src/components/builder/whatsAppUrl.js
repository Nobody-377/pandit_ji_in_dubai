export function buildWhatsAppUrl(number, message, isEnabled) {
	if (!number) {
		return null;
	}

	// Match site-modules: show when number is set unless explicitly disabled.
	if (isEnabled === false) {
		return null;
	}

	const cleanNumber = String(number).replace(/\D/g, '');
	if (!message) {
		return `https://wa.me/${cleanNumber}`;
	}

	// Protect against double encoding: decode first if string already has %20 or other entities
	let decoded = message;
	try {
		decoded = decodeURIComponent(message);
	} catch (_) {
		decoded = message;
	}

	return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(decoded)}`;
}
