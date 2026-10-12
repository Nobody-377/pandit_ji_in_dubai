import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridButton from '@/components/builder/elements/GridButton';

export default function Section4() {
	return (
		<BlockLayout
			blockId={"5gq6c4"}
			htmlId={"5gq6c4"}
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
				"--m-grid-template-rows": "22.22vw auto 18.89vw auto 4.44vw auto 87px",
				"--t-grid-template-rows": "minmax(80px, auto) minmax(212px, auto) minmax(68px, auto) minmax(44px, auto) minmax(16px, auto) minmax(44px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(3.59vw, auto) minmax(11.44vw, auto) minmax(4.58vw, auto) minmax(4.08vw, auto) 5.31vw",
				"--grid-template-rows": "minmax(44px, auto) minmax(140px, auto) minmax(56px, auto) minmax(50px, auto) 1fr",
				"--m-grid-template-columns": "17.07% 0.91% 64.94% 17.07%",
				"--grid-template-columns": "8.42% 21.81% 19.77% 2.61% 16.34% 22.63% 8.42%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "551px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "355px"
			}}
			background={{
				color: "#F7EFE5",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"JovZCy"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "center",
					"--z-index": 1,
					"--grid-row": "2/3",
					"--grid-column": "2/7",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/5"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"JovZCy"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(43, 26, 20); margin-bottom: 32px;\"><span style=\"color: rgb(43, 26, 20);\">Book Your Sacred Puja Today</span></h2><p class=\"body\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\"><span style=\"color: rgb(43, 26, 20);\">Invite divine blessings into your home. Experience authentic Vedic ceremonies tailored to your</span><br style=\"color: rgb(43, 26, 20);\"><span style=\"color: rgb(43, 26, 20);\">how chiropractic care can transform your</span></p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ZCsfob"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--z-index": 2,
					"--grid-row": "4/5",
					"--grid-column": "3/4",
					"--m-grid-row": "4/5",
					"--m-grid-column": "2/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"ZCsfob"}
					text={"Book Ceremony"}
					type={"primary"}
					href={"https://wa.me/971504192987?text=I%20want%20to%20first%20know%20discuss%20about%20my%20requirements"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={999}
					borderWidth={1}
					backgroundColor={"#8C2B1D"}
					fontColor={"#FAF6F0"}
					borderColor={"#302e2c"}
					backgroundColorHover={"#e3b21e"}
					fontColorHover={"#302e2c"}
					borderColorHover={"#302e2c"}
					mobileWidthVw={"60vw"}
					mobileHeightVw={"12.222222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"0DsHie"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--z-index": 3,
					"--grid-row": "4/5",
					"--grid-column": "5/6",
					"--m-grid-row": "6/7",
					"--m-grid-column": "3/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"0DsHie"}
					text={"Contact Pandit"}
					type={"primary"}
					href={"tel:+971504192987"}
					target={"_self"}
					borderRadius={999}
					borderWidth={1}
					backgroundColor={"#2B1A14"}
					fontColor={"#FAF6F0"}
					borderColor={"#302e2c"}
					backgroundColorHover={"#2aa35d"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#302e2c"}
					mobileWidthVw={"59.166666666666664vw"}
					mobileHeightVw={"12.222222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
