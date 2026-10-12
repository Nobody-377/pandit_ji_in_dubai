import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridGallery from '@/components/builder/elements/GridGallery';

export default function Section6() {
	return (
		<BlockLayout
			blockId={"vW1W8G"}
			htmlId={"vW1W8G"}
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
				"--m-grid-template-rows": "6.67vw auto 3.06vw auto 49.309295654296875px",
				"--t-grid-template-rows": "minmax(24px, auto) minmax(45px, auto) minmax(11px, auto) minmax(600px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(3.27vw, auto) minmax(4.90vw, auto) minmax(0.33vw, auto) minmax(25.49vw, auto) 6.62vw",
				"--grid-template-rows": "minmax(40px, auto) minmax(60px, auto) minmax(4px, auto) minmax(312px, auto) 1fr",
				"--m-grid-template-columns": "5.18% 89.63% 5.18%",
				"--grid-template-columns": "8.42% 15.44% 52.29% 15.44% 8.42%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "729.3092956542969px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "497px"
			}}
			background={{
				color: "#FAF6F0",
				current: "image",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"BoNIcb"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "center",
					"--z-index": 1,
					"--grid-row": "2/3",
					"--grid-column": "2/5",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"BoNIcb"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Media Gallery </h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zRpA_V"}
				className={"layout-element layout-element--layout transition transition--slide transition--root-hidden"}
				style={{
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 2,
					"--grid-row": "4/5",
					"--grid-column": "3/4",
					"--m-grid-row": "4/5",
					"--m-grid-column": "2/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridGallery
					id={"zRpA_V"}
					images={[
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=375&height=375&fit=crop",
							alt: ""
						},
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/20240229_154541.jpg-h2vMCasbNutJ9OkK.jpeg?width=375&height=375&fit=crop",
							alt: ""
						},
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0016.jpg-LbPgYucL565kxmOf.jpeg?width=375&height=375&fit=crop",
							alt: ""
						},
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=375&height=375&fit=crop",
							alt: ""
						},
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=375&height=375&fit=crop",
							alt: ""
						},
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0007.jpg-2QiVsBsmEfPNGWgH.jpeg?width=375&height=375&fit=crop",
							alt: ""
						},
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230927-wa0001.jpg-1b98zpUH2G4uyAGi.jpeg?width=375&height=375&fit=crop",
							alt: ""
						},
						{
							src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=375&height=375&fit=crop",
							alt: ""
						}
					]}
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
