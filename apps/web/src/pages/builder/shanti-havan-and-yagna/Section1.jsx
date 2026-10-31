import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridCard from '@/components/builder/elements/GridCard';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import BenefitsCard from '@/components/builder/elements/BenefitsCard';
import { useSectionPhotos } from '@/hooks/useSectionPhotos';

const defaultHavanPhoto = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-FPqXfKUnedc9mRXi.png?width=768&fit=crop",
		alt: "Shanti Havan and Yagna",
		title: "Havan Kund & Yagna"
	}
];

const defaultBenefitsPhoto = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/cc2udk-urqOJNFHQkAaJ30S.png?width=768&fit=crop",
		alt: "Sacred Havan Ceremony",
		title: "Sacred Havan Ceremony"
	}
];

export default function Section1() {
	const { photos: havanPhotos } = useSectionPhotos('shanti-havan-and-yagna', 'shantihavan_feature', defaultHavanPhoto);
	const activeHavanPhoto = (havanPhotos && havanPhotos.length > 0) ? havanPhotos[0] : defaultHavanPhoto[0];

	const { photos: benefitsPhotos } = useSectionPhotos('shanti-havan-and-yagna', 'shantihavan_benefits', defaultBenefitsPhoto);
	const activeBenefitsPhoto = (benefitsPhotos && benefitsPhotos.length > 0) ? benefitsPhotos[0] : defaultBenefitsPhoto[0];
	return (
		<BlockLayout
			blockId={"zYZmVT"}
			htmlId={"zYZmVT"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "6.67vw auto 7.50vw auto auto 5.56vw auto 3.89vw auto 11.11vw auto 1.94vw auto 25.00vw auto 2.50vw auto 48px",
				"--t-grid-template-rows": "minmax(24px, auto) minmax(23px, auto) minmax(27px, auto) minmax(150px, auto) minmax(156px, auto) minmax(20px, auto) minmax(50px, auto) minmax(14px, auto) minmax(280px, auto) minmax(40px, auto) minmax(106px, auto) minmax(7px, auto) minmax(263px, auto) minmax(90px, auto) minmax(85px, auto) minmax(9px, auto) auto minmax(48px, auto)",
				"--small-desktop-grid-template-rows": "minmax(5.23vw, auto) minmax(2.04vw, auto) minmax(1.23vw, auto) minmax(24.26vw, auto) minmax(1.88vw, auto) minmax(3.19vw, auto) minmax(5.80vw, auto) minmax(4.08vw, auto) minmax(3.27vw, auto) minmax(11.11vw, auto) minmax(0.49vw, auto) minmax(10.95vw, auto) minmax(7.92vw, auto) minmax(0.25vw, auto) minmax(1.96vw, auto) minmax(2.04vw, auto) minmax(4.25vw, auto) minmax(4.82vw, auto) minmax(26.14vw, auto) 17.89vw",
				"--grid-template-rows": "minmax(64px, auto) minmax(25px, auto) minmax(15px, auto) minmax(297px, auto) minmax(23px, auto) minmax(39px, auto) minmax(71px, auto) minmax(50px, auto) minmax(40px, auto) minmax(136px, auto) minmax(6px, auto) minmax(134px, auto) minmax(97px, auto) minmax(3px, auto) minmax(24px, auto) minmax(25px, auto) minmax(52px, auto) minmax(59px, auto) minmax(320px, auto) 1fr",
				"--m-grid-template-columns": "2.74% 1.52% 17.38% 5.18% 2.13% 6.40% 37.50% 1.83% 0.61% 0.61% 16.16% 3.35% 0.30% 4.27%",
				"--grid-template-columns": "4.74% 0.82% 2.86% 0.41% 1.55% 15.77% 2.21% 0.98% 3.02% 0.08% 3.19% 2.61% 8.33% 4.90% 1.96% 3.43% 2.04% 2.12% 4.00% 3.51% 4.08% 5.72% 12.25% 0.98% 1.06% 1.63% 5.72%",
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
				elementId={"zIpytp"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 2,
					"--grid-row": "2/3",
					"--grid-column": "3/13",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/15"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zIpytp"}
					content={"<p dir=\"auto\" class=\"body\"><span style=\"color: rgb(212, 164, 55); text-transform: none; letter-spacing: 2px; font-family: Poppins, sans-serif; font-weight: 700;\">SACRED FIRE CEREMONY</span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"znr9xp"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 3,
					"--grid-row": "4/5",
					"--grid-column": "2/14",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"znr9xp"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20); --lineHeightDesktop: 1.3; --fontSizeDesktop: 72px; margin-bottom: 0px;\">Shanti Havan &amp; Yagna</h3><h1 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 20px;\"><span style=\"color: rgb(110, 44, 44);\">In Dubai &amp; UAE</span></h1>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zZHmok"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 4,
					"--grid-row": "7/8",
					"--grid-column": "5/25",
					"--m-grid-row": "5/6",
					"--m-grid-column": "1/15"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zZHmok"}
					content={"<div data-v-6bafe7d3=\"\"><div data-v-6bafe7d3=\"\" class=\"pointer-events-none\"><p dir=\"auto\" class=\"body\"><span style=\"color: rgb(102, 102, 102); text-transform: none; letter-spacing: normal; font-family: Poppins, sans-serif; font-weight: 400;\">Cultivate divine blessings, positive energy, and spiritual harmony through traditional Havan and Yagna ceremonies. Our skilled pandits perform authentic Vedic fire rituals tailored for families, businesses, and special occasions throughout the UAE.</span></p></div> </div>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zbmu9p"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 5,
					"--grid-row": "10/11",
					"--grid-column": "8/19",
					"--m-grid-row": "11/12",
					"--m-grid-column": "1/15"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zbmu9p"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 8px;\">          About </h2><h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 8px;\">     Shanti Havan</h2>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zw5fkn"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 6,
					"--grid-row": "12/13",
					"--grid-column": "4/27",
					"--m-grid-row": "13/14",
					"--m-grid-column": "1/15"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zw5fkn"}
					content={"<p dir=\"auto\" class=\"body\">Havan and Yagna are sacred Vedic fire rituals performed by offering prayers and sacred materials into a consecrated fire while chanting powerful mantras. These ceremonies are conducted to seek divine blessings, spiritual purification and positive energy.</p><p dir=\"auto\" class=\"body-large\">Whether performed for housewarming, business success, family wellbeing, festivals or special occasions, Havan and Yagna hold deep spiritual significance in Hindu tradition.</p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zS7Rg0"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 7,
					"--grid-row": "13/14",
					"--grid-column": "4/24",
					"--m-grid-row": "15/16",
					"--m-grid-column": "2/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zS7Rg0"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; text-align: center; margin-bottom: 20px;\">Benefits Of Havan</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zHavanBenefits"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 5,
					"--grid-row": "16/20",
					"--grid-column": "4/25",
					"--m-grid-row": "17/18",
					"--m-grid-column": "1/15"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<BenefitsCard
					topLeft={"Spiritual Purification"}
					topRight={"Positive Energy"}
					bottomLeft={"Peace & Harmony"}
					bottomRight={"Divine Blessings"}
					imageSrc={activeBenefitsPhoto.src}
					imageAlt={activeBenefitsPhoto.alt || "Sacred Havan Ceremony"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zeQjbf"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 13,
					"--grid-row": "4/6",
					"--grid-column": "16/26",
					"--m-grid-row": "9/10",
					"--m-grid-column": "1/15"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridImage
					id={"zeQjbf"}
					src={activeHavanPhoto.src}
					alt={activeHavanPhoto.alt || "Shanti Havan and Yagna"}
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
			<LayoutElement
				elementId={"zYPWMm"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 14,
					"--grid-row": "8/9",
					"--grid-column": "11/17",
					"--m-grid-row": "7/8",
					"--m-grid-column": "4/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zYPWMm"}
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
					mobileWidthVw={"49.44444444444444vw"}
					mobileHeightVw={"13.88888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
