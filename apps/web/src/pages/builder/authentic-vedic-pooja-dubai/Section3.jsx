import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridGallery from '@/components/builder/elements/GridGallery';
import useSectionPhotos from '@/hooks/useSectionPhotos';

const defaultGalleryImages = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0016.jpg-LbPgYucL565kxmOf.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 1"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 2"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0011.jpg-m4730MVyqgY9OzLF.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 3"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0007.jpg-2QiVsBsmEfPNGWgH.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 4"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 5"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 6"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230927-wa0001.jpg-1b98zpUH2G4uyAGi.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 7"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0011.jpg-aVctRVuhGqsfuTMN.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 8"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/20250210_171553.jpg-dZM7qE1PybFyjCH8.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 9"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/20240229_171305.jpg-Pls2oC8gLFk87BnS.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 10"
	},
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/20250715_085734.jpg-SHj5MPzLM5uylbIW.jpeg?width=375&height=375&fit=crop",
		alt: "Vedic Pooja Step 11"
	}
];

export default function Section3() {
	const { photos } = useSectionPhotos('authentic-vedic-pooja-dubai', 'authentic_gallery', defaultGalleryImages);
	return (
		<BlockLayout
			blockId={"rAd79F"}
			htmlId={"rAd79F"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--width": "1224px",
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "16.11vw auto 4.44vw auto 16px",
				"--t-grid-template-rows": "minmax(58px, auto) minmax(86px, auto) minmax(16px, auto) minmax(1112px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(6.54vw, auto) minmax(8.25vw, auto) minmax(4.08vw, auto) minmax(38.89vw, auto) 2.61vw",
				"--grid-template-rows": "minmax(80px, auto) minmax(101px, auto) minmax(50px, auto) minmax(476px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "8.42% 9.97% 52.29% 20.92% 8.42%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1288px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "739px"
			}}
			background={{
				color: "#FAF6F0",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"vg9eRk"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "center",
					"--z-index": 1,
					"--grid-row": "2/3",
					"--grid-column": "2/5",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"vg9eRk"}
					content={"<p dir=\"auto\" style=\"color: rgb(140, 43, 29); margin-bottom: 20px\" class=\"body-small\"><span style=\"color: rgb(140, 43, 29); font-family: Montserrat; font-weight: 500\">GALLERY</span></p><h2 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Sacred Moments</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zwrmEo"}
				className={"layout-element layout-element--layout transition transition--slide transition--root-hidden"}
				style={{
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 2,
					"--grid-row": "4/5",
					"--grid-column": "3/4",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridGallery
					id={"zwrmEo"}
					images={photos}
					sizes={"(min-width: 920px) 148px, 70px"}
					columnCount={4}
					columnGap={"16px"}
					layout={"grid"}
					className={"layout-element__component layout-element__component--GridGallery"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
