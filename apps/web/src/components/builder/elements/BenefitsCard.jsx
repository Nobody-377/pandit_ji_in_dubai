import React from 'react';

export default function BenefitsCard({
	topLeft,
	topRight,
	bottomLeft,
	bottomRight,
	imageSrc,
	imageAlt = "Pooja Ceremony",
	imagePosition = "center 50%",
	className = ""
}) {
	return (
		<div className={`benefits-card ${className}`}>
			<h5 className="benefits-card__item benefits-card__item--tl">{topLeft}</h5>
			<h5 className="benefits-card__item benefits-card__item--tr">{topRight}</h5>
			<div className="benefits-card__image-container">
				<img
					src={imageSrc}
					alt={imageAlt}
					className="benefits-card__image"
					style={{ objectPosition: imagePosition }}
				/>
			</div>
			<h5 className="benefits-card__item benefits-card__item--bl">{bottomLeft}</h5>
			<h5 className="benefits-card__item benefits-card__item--br">{bottomRight}</h5>
		</div>
	);
}
