import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridRunningText from '@/components/builder/elements/GridRunningText';

export default function Section2() {
	return (
		<BlockLayout
			blockId={"zNmdvq"}
			htmlId={"zNmdvq"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "auto 0px",
				"--t-grid-template-rows": "minmax(50px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(4.08vw, auto) minmax(7.03vw, auto) 2.21vw",
				"--grid-template-rows": "minmax(50px, auto) minmax(86px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "100.00%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "20px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "163px"
			}}
			background={{
				color: "rgb(250, 246, 240)",
				current: "color"
			}}
		>
			<LayoutElement
				elementId={"zj2kuJ"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 1,
					"--grid-row": "2/3",
					"--grid-column": "1/2",
					"--m-grid-row": "1/2",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridRunningText
					id={"zj2kuJ"}
					content={"ॐ Griha Pravesh ॐ • ॐ Wedding Ceremonies ॐ • ॐ Griha Shanti Havan ॐ Yagna ॐ • ॐ "}
					fontColor={"rgb(242, 115, 3)"}
					fontSize={32}
					mobileFontSize={15}
					fontFamily={"Quicksand"}
					fontWeight={300}
					backgroundColor={"rgba(0, 0, 0, 0)"}
					className={"layout-element__component layout-element__component--GridRunningText"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
