import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import GridCard from '@/components/builder/elements/GridCard';
import BenefitsCard from '@/components/builder/elements/BenefitsCard';
import { useSectionPhotos } from '@/hooks/useSectionPhotos';

const defaultSatyaPhoto = [
	{
		src: "/images/satyanarayan_festivals.webp",
		alt: "Satyanarayan Katha Ceremony",
		title: "Satyanarayan Katha"
	}
];

export default function Section1() {
	const { photos } = useSectionPhotos('satyanarayan-and-festivals', 'satyanarayan_feature', defaultSatyaPhoto);
	const activePhoto = photos && photos.length > 0 ? photos[0] : null;
	return (
		<BlockLayout
			blockId={"zw31op"}
			htmlId={"zw31op"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "15.83vw auto 5.83vw auto 3.89vw auto 3.89vw auto 4.44vw auto 5.56vw 32.22vw auto 63.06vw 9.72vw auto 3.33vw auto 48px",
				"--t-grid-template-rows": "minmax(57px, auto) minmax(23px, auto) minmax(21px, auto) minmax(190px, auto) minmax(14px, auto) minmax(135px, auto) minmax(14px, auto) minmax(50px, auto) minmax(16px, auto) minmax(268px, auto) minmax(20px, auto) minmax(116px, auto) minmax(14px, auto) minmax(227px, auto) minmax(35px, auto) minmax(108px, auto) minmax(12px, auto) auto minmax(48px, auto)",
				"--small-desktop-grid-template-rows": "minmax(5.23vw, auto) minmax(1.31vw, auto) minmax(0.74vw, auto) minmax(1.23vw, auto) minmax(28.59vw, auto) minmax(4.08vw, auto) minmax(1.31vw, auto) minmax(4.08vw, auto) minmax(2.78vw, auto) minmax(13.07vw, auto) minmax(10.95vw, auto) minmax(1.80vw, auto) minmax(11.11vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(2.04vw, auto) minmax(5.80vw, auto) minmax(1.14vw, auto) minmax(4.08vw, auto) minmax(4.58vw, auto) minmax(3.50vw, auto) 0.00vw",
				"--grid-template-rows": "minmax(64px, auto) minmax(16px, auto) minmax(9px, auto) minmax(15px, auto) minmax(350px, auto) minmax(50px, auto) minmax(16px, auto) minmax(50px, auto) minmax(34px, auto) minmax(160px, auto) minmax(134px, auto) minmax(22px, auto) minmax(136px, auto) minmax(24px, auto) minmax(24px, auto) minmax(25px, auto) minmax(71px, auto) minmax(14px, auto) minmax(50px, auto) minmax(56px, auto) minmax(48px, auto) 0px",
				"--m-grid-template-columns": "3.66% 0.30% 13.41% 7.62% 4.27% 7.62% 35.06% 1.22% 1.22% 0.61% 23.48% 1.52%",
				"--grid-template-columns": "6.05% 2.37% 1.96% 0.82% 3.68% 5.80% 7.84% 3.27% 0.33% 3.43% 7.52% 0.57% 0.25% 5.39% 4.82% 0.08% 5.15% 4.41% 6.94% 5.47% 0.49% 11.85% 3.10% 0.16% 0.57% 7.68%",
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
				elementId={"zwAhlQ"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 2,
					"--grid-row": "5/7",
					"--grid-column": "4/12",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zwAhlQ"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 20px;\">Satyanarayan Pooja</h1><h1 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 20px;\"><span style=\"color: rgb(110, 44, 44);\">In Dubai &amp; UAE</span></h1>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zc7FNm"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 3,
					"--grid-row": "2/4",
					"--grid-column": "5/14",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zc7FNm"}
					content={"<p dir=\"auto\" class=\"body\"><span style=\"color: rgb(212, 164, 55); text-transform: none; letter-spacing: 2px; font-family: Poppins, sans-serif; font-weight: 700;\">LORD VISHNU WORSHIP</span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zepmG3"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 4,
					"--grid-row": "8/9",
					"--grid-column": "3/25",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zepmG3"}
					content={"<div data-v-6bafe7d3=\"\"><div data-v-6bafe7d3=\"\" class=\"pointer-events-none\"><p dir=\"auto\" class=\"body\"><span style=\"color: rgb(102, 102, 102); text-transform: none; letter-spacing: normal; font-family: Poppins, sans-serif; font-weight: 400;\">Seek the blessings of Lord Satyanarayan for peace, prosperity, happiness, and the well-being of your family. Our skilled pandits conduct traditional Satyanarayan Pooja throughout Dubai and the UAE in accordance with authentic Vedic traditions.</span></p></div></div>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			{activePhoto && (
				<LayoutElement
					elementId={"zwSaXr"}
					className={"layout-element layout-element--layout transition transition--slide"}
					style={{
						"--align": "center",
						"--justify": "center",
						"--m-element-margin": "0 0 16px 0",
						"--z-index": 5,
						"--grid-row": "3/6",
						"--grid-column": "15/23",
						"--m-grid-row": "10/11",
						"--m-grid-column": "1/13"
					}}
					hasRotationFrame={false}
					hasEntranceAnimation={true}
				>
					<GridImage
						id={"zwSaXr"}
						src={activePhoto.src}
						alt={activePhoto.alt || "Satyanarayan Katha Ceremony"}
						objectFit={"cover"}
						desktopWidth={480}
						desktopHeight={374}
						mobileWidth={328}
						desktopBorderRadius={0}
						mobileBorderRadius={0}
						rel={"nofollow"}
						className={"layout-element__component layout-element__component--GridImage"}
					/>
				</LayoutElement>
			)}
			<LayoutElement
				elementId={"zL6VWr"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 6,
					"--grid-row": "10/11",
					"--grid-column": "9/20",
					"--m-grid-row": "12/14",
					"--m-grid-column": "1/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zL6VWr"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; margin-bottom: 40px;\">          About Satyanarayan Pooja</h2>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zZ0Oa2"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 7,
					"--grid-row": "11/12",
					"--grid-column": "3/24",
					"--m-grid-row": "13/15",
					"--m-grid-column": "1/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zZ0Oa2"}
					content={"<p dir=\"auto\" class=\"body\">Satyanarayan Pooja is one of the most revered Hindu rituals dedicated to Lord Vishnu. The ceremony is performed to express gratitude, seek blessings and invite prosperity, peace and success into one's life.</p><p dir=\"auto\" class=\"body-large\">Families often perform Satyanarayan Pooja on special occasions such as housewarming ceremonies, birthdays, anniversaries, business milestones and other important life events.</p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zCrITn"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 8,
					"--grid-row": "13/14",
					"--grid-column": "4/24",
					"--m-grid-row": "16/17",
					"--m-grid-column": "1/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zCrITn"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(44, 24, 16); letter-spacing: normal; text-align: center; margin-bottom: 20px;\">Benefits Of Satyanarayan Pooja</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zMULuK"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 13,
					"--grid-row": "19/20",
					"--grid-column": "11/18",
					"--m-grid-row": "8/9",
					"--m-grid-column": "4/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zMULuK"}
					text={"Book Now"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					backgroundColor={"rgb(140, 43, 29)"}
					fontColor={"rgb(255, 255, 255)"}
					borderColor={"rgb(0, 0, 0)"}
					backgroundColorHover={"rgb(140, 43, 29)"}
					fontColorHover={"rgb(255, 255, 255)"}
					borderColorHover={"rgb(0, 0, 0)"}
					mobileWidthVw={"51.94444444444444vw"}
					mobileHeightVw={"13.88888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zSatyanarayanBenefits"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 5,
					"--grid-row": "14/18",
					"--grid-column": "2/26",
					"--m-grid-row": "18/19",
					"--m-grid-column": "1/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<BenefitsCard
					topLeft={"Divine Blessings"}
					topRight={"Peace & Harmony"}
					bottomLeft={"Prosperity"}
					bottomRight={"Spiritual Growth"}
					imageSrc={"/images/satyanarayan_festivals.webp"}
					imageAlt={"Satyanarayan Pooja Ceremony"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
