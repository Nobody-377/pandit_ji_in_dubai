import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import GridCard from '@/components/builder/elements/GridCard';
import BenefitsCard from '@/components/builder/elements/BenefitsCard';
import { useSectionPhotos } from '@/hooks/useSectionPhotos';

const defaultGrihaPhoto = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=768&fit=crop",
		alt: "Griha Pravesh Ceremony in UAE",
		title: "Griha Pravesh Ceremony"
	}
];

export default function Section1() {
	const { photos } = useSectionPhotos('griha-pravesh-and-vastu', 'grihapravesh_feature', defaultGrihaPhoto);
	const activePhoto = photos && photos.length > 0 ? photos[0] : null;
	return (
		<BlockLayout
			blockId={"zrV_Oh"}
			htmlId={"zrV_Oh"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "11.11vw auto 0.28vw 48.06vw auto 32.50vw 3.33vw auto 8.33vw auto 18.61vw 45.28vw auto 6.67vw auto 5.56vw auto 48px",
				"--t-grid-template-rows": "minmax(40px, auto) minmax(18px, auto) minmax(1px, auto) minmax(173px, auto) minmax(17px, auto) minmax(117px, auto) minmax(12px, auto) minmax(50px, auto) minmax(30px, auto) minmax(314px, auto) minmax(67px, auto) minmax(163px, auto) minmax(9px, auto) minmax(24px, auto) minmax(36px, auto) minmax(20px, auto) auto minmax(48px, auto)",
				"--small-desktop-grid-template-rows": "minmax(6.54vw, auto) minmax(2.04vw, auto) minmax(0.74vw, auto) minmax(23.37vw, auto) minmax(1.96vw, auto) minmax(5.80vw, auto) minmax(4.49vw, auto) minmax(4.08vw, auto) minmax(1.96vw, auto) minmax(16.34vw, auto) minmax(2.12vw, auto) minmax(10.95vw, auto) minmax(1.63vw, auto) minmax(16.01vw, auto) minmax(0.33vw, auto) minmax(1.63vw, auto) minmax(2.04vw, auto) minmax(4.49vw, auto) 0vw",
				"--grid-template-rows": "minmax(80px, auto) minmax(25px, auto) minmax(9px, auto) minmax(286px, auto) minmax(24px, auto) minmax(71px, auto) minmax(55px, auto) minmax(50px, auto) minmax(24px, auto) minmax(200px, auto) minmax(26px, auto) minmax(134px, auto) minmax(20px, auto) minmax(50px, auto) minmax(4px, auto) minmax(20px, auto) minmax(25px, auto) minmax(55px, auto) minmax(48px, auto)",
				"--m-grid-template-columns": "3.05% 0.91% 3.05% 23.17% 7.01% 26.83% 9.76% 11.59% 14.63%",
				"--grid-template-columns": "6.94% 0.98% 0.49% 0.74% 17.57% 1.96% 0.82% 3.68% 0.49% 7.43% 8.42% 1.47% 0.65% 7.27% 2.12% 3.35% 1.96% 8.42% 2.70% 12.99% 0.41% 0.74% 0.74% 7.68%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "auto",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "auto"
			}}
			background={{
				color: "rgb(255, 255, 255)",
				current: "color"
			}}
		>
			<LayoutElement
				elementId={"z5vGiE"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 2,
					"--grid-row": "4/6",
					"--grid-column": "4/13",
					"--m-grid-row": "4/6",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"z5vGiE"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 20px;\">Griha Pravesh Pooja</h1><h1 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 20px;\"><span style=\"color: rgb(110, 44, 44);\">In Dubai &amp; UAE</span></h1>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zO9vrB"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 3,
					"--grid-row": "6/7",
					"--grid-column": "3/23",
					"--m-grid-row": "5/7",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zO9vrB"}
					content={"<div data-v-6bafe7d3=\"\"><div data-v-6bafe7d3=\"\" class=\"pointer-events-none\"><p dir=\"auto\" class=\"body\"><span style=\"color: rgb(102, 102, 102); text-transform: none; letter-spacing: normal; font-family: Poppins, sans-serif; font-weight: 400;\">Embark on your new journey with celestial blessings. Our skilled pandits conduct traditional Griha Pravesh Pooja to instill positivity, harmony, and prosperity in your new residence.</span></p></div> </div>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			{activePhoto && (
				<LayoutElement
					elementId={"zJON0N"}
					className={"layout-element layout-element--layout transition transition--slide transition--root-hidden"}
					style={{
						"--align": "center",
						"--justify": "center",
						"--m-element-margin": "0 0 16px 0",
						"--z-index": 4,
						"--grid-row": "2/5",
						"--grid-column": "14/22",
						"--m-grid-row": "10/11",
						"--m-grid-column": "1/10"
					}}
					hasRotationFrame={false}
					hasEntranceAnimation={true}
				>
					<GridImage
						id={"zJON0N"}
						src={activePhoto.src}
						alt={activePhoto.alt || "Griha Pravesh Ceremony in UAE"}
						objectFit={"cover"}
						desktopWidth={480}
						desktopHeight={320}
						mobileWidth={328}
						desktopBorderRadius={0}
						mobileBorderRadius={0}
						rel={"nofollow"}
						className={"layout-element__component layout-element__component--GridImage"}
					/>
				</LayoutElement>
			)}
			<LayoutElement
				elementId={"zSDfK-"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 5,
					"--grid-row": "8/9",
					"--grid-column": "10/16",
					"--m-grid-row": "8/9",
					"--m-grid-column": "4/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zSDfK-"}
					text={"Book Now"}
					type={"primary"}
					href={"https://wa.me/971504192987?text=Pranam%20Pandit%20Ji.%20I%20am%20looking%20to%20organize%20a%20puja%20at%20my%20home%20and%20wanted%20to%20discuss%20the%20details%20with%20you.%20Let%20me%20know%20when%20you%20are%20free%20for%20a%20quick%20call."}
					target={"_blank"}
					rel={"nofollow"}
					backgroundColor={"rgb(140, 43, 29)"}
					fontColor={"rgb(255, 255, 255)"}
					borderColor={"rgb(0, 0, 0)"}
					backgroundColorHover={"rgb(140, 43, 29)"}
					fontColorHover={"rgb(255, 255, 255)"}
					borderColorHover={"rgb(0, 0, 0)"}
					mobileWidthVw={"71.38888888888889vw"}
					mobileHeightVw={"13.88888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zXNdH4"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 6,
					"--grid-row": "10/11",
					"--grid-column": "3/23",
					"--m-grid-row": "12/13",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zXNdH4"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; text-align: center; margin-bottom: 16px;\"><span style=\"display: block; font-size: 18px; text-transform: uppercase; letter-spacing: 2px; color: rgb(212, 164, 55); margin-bottom: 6px; font-weight: 700;\">About</span>Griha Pravesh Pooja</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zOAMfK"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 7,
					"--grid-row": "12/13",
					"--grid-column": "4/22",
					"--m-grid-row": "13/14",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zOAMfK"}
					content={"<p dir=\"auto\" class=\"body\" style=\"text-align: center; margin-bottom: 14px;\">Griha Pravesh Pooja is a sacred Hindu housewarming ceremony performed before entering a new home. The ritual seeks blessings for peace, prosperity, harmony and wellbeing for all family members.</p><p dir=\"auto\" class=\"body-large\" style=\"text-align: center;\">Our experienced pandits conduct authentic Vedic ceremonies across Dubai and UAE, helping families begin their journey in a spiritually positive environment.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z3VWz0"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 8,
					"--grid-row": "14/15",
					"--grid-column": "3/23",
					"--m-grid-row": "15/16",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"z3VWz0"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; text-align: center; margin-bottom: 16px;\"><span style=\"display: block; font-size: 18px; text-transform: uppercase; letter-spacing: 2px; color: rgb(212, 164, 55); margin-bottom: 6px; font-weight: 700;\">Benefits Of</span>Griha Pravesh Pooja</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zTRRga"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 1,
					"--grid-row": "15/19",
					"--grid-column": "2/24",
					"--m-grid-row": "17/18",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<BenefitsCard
					topLeft={"Blessings For New Home"}
					topRight={"Spiritual Harmony"}
					bottomLeft={"Family Wellbeing"}
					bottomRight={"Positive Energy"}
					imageSrc={"https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=375&fit=crop"}
					imageAlt={"Griha Pravesh Pooja Ceremony"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zkUicM"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 13,
					"--grid-row": "2/3",
					"--grid-column": "4/11",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zkUicM"}
					content={"<p dir=\"auto\" class=\"body\" style=\"--lineHeightMobile: 1.3; --fontSizeMobile: 16px;\"><span style=\"color: rgb(212, 164, 55); text-transform: none; letter-spacing: 2px; font-family: Poppins, sans-serif; font-weight: 700;\">HOUSEWARMING CEREMONY</span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
