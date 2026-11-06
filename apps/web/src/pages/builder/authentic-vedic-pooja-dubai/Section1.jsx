import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"OwsYLX"}
			htmlId={"OwsYLX"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--width": "1224px",
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "62.22vw auto 18px",
				"--t-grid-template-rows": "minmax(224px, auto) minmax(169px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(19.61vw, auto) minmax(10.29vw, auto) 25.49vw",
				"--grid-template-rows": "minmax(240px, auto) minmax(126px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "100.00%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "411px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "678px"
			}}
			background={{
				path: "ljiz0f-qnkJBR446aep7XlF.png",
				image: "https://assets.zyrosite.com/HYPBjYBGYLwSMd3s/ljiz0f-qnkJBR446aep7XlF.png",
				origin: "assets",
				current: "image",
				imagePath: "bnt2nu-xpLRzIki59jEhEnz.png",
				isTransparent: true,
				"overlay-opacity": "0.30",
				src: "/images/namakaran_ceremony.webp",
				srcset: "/images/namakaran_ceremony.webp 375w, /images/namakaran_ceremony.webp 768w, /images/namakaran_ceremony.webp 1024w, /images/namakaran_ceremony.webp 1440w, /images/namakaran_ceremony.webp 1920w, /images/namakaran_ceremony.webp 2560w"
			}}
			backgroundImagePosition={28}
		>
			<LayoutElement
				elementId={"kHoW4V"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "center",
					"--z-index": 1,
					"--grid-row": "2/3",
					"--grid-column": "1/2",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"kHoW4V"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(250, 246, 240); --lineHeightDesktop: 1.3; --fontSizeDesktop: 60px; margin-bottom: 24px\">Sacred Vedic Traditions</h1><p dir=\"auto\" style=\"color: rgb(250, 246, 240)\" class=\"body\">Guiding souls through authentic Vedic rituals and sacred wedding ceremonies with devotion.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
