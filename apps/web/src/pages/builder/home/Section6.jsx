import React from 'react';
import GridGallery from '@/components/builder/elements/GridGallery';
import './Section6.css';

const galleryImages = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=375&height=375&fit=crop",
		alt: "Vedic Puja Ceremony in Dubai"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/20240229_154541.jpg-h2vMCasbNutJ9OkK.jpeg?width=375&height=375&fit=crop",
		alt: "Traditional Havan and Mandap Setup"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0016.jpg-LbPgYucL565kxmOf.jpeg?width=375&height=375&fit=crop",
		alt: "Satyanarayan Pooja Dubai"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=375&height=375&fit=crop",
		alt: "Griha Pravesh Ceremony in UAE"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=375&height=375&fit=crop",
		alt: "Sacred Vedic Rituals"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0007.jpg-2QiVsBsmEfPNGWgH.jpeg?width=375&height=375&fit=crop",
		alt: "Samagri and Havan Kund Preparation"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230927-wa0001.jpg-1b98zpUH2G4uyAGi.jpeg?width=375&height=375&fit=crop",
		alt: "Aarti and Holy Blessings"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pandit Ji Dubai"
	}
];

export default function Section6() {
	return (
		<section
			id="vW1W8G"
			className="block section-gallery-block"
			data-block-id="vW1W8G"
		>
			<div className="section-gallery-container">
				<div className="section-gallery-header">
					<h5
						className="section-gallery-eyebrow"
						style={{ color: 'rgb(229, 179, 97)' }}
					>
						G A L L E R Y
					</h5>
					<h2
						className="section-gallery-heading"
						style={{ color: 'rgb(140, 43, 29)' }}
					>
						Media Gallery
					</h2>
				</div>
				<GridGallery
					id="zRpA_V"
					images={galleryImages}
					layout="carousel"
				/>
			</div>
		</section>
	);
}
