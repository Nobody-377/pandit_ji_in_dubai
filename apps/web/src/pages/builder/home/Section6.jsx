import React from 'react';
import GridGallery from '@/components/builder/elements/GridGallery';
import useSectionPhotos from '@/hooks/useSectionPhotos';
import './Section6.css';

const galleryImages = [
	{
		src: "/images/puja2_ceremony.webp",
		alt: "Vedic Pooja Setup & Sacred Offerings in Dubai"
	},
	{
		src: "/images/puja6_ceremony.mp4",
		poster: "/images/puja6_ceremony_poster.webp",
		type: "video",
		alt: "Sacred Vedic Puja Ritual Video Ceremony in Dubai"
	},
	{
		src: "/images/puja3_ceremony.webp",
		alt: "Auspicious Griha Pravesh & Mandap Pooja in UAE"
	},
	{
		src: "/images/puja1_ceremony.webp",
		alt: "Deities & Flower Rangoli Vedic Pooja Dubai"
	},
	{
		src: "/images/puja4_ceremony.webp",
		alt: "Grand Indoor Mandap & Shubh Labh Setup Dubai"
	},
	{
		src: "/images/puja5_ceremony.webp",
		alt: "Shree Krishna & Vastu Devata Pooja Ceremony"
	},
	{
		src: "/images/pandit_ji_portrait.webp",
		alt: "Vedic Puja Ceremony in Dubai"
	},
	{
		src: "/images/havan_mandap.webp",
		alt: "Traditional Havan and Mandap Setup"
	},
	{
		src: "/images/sacred_havan_ritual.webp",
		alt: "Satyanarayan Pooja Dubai"
	},
	{
		src: "/images/griha_pravesh_vastu.webp",
		alt: "Griha Pravesh Ceremony in UAE"
	},
	{
		src: "/images/sacred_vedic_rituals.webp",
		alt: "Sacred Vedic Rituals"
	},
	{
		src: "/images/havan_kund_samagri.webp",
		alt: "Samagri and Havan Kund Preparation"
	},
	{
		src: "/images/aarti_blessings.webp",
		alt: "Aarti and Holy Blessings"
	},
	{
		src: "/images/vedic_wedding_ceremony.webp",
		alt: "Vedic Pandit Ji Dubai"
	}
];

export default function Section6() {
	const { photos } = useSectionPhotos('home', 'home_gallery', galleryImages);

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
					images={photos}
					layout="carousel"
				/>
			</div>
		</section>
	);
}
