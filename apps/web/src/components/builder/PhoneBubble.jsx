import React from 'react';

/**
 * Floating Phone call bubble with identical placement, shape, and dimension to WhatsAppBubble.
 */
export default function PhoneBubble({
	phoneNumber = '+971504192987',
	formattedNumber = '+971 50 419 2987',
}) {
	return (
		<a
			className="phone-bubble"
			href={`tel:${phoneNumber}`}
			title={`Call Pandit Ji: ${formattedNumber}`}
			aria-label={`Call ${formattedNumber}`}
		>
			<span className="phone-bubble__tooltip">{formattedNumber}</span>
			<svg
				width="64"
				height="64"
				viewBox="0 0 64 64"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<circle
					cx="32"
					cy="32"
					r="32"
					fill="var(--color-phone-bubble, #8C2B1D)"
				/>
				<g transform="translate(12.2, 11) scale(1.65)">
					<path
						d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.66.58 1 1 0 011 1v3.52a1 1 0 01-1 1A19.93 19.93 0 013 4a1 1 0 011-1h3.53a1 1 0 011 1 11.72 11.72 0 00.58 3.66 1 1 0 01-.24 1.02l-2.25 2.11z"
						fill="white"
					/>
				</g>
			</svg>
		</a>
	);
}
