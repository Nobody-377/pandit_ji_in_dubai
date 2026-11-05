import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridCard from '@/components/builder/elements/GridCard';
import GridImage from '@/components/builder/elements/GridImage';

export default function Footer() {
	return (
		<BlockLayout
			blockId={"footer"}
			htmlId={"footer"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 4,
				"--width": "1224px",
				"--m-rows": "1",
				"--col-gap": "24px",
				"--row-gap": "16px",
				"--row-size": "48px",
				"--column-gap": "24px",
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "40px 16px 40px 16px",
				"--m-grid-template-rows": "6.67vw 3.06vw auto 4.17vw auto auto 6.67vw 6.11vw auto auto 0.28vw auto auto 6.67vw auto 34px",
				"--t-grid-template-rows": "minmax(24px, auto) minmax(11px, auto) minmax(52px, auto) minmax(15px, auto) minmax(1px, auto) minmax(12px, auto) minmax(20px, auto) minmax(22px, auto) minmax(11px, auto) minmax(10px, auto) minmax(1px, auto) minmax(23px, auto) minmax(31px, auto) minmax(24px, auto) minmax(21px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(0.74vw, auto) minmax(0.33vw, auto) minmax(6.05vw, auto) minmax(2.70vw, auto) minmax(1.72vw, auto) minmax(0.25vw, auto) minmax(0.25vw, auto) minmax(1.72vw, auto) minmax(2.70vw, auto) minmax(5.15vw, auto) minmax(0.74vw, auto) minmax(0.33vw, auto) minmax(5.47vw, auto) minmax(1.55vw, auto) minmax(1.72vw, auto) 0.00vw",
				"--grid-template-rows": "minmax(9px, auto) minmax(4px, auto) minmax(74px, auto) minmax(33px, auto) minmax(21px, auto) minmax(3px, auto) minmax(3px, auto) minmax(21px, auto) minmax(33px, auto) minmax(63px, auto) minmax(9px, auto) minmax(4px, auto) minmax(67px, auto) minmax(19px, auto) minmax(21px, auto) 1fr",
				"--m-grid-template-columns": "1.83% 15.24% 11.89% 39.02% 8.54% 17.99% 5.49%",
				"--grid-template-columns": "0.98% 0.16% 0.08% 7.19% 3.19% 7.92% 0.57% 5.80% 4.90% 40.85% 0.25% 0.98% 1.88% 20.51% 0.90% 0.25% 3.59%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "auto",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "384px"
			}}
			background={{
				color: "#2B1A14",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"WicTGk"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--z-index": 6,
					"--grid-row": "5/9",
					"--grid-column": "11/17",
					"--m-grid-row": "2/5",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"WicTGk"}
					text={"Book Pooja"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={999}
					borderWidth={1}
					backgroundColor={"#D97724"}
					fontColor={"#2B1A14"}
					borderColor={"#302e2c"}
					backgroundColorHover={"#2aa35d"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#302e2c"}
					fontSizeDesktop={23}
					mobileWidthVw={"91.11111111111111vw"}
					mobileHeightVw={"11.38888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"NuJYwb"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 1,
					"--grid-row": "15/16",
					"--grid-column": "7/14",
					"--m-grid-row": "15/16",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"NuJYwb"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(229, 179, 97);\">© 2025 Vedic Pandit Services. All rights reserved.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"8q8fYV"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "5/6",
					"--grid-column": "2/10",
					"--m-grid-row": "9/11",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"8q8fYV"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(247, 239, 229);\">EMAIL ID:-       <a href=\"mailto:Vishaldevmorari487@gmail.com\">Vishaldevmorari487@gmail.com</a></p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>

			<LayoutElement
				elementId={"zvvbSF"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 5,
					"--grid-row": "7/9",
					"--grid-column": "2/10",
					"--m-grid-row": "12/14",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zvvbSF"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(247, 239, 229); margin-bottom: 12px;\">ADDRESS:-   Meena Bazaar, BUR Dubai - AL Souq AL Kabeer, Dubai</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z26k0Y"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 7,
					"--grid-row": "4/5",
					"--grid-column": "2/10",
					"--m-grid-row": "8/10",
					"--m-grid-column": "1/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"z26k0Y"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(247, 239, 229); margin-bottom: 12px;\">PHONE NO:-   +971 50 419 2987</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
