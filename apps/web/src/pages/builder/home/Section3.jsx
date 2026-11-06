import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridImage from '@/components/builder/elements/GridImage';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridButton from '@/components/builder/elements/GridButton';
import GridCard from '@/components/builder/elements/GridCard';
import { useSectionPhotos } from '@/hooks/useSectionPhotos';

const defaultAboutPhoto = [
	{
		src: "/images/pandit_ji_portrait.webp",
		alt: "About Pandit Ji Dubai",
		title: "About Pandit Ji"
	}
];

export default function Section3() {
	const { photos } = useSectionPhotos('home', 'home_about_feature', defaultAboutPhoto);
	const activePhoto = photos[0] || defaultAboutPhoto[0];
	return (
		<BlockLayout
			blockId={"OpOJDd"}
			htmlId={"OpOJDd"}
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
				"--m-grid-template-rows": "13.33vw 82.22vw 1.94vw auto 1.11vw auto 1.39vw 15.56vw auto 9.17vw auto 26px",
				"--t-grid-template-rows": "minmax(48px, auto) minmax(296px, auto) minmax(7px, auto) minmax(14px, auto) minmax(4px, auto) minmax(19px, auto) minmax(5px, auto) minmax(56px, auto) minmax(749px, auto) minmax(33px, auto) minmax(45px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(6.54vw, auto) minmax(41.18vw, auto) minmax(4.58vw, auto) minmax(0.08vw, auto) minmax(1.88vw, auto) minmax(1.72vw, auto) minmax(0.08vw, auto) minmax(1.47vw, auto) minmax(1.31vw, auto) 6.62vw",
				"--grid-template-rows": "minmax(80px, auto) minmax(504px, auto) minmax(56px, auto) minmax(1px, auto) minmax(23px, auto) minmax(21px, auto) minmax(1px, auto) minmax(18px, auto) minmax(16px, auto) 1fr",
				"--m-grid-template-columns": "6.40% 10.06% 18.60% 38.72% 4.57% 10.06% 11.59%",
				"--grid-template-columns": "23.69% 1.55% 4.33% 16.50% 1.88% 2.53% 7.43% 0.98% 3.35% 28.35% 9.40%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1302px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "801px"
			}}
			background={{
				color: "#FAF6F0",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"6DdynI"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 1,
					"--grid-row": "2/9",
					"--grid-column": "1/5",
					"--m-grid-row": "2/5",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridImage
					id={"6DdynI"}
					src={activePhoto.src}
					alt={activePhoto.alt || "Pandit Ji in Dubai"}
					objectFit={"cover"}
					desktopWidth={564}
					desktopHeight={624}
					mobileWidth={328}
					desktopBorderRadius={"12px"}
					mobileBorderRadius={"12px"}
					className={"layout-element__component layout-element__component--GridImage"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"NdxeR5"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--z-index": 2,
					"--grid-row": "2/3",
					"--grid-column": "7/12",
					"--m-grid-row": "9/10",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"NdxeR5"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(43, 26, 20); margin-bottom: 32px;\">Empowering Faith Through Vedic Wisdom</h2><p dir=\"auto\" class=\"body\" style=\"color: rgb(43, 26, 20);\"><span style=\"font-weight: 700;\"><strong>Shastri Shree Vishal Bhai</strong></span> is a highly esteemed spiritual guide and expert astrologer currently residing in the vibrant Meena Bazaar, Bur Dubai area of the UAE. Holding advanced academic credentials with both a <strong>B.A. and M.A. in Astrology</strong>, he brings profound foundational knowledge and deep spiritual wisdom to his practice.</p><p dir=\"auto\" class=\"body\">As a trusted astrologer in Dubai, Shastri Shree Vishal Bhai offers a comprehensive range of astrology services. He provides insightful guidance and spiritual solutions tailored to individual needs, ensuring a holistic approach to his clients' well-being. Whether you are seeking clarity on life's challenges, accurate horoscope readings, or spiritual enrichment, his extensive academic background and dedication make him a highly reliable figure in the field of astrology.</p><p dir=\"auto\" class=\"body\">With an established presence in both the UAE and India, he is easily accessible to clients seeking authentic astrological consultations and dedicated spiritual support.</p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"7UPKpB"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 3,
					"--grid-row": "5/8",
					"--grid-column": "9/11",
					"--m-grid-row": "11/12",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"7UPKpB"}
					text={"Read More"}
					type={"primary"}
					href={"/authentic-vedic-pooja-dubai"}
					target={"_self"}
					borderRadius={999}
					borderWidth={1}
					backgroundColor={"#8C2B1D"}
					fontColor={"#FAF6F0"}
					borderColor={"#302e2c"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#302e2c"}
					fontSizeMobile={20}
					mobileWidthVw={"91.11111111111111vw"}
					mobileHeightVw={"12.5vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z3VT1L"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 5,
					"--text": "center",
					"--align": "center",
					"--justify": "center",
					"--grid-row": "7/10",
					"--grid-column": "2/6",
					"--m-grid-row": "3/7",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<div className="shastri-badge" data-element-id="z3VT1L">
					<div className="shastri-badge__name">Shastri Shree Vishal Bhai</div>
					<div className="shastri-badge__degree">B.A. / M.A. In Astrology</div>
				</div>
			</LayoutElement>
		</BlockLayout>
	);
}
