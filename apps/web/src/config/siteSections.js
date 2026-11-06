/**
 * Registry of all editable photo sections across the Pandit Ji in Dubai site.
 * Grouped by page, with metadata and default fallbacks.
 */

export const SITE_SECTIONS = [
	{
		pageId: 'home',
		pageTitle: 'Home Page',
		route: '/',
		sections: [
			{
				sectionId: 'home_gallery',
				title: 'Media Gallery (Section 6)',
				description: 'The main photo gallery grid / carousel near the bottom of the home page.',
				type: 'gallery',
				defaults: [
					{
						src: '/images/pandit_ji_portrait.webp',
						alt: 'Vedic Puja Ceremony in Dubai',
						title: 'Vedic Puja Ceremony'
					},
					{
						src: '/images/havan_mandap.webp',
						alt: 'Traditional Havan and Mandap Setup',
						title: 'Traditional Havan'
					},
					{
						src: '/images/sacred_havan_ritual.webp',
						alt: 'Satyanarayan Pooja Dubai',
						title: 'Satyanarayan Pooja'
					},
					{
						src: '/images/griha_pravesh_vastu.webp',
						alt: 'Griha Pravesh Ceremony in UAE',
						title: 'Griha Pravesh Ceremony'
					},
					{
						src: '/images/sacred_vedic_rituals.webp',
						alt: 'Sacred Vedic Rituals',
						title: 'Sacred Vedic Rituals'
					},
					{
						src: '/images/havan_kund_samagri.webp',
						alt: 'Samagri and Havan Kund Preparation',
						title: 'Samagri & Kund Setup'
					},
					{
						src: '/images/aarti_blessings.webp',
						alt: 'Aarti and Holy Blessings',
						title: 'Aarti & Holy Blessings'
					},
					{
						src: '/images/vedic_wedding_ceremony.webp',
						alt: 'Vedic Pandit Ji Dubai',
						title: 'Vedic Pandit Ji Dubai'
					}
				]
			},
			{
				sectionId: 'home_about_feature',
				title: 'About Vedic Pandit (Section 3)',
				description: 'Large feature portrait photo in the About Pandit Ji section.',
				type: 'single',
				defaults: [
					{
						src: '/images/pandit_ji_portrait.webp',
						alt: 'About Pandit Ji Dubai',
						title: 'About Pandit Ji'
					}
				]
			}
		]
	},
	{
		pageId: 'authentic-vedic-pooja-dubai',
		pageTitle: 'Authentic Vedic Pooja',
		route: '/authentic-vedic-pooja-dubai',
		sections: [
			{
				sectionId: 'authentic_gallery',
				title: 'Ceremony Gallery (Section 3)',
				description: '11-photo gallery showing authentic ritual proceedings.',
				type: 'gallery',
				defaults: [
					{
						src: '/images/sacred_havan_ritual.webp',
						alt: 'Vedic Pooja Step 1',
						title: 'Pooja Step 1'
					},
					{
						src: '/images/griha_pravesh_vastu.webp',
						alt: 'Vedic Pooja Step 2',
						title: 'Pooja Step 2'
					},
					{
						src: '/images/vedic_wedding_ceremony.webp',
						alt: 'Vedic Pooja Step 3',
						title: 'Pooja Step 3'
					},
					{
						src: '/images/havan_kund_samagri.webp',
						alt: 'Vedic Pooja Step 4',
						title: 'Pooja Step 4'
					},
					{
						src: '/images/vedic_wedding_ceremony.webp',
						alt: 'Vedic Pooja Step 5',
						title: 'Pooja Step 5'
					}
				]
			},
			{
				sectionId: 'authentic_feature',
				title: 'Vedic Pandit Portrait (Section 2)',
				description: 'Main feature portrait in Section 2.',
				type: 'single',
				defaults: [
					{
						src: '/images/pandit_ji_portrait.webp',
						alt: 'Vedic Pandit Ji Dubai',
						title: 'Vedic Pandit Portrait'
					}
				]
			}
		]
	},
	{
		pageId: 'wedding-ceremonies',
		pageTitle: 'Wedding Ceremonies',
		route: '/wedding-ceremonies',
		sections: [
			{
				sectionId: 'wedding_feature_1',
				title: 'Wedding Ceremony Hero Image (Desktop & Mobile)',
				description: 'Primary hero image for wedding ceremonies displayed across desktop and mobile screens.',
				type: 'single',
				defaults: [
					{
						src: '/images/vedic_wedding_ceremony.webp',
						alt: 'Vedic Wedding Ceremony Mandap',
						title: 'Wedding Mandap'
					}
				]
			},
			{
				sectionId: 'wedding_feature_2',
				title: 'Sacred Fire & Wedding Benefits Image',
				description: 'Sacred fire ritual photo and wedding benefits card highlight.',
				type: 'single',
				defaults: [
					{
						src: '/images/vedic_wedding_ceremony.webp',
						alt: 'Sacred Fire Rituals',
						title: 'Sacred Fire Rituals'
					}
				]
			}
		]
	},
	{
		pageId: 'griha-pravesh-and-vastu',
		pageTitle: 'Griha Pravesh & Vastu',
		route: '/griha-pravesh-and-vastu',
		sections: [
			{
				sectionId: 'grihapravesh_feature',
				title: 'Griha Pravesh Ceremony Photo',
				description: 'Main feature photo for new home housewarming ceremonies.',
				type: 'single',
				defaults: [
					{
						src: '/images/sacred_vedic_rituals.webp',
						alt: 'Griha Pravesh Ceremony in UAE',
						title: 'Griha Pravesh Ceremony'
					}
				]
			}
		]
	},
	{
		pageId: 'car-pooja-in-dubai-vehicle-pooja-in-dubai',
		pageTitle: 'Car & Vehicle Pooja',
		route: '/car-pooja-in-dubai-vehicle-pooja-in-dubai',
		sections: [
			{
				sectionId: 'carpooja_feature',
				title: 'Vehicle Blessing Photo',
				description: 'Primary banner image for vehicle blessings in Dubai.',
				type: 'single',
				defaults: [
					{
						src: '/images/maha_mrityunjaya.webp',
						alt: 'Car and Vehicle Pooja Dubai',
						title: 'Vehicle Pooja'
					}
				]
			}
		]
	},
	{
		pageId: 'shanti-havan-and-yagna',
		pageTitle: 'Shanti Havan & Yagna',
		route: '/shanti-havan-and-yagna',
		sections: [
			{
				sectionId: 'shantihavan_feature',
				title: 'Havan Kund & Yagna Hero Image',
				description: 'Primary hero feature photo for Maha Mrityunjaya, Gayatri & Shanti Yagnas.',
				type: 'single',
				defaults: [
					{
						src: '/images/sacred_havan_ritual.webp',
						alt: 'Shanti Havan and Yagna',
						title: 'Havan Kund & Yagna'
					}
				]
			},
			{
				sectionId: 'shantihavan_benefits',
				title: 'Benefits of Havan Card Image',
				description: 'Feature photo displayed inside the Benefits of Havan card.',
				type: 'single',
				defaults: [
					{
						src: '/images/shanti_havan_yagna.webp',
						alt: 'Sacred Havan Ceremony',
						title: 'Sacred Havan Ceremony'
					}
				]
			}
		]
	},
	{
		pageId: 'rudrabhishek-and-planets',
		pageTitle: 'Rudrabhishek & Planets',
		route: '/rudrabhishek-and-planets',
		sections: [
			{
				sectionId: 'rudrabhishek_feature',
				title: 'Rudrabhishek Pooja Photo',
				description: 'Feature photo for Shiva Rudrabhishek & Navgraha Shanti.',
				type: 'single',
				defaults: [
					{
						src: '/images/havan_mandap.webp',
						alt: 'Rudrabhishek Pooja Dubai',
						title: 'Rudrabhishek Ceremony'
					}
				]
			}
		]
	},
	{
		pageId: 'satyanarayan-and-festivals',
		pageTitle: 'Satyanarayan & Festivals',
		route: '/satyanarayan-and-festivals',
		sections: [
			{
				sectionId: 'satyanarayan_feature',
				title: 'Satyanarayan Katha Photo',
				description: 'Feature photo for Lord Satyanarayan Pooja & festive rituals.',
				type: 'single',
				defaults: [
					{
						src: '/images/satyanarayan_festivals.webp',
						alt: 'Satyanarayan Katha Ceremony',
						title: 'Satyanarayan Katha'
					}
				]
			}
		]
	},
	{
		pageId: 'pitru-paksha-pooja-dubai',
		pageTitle: 'Pitru Paksha Pooja',
		route: '/pitru-paksha-pooja-dubai',
		sections: [
			{
				sectionId: 'pitrupaksha_feature',
				title: 'Pitru Paksha Ritual Photo',
				description: 'Feature photo for Shraddh, Tarpana, and Pitru Dosh Nivaran.',
				type: 'single',
				defaults: [
					{
						src: '/images/kundali_horoscope.webp',
						alt: 'Pitru Paksha Pooja Dubai',
						title: 'Pitru Paksha Ritual'
					}
				]
			}
		]
	}
];

export const getSectionConfig = (pageId, sectionId) => {
	const page = SITE_SECTIONS.find((p) => p.pageId === pageId);
	if (!page) return null;
	return page.sections.find((s) => s.sectionId === sectionId) || null;
};

