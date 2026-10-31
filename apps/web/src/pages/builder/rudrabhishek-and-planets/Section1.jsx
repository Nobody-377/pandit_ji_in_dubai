import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridButton from '@/components/builder/elements/GridButton';
import GridImage from '@/components/builder/elements/GridImage';
import GridCard from '@/components/builder/elements/GridCard';
import BenefitsCard from '@/components/builder/elements/BenefitsCard';
import { useSectionPhotos } from '@/hooks/useSectionPhotos';

const defaultRudraPhoto = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=768&fit=crop",
		alt: "Rudrabhishek Pooja Dubai",
		title: "Rudrabhishek Ceremony"
	}
];

export default function Section1() {
	const { photos } = useSectionPhotos('rudrabhishek-and-planets', 'rudrabhishek_feature', defaultRudraPhoto);
	const activePhoto = photos && photos.length > 0 ? photos[0] : null;
	return (
		<BlockLayout
			blockId={"zwqMSZ"}
			htmlId={"zwqMSZ"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "6.67vw auto 4.72vw auto 2.78vw auto 5.00vw auto 3.89vw auto 8.33vw 31.67vw auto 80.28vw 8.61vw 33.33vw 3.89vw auto 1.39vw auto 48px",
				"--t-grid-template-rows": "minmax(24px, auto) minmax(23px, auto) minmax(17px, auto) minmax(190px, auto) minmax(10px, auto) minmax(158px, auto) minmax(18px, auto) minmax(50px, auto) minmax(14px, auto) minmax(256px, auto) minmax(30px, auto) minmax(114px, auto) minmax(16px, auto) minmax(289px, auto) minmax(31px, auto) minmax(120px, auto) minmax(16px, auto) minmax(45px, auto) minmax(5px, auto) auto minmax(48px, auto)",
				"--small-desktop-grid-template-rows": "minmax(6.54vw, auto) minmax(1.96vw, auto) minmax(0.08vw, auto) minmax(2.04vw, auto) minmax(24.02vw, auto) minmax(1.31vw, auto) minmax(1.55vw, auto) minmax(6.13vw, auto) minmax(4.08vw, auto) minmax(3.27vw, auto) minmax(11.03vw, auto) minmax(2.04vw, auto) minmax(10.46vw, auto) minmax(2.61vw, auto) minmax(8.17vw, auto) minmax(3.76vw, auto) minmax(0.08vw, auto) minmax(1.80vw, auto) minmax(0.08vw, auto) minmax(0.08vw, auto) minmax(3.50vw, auto) 0vw",
				"--grid-template-rows": "minmax(80px, auto) minmax(24px, auto) minmax(1px, auto) minmax(25px, auto) minmax(294px, auto) minmax(16px, auto) minmax(19px, auto) minmax(75px, auto) minmax(50px, auto) minmax(40px, auto) minmax(135px, auto) minmax(25px, auto) minmax(128px, auto) minmax(32px, auto) minmax(100px, auto) minmax(46px, auto) minmax(1px, auto) minmax(22px, auto) minmax(1px, auto) minmax(1px, auto) minmax(48px, auto) 0px",
				"--m-grid-template-columns": "3.05% 0.30% 13.11% 17.38% 1.52% 36.59% 0.30% 0.61% 23.17% 0.91% 3.05%",
				"--grid-template-columns": "8.42% 1.55% 6.86% 7.43% 4.82% 3.43% 6.78% 1.80% 9.56% 1.47% 3.43% 5.07% 1.14% 7.92% 1.31% 7.03% 10.54% 2.29% 0.74% 3.19% 5.23%",
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
				elementId={"zL_4Xl"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 1,
					"--grid-row": "2/4",
					"--grid-column": "2/9",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zL_4Xl"}
					content={"<p dir=\"auto\" class=\"body\"><span style=\"color: rgb(212, 164, 55); text-transform: none; letter-spacing: 2px; font-family: Poppins, sans-serif; font-weight: 700;\">LORD SHIVA WORSHIP</span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zbkLYd"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 2,
					"--grid-row": "5/7",
					"--grid-column": "2/10",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zbkLYd"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 20px;\">Rudrabhishek Pooja</h1><h1 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 20px;\"><span style=\"color: rgb(110, 44, 44);\">In Dubai &amp; UAE</span></h1>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zw1OTw"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 3,
					"--grid-row": "8/9",
					"--grid-column": "2/20",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zw1OTw"}
					content={"<p dir=\"auto\" class=\"body\"><span style=\"color: rgb(102, 102, 102); text-transform: none; letter-spacing: normal; font-family: Poppins, sans-serif; font-weight: 400;\">Seek the blessings of Lord Shiva through the sacred Rudrabhishek Pooja. This powerful Vedic ritual involves the ceremonial abhishek of the Shiva Lingam with sacred offerings while chanting Vedic mantras for peace, protection, prosperity and spiritual growth</span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zcdW87"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 4,
					"--grid-row": "9/10",
					"--grid-column": "8/13",
					"--m-grid-row": "8/9",
					"--m-grid-column": "4/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zcdW87"}
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
					mobileWidthVw={"50.833333333333336vw"}
					mobileHeightVw={"13.88888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			{activePhoto && (
				<LayoutElement
					elementId={"zjhi0g"}
					className={"layout-element layout-element--layout transition transition--slide"}
					style={{
						"--align": "center",
						"--justify": "center",
						"--m-element-margin": "0 0 16px 0",
						"--z-index": 5,
						"--grid-row": "3/6",
						"--grid-column": "12/21",
						"--m-grid-row": "10/11",
						"--m-grid-column": "1/12"
					}}
					hasRotationFrame={false}
					hasEntranceAnimation={true}
				>
					<GridImage
						id={"zjhi0g"}
						src={activePhoto.src}
						alt={activePhoto.alt || "Rudrabhishek Pooja Dubai"}
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
				elementId={"zlFEHu"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 6,
					"--grid-row": "11/13",
					"--grid-column": "7/16",
					"--m-grid-row": "12/14",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zlFEHu"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 40px;\">          About Rudrabhishek Pooja</h2>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zZPHgP"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 7,
					"--grid-row": "12/14",
					"--grid-column": "2/20",
					"--m-grid-row": "13/15",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zZPHgP"}
					content={"<p dir=\"auto\" class=\"body\">Rudrabhishek Pooja is one of the most revered rituals dedicated to Lord Shiva. The ceremony includes the sacred bathing of the Shiva Lingam with offerings such as water, milk, honey and other auspicious substances accompanied by the chanting of powerful Vedic mantras.</p><p dir=\"auto\" class=\"body\" style=\"color: rgb(71, 65, 58); letter-spacing: normal; margin-bottom: 25px;\"><span style=\"font-weight: 700;\"><strong>Devotees perform Rudrabhishek to seek divine blessings, remove obstacles, attain peace of mind and invite spiritual positivity into their lives. It is especially popular during auspicious occasions and important life events.</strong></span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zRp6gF"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 8,
					"--grid-row": "15/16",
					"--grid-column": "4/18",
					"--m-grid-row": "16/18",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zRp6gF"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; text-align: center; margin-bottom: 20px;\">Benefits Of Rudrabhishek Pooja</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zRudrabhishekBenefits"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 5,
					"--grid-row": "16/22",
					"--grid-column": "2/20",
					"--m-grid-row": "20/21",
					"--m-grid-column": "1/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<BenefitsCard
					topLeft={"Lord Shiva's Blessings"}
					topRight={"Spiritual Growth"}
					bottomLeft={"Protection & Wellbeing"}
					bottomRight={"Peace & Positivity"}
					imageSrc={"https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=375&fit=crop"}
					imageAlt={"Rudrabhishek Shiva Lingam Pooja"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
