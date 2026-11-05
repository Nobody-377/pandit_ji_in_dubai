import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import { useSectionPhotos } from '@/hooks/useSectionPhotos';

const defaultCarPhoto = [
	{
		src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-2VtWj9NpLbLZZmNI.png?width=768&fit=crop",
		alt: "Car and Vehicle Pooja Dubai",
		title: "Vehicle Pooja"
	}
];

export default function Section1() {
	const { photos } = useSectionPhotos('car-pooja-in-dubai-vehicle-pooja-in-dubai', 'carpooja_feature', defaultCarPhoto);
	const activePhoto = photos && photos.length > 0 ? photos[0] : null;
	return (
		<BlockLayout
			blockId={"zgdZup"}
			htmlId={"zgdZup"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "19.44vw auto 7.22vw auto 8.33vw auto 11.11vw auto 20.28vw auto 2.22vw auto 85px",
				"--t-grid-template-rows": "minmax(70px, auto) minmax(50px, auto) minmax(26px, auto) minmax(118px, auto) minmax(30px, auto) minmax(50px, auto) minmax(40px, auto) minmax(240px, auto) minmax(73px, auto) minmax(150px, auto) minmax(8px, auto) minmax(296px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(1.96vw, auto) minmax(4.58vw, auto) minmax(5.07vw, auto) minmax(2.45vw, auto) minmax(9.80vw, auto) minmax(4.25vw, auto) minmax(6.54vw, auto) minmax(4.08vw, auto) minmax(4.74vw, auto) minmax(14.71vw, auto) minmax(1.96vw, auto) minmax(13.64vw, auto) 9.97vw",
				"--grid-template-rows": "minmax(24px, auto) minmax(56px, auto) minmax(62px, auto) minmax(30px, auto) minmax(120px, auto) minmax(52px, auto) minmax(80px, auto) minmax(50px, auto) minmax(58px, auto) minmax(180px, auto) minmax(24px, auto) minmax(167px, auto) 1fr",
				"--m-grid-template-columns": "16.77% 60.67% 22.56%",
				"--grid-template-columns": "8.42% 0.98% 22.14% 9.56% 0.82% 8.09% 10.29% 23.86% 3.02% 5.39% 7.43%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1236px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "1025px"
			}}
			background={{
				color: "rgb(255, 255, 255)",
				current: "color"
			}}
		>
			<LayoutElement
				elementId={"zmqurg"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 1,
					"--grid-row": "3/4",
					"--grid-column": "2/5",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zmqurg"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(140, 43, 29); --lineHeightDesktop: 1.3; --fontSizeDesktop: 48px; margin-bottom: 0px;\">Car Pooja</h1>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z9r7zl"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 2,
					"--grid-row": "5/6",
					"--grid-column": "2/6",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"z9r7zl"}
					content={"<p dir=\"auto\" class=\"body\"><span style=\"color: rgb(121, 121, 121); text-transform: none; letter-spacing: normal; font-family: Lato, sans-serif; font-weight: 500;\">Car Pooja is a sacred Hindu ritual performed to seek divine blessings for a new vehicle. This auspicious ceremony is believed to bring safety, prosperity, protection, and positive energy while ensuring smooth and accident-free journeys.</span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zScnrS"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 3,
					"--grid-row": "10/11",
					"--grid-column": "2/11",
					"--m-grid-row": "10/11",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zScnrS"}
					content={"<h1 dir=\"auto\">Seek Divine Blessings for Your New Vehicle</h1>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zhmSZH"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 4,
					"--grid-row": "12/13",
					"--grid-column": "3/9",
					"--m-grid-row": "12/13",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zhmSZH"}
					content={"<p dir=\"auto\" class=\"body-large\">Car Pooja is one of the most popular Hindu ceremonies performed when purchasing a new vehicle. At Dubai Pandit, Pandit Vishal performs authentic Car Pooja services across Dubai and the UAE with complete devotion and traditional Vedic rituals.</p><p dir=\"auto\" class=\"body-large\">Whether you have purchased a new car, luxury vehicle, SUV, or commercial vehicle, this sacred ceremony is believed to provide protection, prosperity, and peace of mind for every journey..</p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			{activePhoto && (
				<LayoutElement
					elementId={"z8EI1L"}
					className={"layout-element layout-element--layout transition transition--slide"}
					style={{
						"--align": "center",
						"--justify": "center",
						"--m-element-margin": "0 0 16px 0",
						"--z-index": 5,
						"--grid-row": "2/7",
						"--grid-column": "7/10",
						"--m-grid-row": "8/9",
						"--m-grid-column": "1/4"
					}}
					hasRotationFrame={false}
					hasEntranceAnimation={true}
				>
					<GridImage
						id={"z8EI1L"}
						src={activePhoto.src}
						alt={activePhoto.alt || "Car and Vehicle Pooja Dubai"}
						objectFit={"cover"}
						desktopWidth={455}
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
				elementId={"zX8F9e"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 6,
					"--grid-row": "8/9",
					"--grid-column": "4/8",
					"--m-grid-row": "6/7",
					"--m-grid-column": "2/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zX8F9e"}
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
					mobileWidthVw={"55.27777777777778vw"}
					mobileHeightVw={"13.88888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
