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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=375&height=375&fit=crop',
						alt: 'Vedic Puja Ceremony in Dubai',
						title: 'Vedic Puja Ceremony'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/20240229_154541.jpg-h2vMCasbNutJ9OkK.jpeg?width=375&height=375&fit=crop',
						alt: 'Traditional Havan and Mandap Setup',
						title: 'Traditional Havan'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0016.jpg-LbPgYucL565kxmOf.jpeg?width=375&height=375&fit=crop',
						alt: 'Satyanarayan Pooja Dubai',
						title: 'Satyanarayan Pooja'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=375&height=375&fit=crop',
						alt: 'Griha Pravesh Ceremony in UAE',
						title: 'Griha Pravesh Ceremony'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=375&height=375&fit=crop',
						alt: 'Sacred Vedic Rituals',
						title: 'Sacred Vedic Rituals'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0007.jpg-2QiVsBsmEfPNGWgH.jpeg?width=375&height=375&fit=crop',
						alt: 'Samagri and Havan Kund Preparation',
						title: 'Samagri & Kund Setup'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230927-wa0001.jpg-1b98zpUH2G4uyAGi.jpeg?width=375&height=375&fit=crop',
						alt: 'Aarti and Holy Blessings',
						title: 'Aarti & Holy Blessings'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=375&height=375&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0016.jpg-LbPgYucL565kxmOf.jpeg?width=375&height=375&fit=crop',
						alt: 'Vedic Pooja Step 1',
						title: 'Pooja Step 1'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=375&height=375&fit=crop',
						alt: 'Vedic Pooja Step 2',
						title: 'Pooja Step 2'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0011.jpg-m4730MVyqgY9OzLF.jpeg?width=375&height=375&fit=crop',
						alt: 'Vedic Pooja Step 3',
						title: 'Pooja Step 3'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0007.jpg-2QiVsBsmEfPNGWgH.jpeg?width=375&height=375&fit=crop',
						alt: 'Vedic Pooja Step 4',
						title: 'Pooja Step 4'
					},
					{
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=375&height=375&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/bjsvd5-Pm2XA7u3Bhsxt41k.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/bjsvd5-Pm2XA7u3Bhsxt41k.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-2VtWj9NpLbLZZmNI.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-FPqXfKUnedc9mRXi.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/cc2udk-urqOJNFHQkAaJ30S.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-Wer3mZjaMh9kGTR9.png?width=768&fit=crop',
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
						src: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/vczdfl-K9nbyFiOC3NqnzYB.png?width=768&fit=crop',
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

