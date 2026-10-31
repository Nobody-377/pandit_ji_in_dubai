import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridCard from '@/components/builder/elements/GridCard';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridImage from '@/components/builder/elements/GridImage';
import { useSectionPhotos } from '@/hooks/useSectionPhotos';

const defaultPortrait = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=768&fit=crop",
		alt: "Shastri Shree Vishal Bhai",
		title: "Shastri Shree Vishal Bhai"
	}
];

export default function Section2() {
	const { photos } = useSectionPhotos('authentic-vedic-pooja-dubai', 'authentic_feature', defaultPortrait);
	const activePhoto = photos && photos.length > 0 ? photos[0] : defaultPortrait[0];

	return (
		<BlockLayout
			blockId={"6qc9U6"}
			htmlId={"6qc9U6"}
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
				"--m-grid-template-rows": "13.89vw auto 8.33vw 2.78vw auto auto 4.44vw auto 37px",
				"--t-grid-template-rows": "minmax(50px, auto) minmax(614px, auto) minmax(30px, auto) minmax(10px, auto) minmax(112px, auto) minmax(24px, auto) minmax(16px, auto) minmax(320px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(6.54vw, auto) minmax(3.27vw, auto) minmax(28.10vw, auto) minmax(1.31vw, auto) minmax(1.96vw, auto) minmax(7.11vw, auto) minmax(0.74vw, auto) minmax(1.96vw, auto) 3.35vw",
				"--grid-template-rows": "minmax(80px, auto) minmax(40px, auto) minmax(344px, auto) minmax(16px, auto) minmax(24px, auto) minmax(87px, auto) minmax(9px, auto) minmax(24px, auto) 1fr",
				"--m-grid-template-columns": "3.05% 96.95%",
				"--grid-template-columns": "2.70% 39.22% 8.58% 1.47% 43.79% 4.25%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1213px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "665px"
			}}
			background={{
				color: "#FAF6F0",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"joLP6S"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--z-index": 1,
					"--grid-row": "5/9",
					"--grid-column": "4/7",
					"--m-grid-row": "4/7",
					"--m-grid-column": "1/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"joLP6S"}
					background={"rgb(207, 200, 193)"}
					border={"1px solid #00000000"}
					borderRadius={"12px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"144px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"GW5GiA"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--z-index": 2,
					"--grid-row": "2/4",
					"--grid-column": "4/7",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"GW5GiA"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(43, 26, 20); margin-bottom: 32px;\"></h2><p dir=\"auto\" class=\"body\" style=\"color: rgb(43, 26, 20); margin-bottom: 32px;\"><span style=\"font-weight: 700;\"><strong>Shastri Shree Vishal Bhai</strong></span> is a highly esteemed spiritual guide and expert astrologer currently residing in the vibrant Meena Bazaar, Bur Dubai area of the UAE. Holding advanced academic credentials with both a <strong>B.A. and M.A. in Astrology</strong>, he brings profound foundational knowledge and deep spiritual wisdom to his practice.</p><p dir=\"auto\" class=\"body\">As a trusted astrologer in Dubai, Shastri Shree Vishal Bhai offers a comprehensive range of astrology services. He provides insightful guidance and spiritual solutions tailored to individual needs, ensuring a holistic approach to his clients' well-being. Whether you are seeking clarity on life's challenges, accurate horoscope readings, or spiritual enrichment, his extensive academic background and dedication make him a highly reliable figure in the field of astrology.</p><p dir=\"auto\" class=\"body\">With an established presence in both the UAE and India, he is easily accessible to clients seeking authentic astrological consultations and dedicated spiritual support.</p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"1WKlt_"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--z-index": 3,
					"--grid-row": "6/7",
					"--grid-column": "5/6",
					"--m-grid-row": "5/6",
					"--m-grid-column": "2/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"1WKlt_"}
					content={"<h5 dir=\"auto\" style=\"color: rgb(43, 26, 20); margin-bottom: 16px;\"><span style=\"color: rgb(43, 26, 20);\"><em>\"Every ritual is a divine connection. We perform pujas with pure devotion.\"</em></span></h5><p dir=\"auto\" class=\"body-small\" style=\"color: rgb(43, 26, 20);\">— <span style=\"font-weight: 400;\"><em>Shastri Shree Vishal Bhai</em></span><span style=\"font-weight: 400;\"><em> </em></span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zcz3IV"}
				className={"layout-element layout-element--layout transition transition--slide transition--root-hidden"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 4,
					"--grid-row": "3/8",
					"--grid-column": "2/3",
					"--m-grid-row": "8/9",
					"--m-grid-column": "1/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridImage
					id={"zcz3IV"}
					src={activePhoto.src}
					alt={activePhoto.alt || "Shastri Shree Vishal Bhai"}
					objectFit={"cover"}
					desktopWidth={480}
					desktopHeight={480}
					mobileWidth={328}
					desktopBorderRadius={0}
					mobileBorderRadius={0}
					rel={"nofollow"}
					className={"layout-element__component layout-element__component--GridImage"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
