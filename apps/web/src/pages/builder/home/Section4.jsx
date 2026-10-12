import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridCard from '@/components/builder/elements/GridCard';
import GridShape from '@/components/builder/elements/GridShape';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridEmbed from '@/components/builder/elements/GridEmbed';

export default function Section4() {
	return (
		<BlockLayout
			blockId={"zaMbyy"}
			htmlId={"zaMbyy"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 20,
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
				"--m-grid-template-rows": "22.22vw auto 7.78vw auto 12.50vw auto 3.89vw auto 6.67vw 2.22vw auto 5.28vw auto auto 6.39vw auto 8.06vw 4.44vw auto 2.22vw auto auto 3.33vw auto 8.06vw 3.06vw auto 2.22vw auto auto 4.17vw auto 8.06vw 2.22vw auto 5.56vw auto auto 7.50vw auto 9.44vw 3.06vw auto auto 1.11vw auto 2.22vw auto 8.89vw 4.44vw auto 2.50vw auto auto 4.44vw auto auto 10.28vw 4.44vw auto 2.22vw auto 5.56vw auto 4.44vw auto 2.22vw 13.33vw 4.44vw auto 2.22vw auto 3.33vw auto 0.83vw auto auto 11.94vw 15.28vw 1.67vw auto auto 19.44vw 38px",
				"--t-grid-template-rows": "minmax(80px, auto) minmax(125px, auto) minmax(28px, auto) minmax(104px, auto) minmax(45px, auto) minmax(21px, auto) minmax(14px, auto) minmax(23px, auto) minmax(24px, auto) minmax(8px, auto) minmax(72px, auto) minmax(19px, auto) minmax(80px, auto) minmax(84px, auto) minmax(23px, auto) minmax(48px, auto) minmax(29px, auto) minmax(16px, auto) minmax(72px, auto) minmax(8px, auto) minmax(80px, auto) minmax(84px, auto) minmax(12px, auto) minmax(48px, auto) minmax(29px, auto) minmax(11px, auto) minmax(72px, auto) minmax(8px, auto) minmax(80px, auto) minmax(84px, auto) minmax(15px, auto) minmax(48px, auto) minmax(29px, auto) minmax(8px, auto) minmax(72px, auto) minmax(20px, auto) minmax(40px, auto) minmax(84px, auto) minmax(27px, auto) minmax(48px, auto) minmax(34px, auto) minmax(11px, auto) minmax(72px, auto) minmax(80px, auto) minmax(4px, auto) minmax(84px, auto) minmax(8px, auto) minmax(48px, auto) minmax(32px, auto) minmax(16px, auto) minmax(72px, auto) minmax(9px, auto) minmax(80px, auto) minmax(68px, auto) minmax(16px, auto) minmax(48px, auto) minmax(3px, auto) minmax(37px, auto) minmax(16px, auto) minmax(72px, auto) minmax(8px, auto) minmax(40px, auto) minmax(20px, auto) minmax(84px, auto) minmax(16px, auto) minmax(48px, auto) minmax(8px, auto) minmax(48px, auto) minmax(16px, auto) minmax(72px, auto) minmax(8px, auto) minmax(40px, auto) minmax(12px, auto) minmax(105px, auto) minmax(3px, auto) minmax(48px, auto) minmax(8px, auto) minmax(43px, auto) minmax(55px, auto) minmax(6px, auto) minmax(68px, auto) minmax(6px, auto) minmax(70px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(4.58vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(4.25vw, auto) minmax(0.65vw, auto) minmax(9.15vw, auto) minmax(1.88vw, auto) minmax(1.72vw, auto) minmax(1.31vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(6.54vw, auto) minmax(2.78vw, auto) minmax(6.86vw, auto) minmax(3.19vw, auto) minmax(4.33vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(3.27vw, auto) minmax(3.27vw, auto) minmax(1.06vw, auto) minmax(1.72vw, auto) minmax(6.86vw, auto) minmax(1.72vw, auto) minmax(4.33vw, auto) minmax(1.96vw, auto) minmax(4.41vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.65vw, auto) minmax(3.27vw, auto) minmax(2.37vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(6.05vw, auto) minmax(4.33vw, auto) minmax(1.63vw, auto) minmax(3.51vw, auto) minmax(3.27vw, auto) minmax(0.49vw, auto) minmax(8.82vw, auto) minmax(0.41vw, auto) minmax(3.35vw, auto) 7.19vw",
				"--grid-template-rows": "minmax(56px, auto) minmax(24px, auto) minmax(24px, auto) minmax(52px, auto) minmax(8px, auto) minmax(112px, auto) minmax(23px, auto) minmax(21px, auto) minmax(16px, auto) minmax(24px, auto) minmax(72px, auto) minmax(12px, auto) minmax(80px, auto) minmax(34px, auto) minmax(84px, auto) minmax(39px, auto) minmax(53px, auto) minmax(24px, auto) minmax(24px, auto) minmax(24px, auto) minmax(72px, auto) minmax(12px, auto) minmax(40px, auto) minmax(40px, auto) minmax(13px, auto) minmax(21px, auto) minmax(84px, auto) minmax(21px, auto) minmax(53px, auto) minmax(24px, auto) minmax(54px, auto) minmax(24px, auto) minmax(72px, auto) minmax(8px, auto) minmax(40px, auto) minmax(29px, auto) minmax(72px, auto) minmax(12px, auto) minmax(74px, auto) minmax(53px, auto) minmax(20px, auto) minmax(43px, auto) minmax(40px, auto) minmax(6px, auto) minmax(108px, auto) minmax(5px, auto) minmax(41px, auto) 1fr",
				"--m-grid-template-columns": "4.88% 4.88% 11.89% 42.68% 22.87% 3.05% 4.57% 0.30% 4.88%",
				"--grid-template-columns": "6.54% 0.82% 1.06% 0.08% 0.82% 15.93% 4.82% 2.53% 0.08% 0.82% 1.14% 0.82% 0.16% 1.96% 0.65% 0.57% 0.57% 0.82% 1.88% 14.46% 2.94% 2.29% 1.80% 0.16% 0.65% 0.33% 1.63% 0.33% 1.55% 4.82% 17.81% 1.96% 7.19%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "3502px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "1975px"
			}}
			background={{
				color: "#faf6f0",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"UqXz0b"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 4,
					"--grid-row": "10/19",
					"--grid-column": "2/12",
					"--m-grid-row": "10/17",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"UqXz0b"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"440px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"3KhO8h"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 5,
					"--grid-row": "10/19",
					"--grid-column": "14/25",
					"--m-grid-row": "18/25",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"3KhO8h"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"440px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"jDDWoU"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 6,
					"--grid-row": "10/19",
					"--grid-column": "27/33",
					"--m-grid-row": "26/33",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"jDDWoU"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"440px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"YUpJbp"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 7,
					"--grid-row": "20/31",
					"--grid-column": "2/12",
					"--m-grid-row": "34/41",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"YUpJbp"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"440px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"uWpqQS"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 8,
					"--grid-row": "20/31",
					"--grid-column": "14/25",
					"--m-grid-row": "42/49",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"uWpqQS"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"440px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"1WOuyh"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 9,
					"--grid-row": "20/31",
					"--grid-column": "27/33",
					"--m-grid-row": "50/58",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"1WOuyh"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"440px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"hUleEi"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 10,
					"--grid-row": "11/12",
					"--grid-column": "5/10",
					"--m-grid-row": "11/12",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"hUleEi"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path><polyline points=\"9 22 9 12 15 12 15 22\"></polyline></g></svg>"}
					color={"rgb(156, 21, 0)"}
					shape={"icon-home"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"GK2-h0"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 11,
					"--grid-row": "11/12",
					"--grid-column": "15/23",
					"--m-grid-row": "19/20",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"GK2-h0"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path></g></svg>"}
					color={"rgb(138, 18, 0)"}
					shape={"icon-heart"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"hehCE8"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 12,
					"--grid-row": "11/12",
					"--grid-column": "29/32",
					"--m-grid-row": "27/28",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"hehCE8"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"5\"></circle><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line></g></svg>"}
					color={"rgb(135, 18, 0)"}
					shape={"icon-sun"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"eea7qN"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 13,
					"--grid-row": "17/18",
					"--grid-column": "15/23",
					"--m-grid-row": "24/25",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"eea7qN"}
					text={"Learn More"}
					type={"primary"}
					href={"/wedding-ceremonies"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(143, 19, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"a807L7"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 14,
					"--grid-row": "17/18",
					"--grid-column": "29/32",
					"--m-grid-row": "32/33",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"a807L7"}
					text={"Learn More"}
					type={"primary"}
					href={"/shanti-havan-and-yagna"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(140, 19, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"JyBxFn"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 15,
					"--grid-row": "21/22",
					"--grid-column": "5/10",
					"--m-grid-row": "35/36",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"JyBxFn"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></g></svg>"}
					color={"#702217"}
					shape={"icon-star"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"7KeyZI"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 16,
					"--grid-row": "21/22",
					"--grid-column": "15/23",
					"--m-grid-row": "43/44",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"7KeyZI"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></g></svg>"}
					color={"rgb(140, 43, 29)"}
					shape={"icon-shield"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ky-QJm"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 17,
					"--grid-row": "21/22",
					"--grid-column": "29/32",
					"--m-grid-row": "51/52",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"ky-QJm"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon></g></svg>"}
					color={"rgb(140, 43, 29)"}
					shape={"icon-compass"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"yfsXRS"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 18,
					"--grid-row": "29/30",
					"--grid-column": "5/10",
					"--m-grid-row": "40/41",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"yfsXRS"}
					text={"Learn More"}
					type={"primary"}
					href={"/satyanarayan-and-festivals"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(135, 18, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"0SaPrN"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 19,
					"--grid-row": "29/30",
					"--grid-column": "15/23",
					"--m-grid-row": "48/49",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"0SaPrN"}
					text={"Learn More"}
					type={"primary"}
					href={"/rudrabhishek-and-planets"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(138, 18, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"2Abx-Q"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 20,
					"--grid-row": "29/30",
					"--grid-column": "29/32",
					"--m-grid-row": "56/57",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"2Abx-Q"}
					text={"Learn More"}
					type={"primary"}
					href={"/pooja-services-in-dubai"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(133, 18, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ds-sKV"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 21,
					"--grid-row": "4/6",
					"--grid-column": "2/33",
					"--m-grid-row": "6/7",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"ds-sKV"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(130, 27, 11); --lineHeightMobile: 1.3; --fontSizeMobile: 16px;\">── ॐ ──</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"h3LWez"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 22,
					"--grid-row": "5/7",
					"--grid-column": "2/33",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"h3LWez"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(140, 43, 29); --lineHeightMobile: 1.3; --fontSizeMobile: 32px;\">Every rituals performed the way the shastras describe it</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"9AMq-C"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 23,
					"--grid-row": "8/9",
					"--grid-column": "2/33",
					"--m-grid-row": "4/5",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"9AMq-C"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"--lineHeightMobile: 1.3; --fontSizeMobile: 16px;\">Authentic rituals performed strictly according to the Shastras, bringing peace, prosperity, and divine blessings to your home, family, and new ventures in Dubai.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"1I1gxc"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 24,
					"--grid-row": "13/14",
					"--grid-column": "5/10",
					"--m-grid-row": "13/14",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"1I1gxc"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Griha Pravesh &amp; Vastu</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"AgkQKj"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 25,
					"--grid-row": "13/14",
					"--grid-column": "15/23",
					"--m-grid-row": "21/22",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"AgkQKj"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Wedding Ceremonies</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"xSVlzI"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 26,
					"--grid-row": "13/14",
					"--grid-column": "29/32",
					"--m-grid-row": "29/30",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"xSVlzI"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Shanti Havan &amp; Yagna</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"9-mS_8"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 27,
					"--grid-row": "15/16",
					"--grid-column": "5/10",
					"--m-grid-row": "14/15",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"9-mS_8"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 119, 36);\">Establish harmony in your new home with traditional Griha Pravesh, Vastu Pooja, and Griha Shanti rituals to purify your living space and invite positive energy.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"H9QxAa"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 28,
					"--grid-row": "15/16",
					"--grid-column": "15/23",
					"--m-grid-row": "22/23",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"H9QxAa"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 119, 36);\">Sacred Vedic marriage rituals and Vivah Sanskar performed with deep devotion, uniting two souls under the holy blessings of the deities, fire, and elders.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"CAOTRj"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 29,
					"--grid-row": "15/16",
					"--grid-column": "29/32",
					"--m-grid-row": "30/31",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"CAOTRj"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 119, 36);\">Powerful sacred fire rituals including Griha Shanti Havan and customized Vedic Yagnas to cleanse your surroundings, remove obstacles, and invoke divine protection.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"eGgKSG"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 30,
					"--grid-row": "23/24",
					"--grid-column": "5/10",
					"--m-grid-row": "37/38",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"eGgKSG"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Satyanarayan </h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"KrMtEK"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 31,
					"--grid-row": "23/25",
					"--grid-column": "15/23",
					"--m-grid-row": "44/45",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"KrMtEK"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Rudrabhishek &amp; Planets</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"3MUiLm"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 32,
					"--grid-row": "23/25",
					"--grid-column": "29/32",
					"--m-grid-row": "53/54",
					"--m-grid-column": "2/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"3MUiLm"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Janma kundali dose pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"4x4ERu"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 33,
					"--grid-row": "27/28",
					"--grid-column": "5/10",
					"--m-grid-row": "38/39",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"4x4ERu"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 119, 36);\">Celebrate auspicious occasions with traditional Satyanarayan Pooja, Ganesh Pooja, Lakshmi Pooja, and Saraswati Pooja to invite wealth, wisdom, and success.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"pkp3pb"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 34,
					"--grid-row": "27/28",
					"--grid-column": "15/23",
					"--m-grid-row": "46/47",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"pkp3pb"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 119, 36);\">Perform powerful Rudrabhishek Pooja for Lord Shiva and Navagraha Pooja to pacify planetary influences, ensure good health, and bring spiritual harmony.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"lXVmx7"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 35,
					"--grid-row": "37/39",
					"--grid-column": "5/12",
					"--m-grid-row": "64/65",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"lXVmx7"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 119, 36);\">Bless your new vehicle with a traditional Car Pooja, invoking Lord Ganesha's protection and divine safety for all your future journeys and travels.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zYBMZp"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 36,
					"--grid-row": "17/18",
					"--grid-column": "4/9",
					"--m-grid-row": "16/17",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zYBMZp"}
					text={"Learn More"}
					type={"primary"}
					href={"/griha-pravesh-and-vastu"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(143, 19, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z3Te_E"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 37,
					"--grid-row": "2/3",
					"--grid-column": "20/21",
					"--m-grid-row": "8/9",
					"--m-grid-column": "4/6"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"z3Te_E"}
					content={"<p dir=\"auto\" class=\"body\" style=\"color: rgb(217, 119, 36); --lineHeightMobile: 1.3; --fontSizeMobile: 18px;\"><span style=\"font-weight: 700;\"><strong>O U R   S E R V I C E S</strong></span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z7OfC1"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 39,
					"--grid-row": "45/46",
					"--grid-column": "13/26",
					"--m-grid-row": "81/82",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"z7OfC1"}
					text={"Explore all pooja services"}
					type={"primary"}
					href={"/pooja-services-in-dubai"}
					target={"_self"}
					fontFamily={"Marcellus"}
					fontWeight={400}
					borderRadius={999}
					borderWidth={1}
					backgroundColor={"rgb(128, 17, 0)"}
					fontColor={"rgb(255, 255, 255)"}
					borderColor={"rgb(128, 17, 0)"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"rgb(255, 255, 255)"}
					borderColorHover={"rgb(217, 119, 36)"}
					fontSizeDesktop={19}
					fontSizeMobile={16}
					mobileWidthVw={"88vw"}
					mobileHeightVw={"13.5vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zFfb6h"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 40,
					"--grid-row": "40/41",
					"--grid-column": "5/10",
					"--m-grid-row": "66/67",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zFfb6h"}
					text={"Learn More"}
					type={"primary"}
					href={"/car-pooja-in-dubai-vehicle-pooja-in-dubai"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(133, 18, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zQbMKp"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 41,
					"--grid-row": "35/36",
					"--grid-column": "5/12",
					"--m-grid-row": "62/63",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zQbMKp"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Car &amp; Vehicle Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zUkzTt"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 42,
					"--grid-row": "37/39",
					"--grid-column": "18/27",
					"--m-grid-row": "74/75",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zUkzTt"}
					content={"<p dir=\"auto\" class=\"body\" style=\"color: rgb(217, 119, 36);\">Sacred offerings of water and rice balls performed to bring peace and satisfaction to ancestors.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zxBaMb"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 43,
					"--grid-row": "33/34",
					"--grid-column": "18/24",
					"--m-grid-row": "70/71",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"zxBaMb"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon></g></svg>"}
					color={"rgb(140, 43, 29)"}
					shape={"icon-compass"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zkcodc"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 3,
					"--grid-row": "43/48",
					"--grid-column": "7/31",
					"--m-grid-row": "79/84",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridEmbed
					id={"zkcodc"}
					content={"<!-- Top Decorative Ornamental Divider -->\n<div class=\"vedic-divider\">\n  <span class=\"gold-line\"></span>\n  <span class=\"sacred-symbol\">ॐ</span>\n  <span class=\"gold-line\"></span>\n</div>\n\n<!-- Decorative Section with Low-Opacity Mandala Watermark -->\n<div class=\"mandala-section\">\n  <div class=\"mandala-watermark\" aria-hidden=\"true\">\n    <svg viewBox=\"0 0 500 500\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <g stroke=\"#C5A059\" stroke-width=\"1.2\">\n        <circle cx=\"250\" cy=\"250\" r=\"235\" stroke-dasharray=\"3 3\"/>\n        <circle cx=\"250\" cy=\"250\" r=\"190\"/>\n        <circle cx=\"250\" cy=\"250\" r=\"140\"/>\n        <circle cx=\"250\" cy=\"250\" r=\"90\"/>\n        <circle cx=\"250\" cy=\"250\" r=\"40\"/>\n        <!-- Radial Petals -->\n        <path d=\"M250 10 L250 490 M10 250 L490 250 M80 80 L420 420 M80 420 L420 80\"/>\n        <path d=\"M250 60 Q280 120 250 180 Q220 120 250 60 Z\"/>\n        <path d=\"M250 320 Q280 380 250 440 Q220 380 250 320 Z\"/>\n        <path d=\"M60 250 Q120 280 180 250 Q120 220 60 250 Z\"/>\n        <path d=\"M320 250 Q380 280 440 250 Q380 220 320 250 Z\"/>\n        <path d=\"M115 115 Q175 145 190 200 Q145 190 115 115 Z\"/>\n        <path d=\"M385 115 Q325 145 310 200 Q355 190 385 115 Z\"/>\n        <path d=\"M115 385 Q175 355 190 300 Q145 310 115 385 Z\"/>\n        <path d=\"M385 385 Q325 355 310 300 Q355 310 385 385 Z\"/>\n      </g>\n    </svg>\n  </div>\n</div>\n\n<!-- Bottom Decorative Ornamental Divider -->\n<div class=\"vedic-divider\">\n  <span class=\"gold-line\"></span>\n  <span class=\"sacred-symbol\">ॐ</span>\n  <span class=\"gold-line\"></span>\n</div>\n\n<style>\n  /* --- Ornamental Divider Styling --- */\n  .vedic-divider {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 16px;\n    max-width: 800px;\n    margin: 15px auto;\n    padding: 0 15px;\n  }\n\n  .gold-line {\n    flex: 1;\n    height: 1px;\n    background: linear-gradient(to right, transparent, #c5a059 50%, transparent);\n  }\n\n  .sacred-symbol {\n    font-family: \"Georgia\", \"Times New Roman\", serif;\n    font-size: 1.5rem;\n    color: #9a6b1f;\n    line-height: 1;\n    text-shadow: 0 1px 2px rgba(197, 160, 89, 0.3);\n  }\n\n  /* --- Mandala Watermark Container --- */\n  .mandala-section {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 140px;\n    margin: 0 auto;\n    overflow: hidden;\n    max-width: 1000px;\n  }\n\n  .mandala-watermark {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 260px;\n    height: 260px;\n    opacity: 0.12;\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .mandala-watermark svg {\n    width: 100%;\n    height: 100%;\n  }\n\n  @media (max-width: 600px) {\n    .mandala-section {\n      min-height: 100px;\n    }\n\n    .mandala-watermark {\n      width: 200px;\n      height: 200px;\n      opacity: 0.10;\n    }\n\n    .sacred-symbol {\n      font-size: 1.25rem;\n    }\n  }\n</style>"}
					className={"layout-element__component layout-element__component--GridEmbed"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zahOx5"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 2,
					"--grid-row": "32/42",
					"--grid-column": "16/28",
					"--m-grid-row": "69/78",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"zahOx5"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"455px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z8NZnq"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 1,
					"--grid-row": "32/42",
					"--grid-column": "3/13",
					"--m-grid-row": "59/68",
					"--m-grid-column": "1/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"z8NZnq"}
					background={"rgb(247, 239, 229)"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
					opacity={"1"}
					height={"100%"}
					minHeight={"455px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zasvaR"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 44,
					"--grid-row": "35/36",
					"--grid-column": "18/27",
					"--m-grid-row": "72/73",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zasvaR"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(140, 43, 29);\">Pitru Tarpan </h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zdEcQE"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 45,
					"--grid-row": "26/28",
					"--grid-column": "29/32",
					"--m-grid-row": "54/55",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zdEcQE"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 119, 36);\">A sacred Vedic ritual performed to reduce the negative effects of planetary doshas in one’s birth chart and promote peace, prosperity, harmony, and positive energy in life.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zhZodr"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 46,
					"--grid-row": "40/41",
					"--grid-column": "18/25",
					"--m-grid-row": "76/77",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zhZodr"}
					text={"Learn More"}
					type={"primary"}
					href={"/pitru-paksha-pooja-dubai"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"rgb(133, 18, 0)"}
					fontColor={"#ffffff"}
					borderColor={"#2b1a14"}
					backgroundColorHover={"rgb(217, 119, 36)"}
					fontColorHover={"#ffffff"}
					borderColorHover={"rgb(217, 119, 36)"}
					mobileWidthVw={"82.22222222222223vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zCLGHF"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 47,
					"--grid-row": "33/34",
					"--grid-column": "5/10",
					"--m-grid-row": "60/61",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"zCLGHF"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#d8c2bb\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon></g></svg>"}
					color={"rgb(140, 43, 29)"}
					shape={"icon-compass"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
