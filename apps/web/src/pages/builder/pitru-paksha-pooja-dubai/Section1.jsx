import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"kKHUoE"}
			htmlId={"hero"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 17,
				"--width": "1224px",
				"--m-rows": "1",
				"--col-gap": "24px",
				"--row-gap": "16px",
				"--row-size": "48px",
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "6.67vw auto 3.89vw auto 4.17vw auto 8.00vw auto 24px",
				"--t-grid-template-rows": "minmax(24px, auto) minmax(22px, auto) minmax(14px, auto) minmax(300px, auto) minmax(15px, auto) minmax(210px, auto) minmax(28px, auto) minmax(48px, auto) 24px",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(1.80vw, auto) minmax(2.94vw, auto) minmax(51.47vw, auto) minmax(7.19vw, auto) minmax(4.33vw, auto) minmax(3.59vw, auto) minmax(6.94vw, auto) minmax(5.15vw, auto) 13.40vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(22px, auto) minmax(36px, auto) minmax(630px, auto) minmax(88px, auto) minmax(53px, auto) minmax(44px, auto) minmax(85px, auto) minmax(63px, auto) 1fr",
				"--m-grid-template-columns": "7.32% 42.68% 1.83% 40.85% 7.32%",
				"--grid-template-columns": "6.21% 0.33% 26.14% 15.36% 1.96% 50.00%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "auto",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "auto"
			}}
			background={{
				color: "#faf6f0",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"v4au3m"}
				className={"layout-element layout-element--layout transition transition--blur transition--root-hidden"}
				style={{
					"--z-index": 1,
					"--grid-row": "2/8",
					"--grid-column": "6/7",
					"--m-grid-row": "6/7",
					"--m-grid-column": "4/6",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridImage
					id={"v4au3m"}
					src={"https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/vczdfl-K9nbyFiOC3NqnzYB.png?width=768&fit=crop"}
					srcset={"https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/vczdfl-K9nbyFiOC3NqnzYB.png?width=375&fit=crop 375w, https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/vczdfl-K9nbyFiOC3NqnzYB.png?width=768&fit=crop 768w, https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/vczdfl-K9nbyFiOC3NqnzYB.png?width=1440&fit=crop 1440w"}
					alt={"Warm atmospheric photo of a brass pooja lamp lit with fresh yellow marigold flowers and sacred copper vessel arranged for a traditional Vedic ceremony on a clean woven mat"}
					objectFit={"cover"}
					desktopWidth={612}
					desktopHeight={873}
					mobileWidth={158}
					desktopBorderRadius={"8px"}
					mobileBorderRadius={"8px"}
					className={"layout-element__component layout-element__component--GridImage"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"I7WyiG"}
				className={"layout-element layout-element--layout transition transition--fade hover--lift"}
				style={{
					"--z-index": 2,
					"--grid-row": "6/7",
					"--grid-column": "2/4",
					"--m-grid-row": "8/9",
					"--m-grid-column": "2/5",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"I7WyiG"}
					text={"Consult Pandit Ji on WhatsApp"}
					type={"primary"}
					href={"https://wa.me/971504192987?text=Pranam%20Pandit%20Ji%20%F0%9F%99%8F%20%20I%20would%20like%20to%20inquire%20about%20booking%20Pitru%20Paksha%20/%20Shraddh%20Karma%20/%20Pitru%20Dosh%20Pooja%20in%20Dubai/UAE."}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"77.77777777777777vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"-sGO62"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "2/3",
					"--grid-column": "3/5",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/6",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"-sGO62"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Vedic Rites in UAE</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"H6TIt2"}
				className={"layout-element layout-element--layout transition transition--rise"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "4/5",
					"--grid-column": "3/5",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/6",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"H6TIt2"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Authentic Pitru Paksha, Shraddh Karma &amp; Pitru Dosh Pooja Services in Dubai &amp; UAE</h1>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"IFp1j4"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 5,
					"--grid-row": "9/10",
					"--grid-column": "3/5",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/3",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"IFp1j4"}
					content={"<p dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Honor your departed ancestors, seek spiritual liberation, and alleviate Pitru Dosha through traditional Vedic rituals performed with devotion across the 16 Tithis of Pitru Paksha.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
