import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridCard from '@/components/builder/elements/GridCard';
import GridShape from '@/components/builder/elements/GridShape';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"z59h_5"}
			htmlId={"z59h_5"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 38,
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
				"--m-grid-template-rows": "3.89vw auto 4.17vw auto 4.44vw 2.22vw auto 3.89vw auto 1.11vw auto 2.50vw auto auto 4.17vw 4.17vw 17.78vw auto 20.00vw 1.94vw auto 3.06vw auto auto 4.17vw 6.67vw auto auto auto 3.06vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 3.06vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 3.06vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 8.89vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 8.89vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 3.06vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 8.89vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 3.06vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 3.06vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 3.06vw auto auto 4.17vw 6.67vw auto 4.17vw auto 4.17vw auto 5.83vw auto auto 60px",
				"--t-grid-template-rows": "minmax(14px, auto) minmax(100px, auto) minmax(15px, auto) minmax(105px, auto) minmax(16px, auto) minmax(8px, auto) minmax(72px, auto) minmax(14px, auto) minmax(80px, auto) minmax(4px, auto) minmax(84px, auto) minmax(9px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(15px, auto) minmax(64px, auto) minmax(8px, auto) minmax(72px, auto) minmax(7px, auto) minmax(84px, auto) minmax(11px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(80px, auto) minmax(84px, auto) minmax(11px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(84px, auto) minmax(11px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(84px, auto) minmax(11px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(63px, auto) minmax(32px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(63px, auto) minmax(32px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(84px, auto) minmax(11px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(63px, auto) minmax(32px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(84px, auto) minmax(11px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(84px, auto) minmax(11px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(84px, auto) minmax(21px, auto) minmax(53px, auto) minmax(24px, auto) minmax(15px, auto) minmax(24px, auto) minmax(72px, auto) minmax(15px, auto) minmax(40px, auto) minmax(15px, auto) minmax(84px, auto) minmax(21px, auto) minmax(53px, auto) minmax(24px, auto) 60px",
				"--small-desktop-grid-template-rows": "minmax(6.54vw, auto) minmax(7.35vw, auto) minmax(2.70vw, auto) minmax(3.43vw, auto) minmax(10.54vw, auto) minmax(0.33vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(3.27vw, auto) minmax(3.27vw, auto) minmax(2.78vw, auto) minmax(5.15vw, auto) minmax(1.72vw, auto) minmax(1.72vw, auto) minmax(4.33vw, auto) minmax(1.63vw, auto) minmax(0.33vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(3.27vw, auto) minmax(6.05vw, auto) minmax(5.15vw, auto) minmax(2.45vw, auto) minmax(1.06vw, auto) minmax(3.27vw, auto) minmax(1.06vw, auto) minmax(1.88vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(3.27vw, auto) minmax(2.70vw, auto) minmax(5.15vw, auto) minmax(3.43vw, auto) minmax(4.33vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(3.27vw, auto) minmax(6.05vw, auto) minmax(5.15vw, auto) minmax(1.72vw, auto) minmax(1.72vw, auto) minmax(4.33vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(1.96vw, auto) minmax(5.88vw, auto) minmax(0.98vw, auto) minmax(3.27vw, auto) minmax(2.70vw, auto) minmax(1.72vw, auto) minmax(3.76vw, auto) minmax(4.33vw, auto) minmax(2.12vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(80px, auto) minmax(90px, auto) minmax(33px, auto) minmax(42px, auto) minmax(129px, auto) minmax(4px, auto) minmax(24px, auto) minmax(72px, auto) minmax(12px, auto) minmax(40px, auto) minmax(40px, auto) minmax(34px, auto) minmax(63px, auto) minmax(21px, auto) minmax(21px, auto) minmax(53px, auto) minmax(20px, auto) minmax(4px, auto) minmax(24px, auto) minmax(24px, auto) minmax(72px, auto) minmax(12px, auto) minmax(40px, auto) minmax(74px, auto) minmax(63px, auto) minmax(30px, auto) minmax(13px, auto) minmax(40px, auto) minmax(13px, auto) minmax(23px, auto) minmax(24px, auto) minmax(24px, auto) minmax(72px, auto) minmax(12px, auto) minmax(40px, auto) minmax(33px, auto) minmax(63px, auto) minmax(42px, auto) minmax(53px, auto) minmax(24px, auto) minmax(24px, auto) minmax(24px, auto) minmax(72px, auto) minmax(12px, auto) minmax(40px, auto) minmax(74px, auto) minmax(63px, auto) minmax(21px, auto) minmax(21px, auto) minmax(53px, auto) minmax(24px, auto) minmax(24px, auto) minmax(24px, auto) minmax(72px, auto) minmax(12px, auto) minmax(40px, auto) minmax(33px, auto) minmax(21px, auto) minmax(46px, auto) minmax(53px, auto) minmax(26px, auto) 60px",
				"--m-grid-template-columns": "3.35% 0.30% 1.22% 2.44% 0.30% 20.73% 43.60% 16.77% 0.30% 3.66% 0.30% 2.13% 4.88%",
				"--grid-template-columns": "6.54% 1.88% 0.08% 6.21% 11.68% 6.29% 1.96% 0.98% 1.96% 6.21% 11.68% 6.29% 1.96% 0.98% 1.96% 6.21% 11.68% 6.29% 1.96% 1.88% 5.31%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "auto",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "auto"
			}}
			background={{
				color: "#e9e4de",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"2tbfqX"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 1,
					"--grid-row": "7/19",
					"--grid-column": "2/8",
					"--m-grid-row": "6/15",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"2tbfqX"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"6AGEwK"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 2,
					"--grid-row": "7/19",
					"--grid-column": "9/14",
					"--m-grid-row": "16/25",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"6AGEwK"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"t6hlyp"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 3,
					"--grid-row": "6/18",
					"--grid-column": "15/20",
					"--m-grid-row": "26/33",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"t6hlyp"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"vbLuSm"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 4,
					"--grid-row": "20/31",
					"--grid-column": "2/8",
					"--m-grid-row": "34/43",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"vbLuSm"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"CTo3gJ"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 5,
					"--grid-row": "20/31",
					"--grid-column": "9/14",
					"--m-grid-row": "44/53",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"CTo3gJ"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"pGqzA5"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 6,
					"--grid-row": "20/31",
					"--grid-column": "15/20",
					"--m-grid-row": "54/63",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"pGqzA5"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"TWhiY1"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 7,
					"--grid-row": "32/41",
					"--grid-column": "2/8",
					"--m-grid-row": "64/73",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"TWhiY1"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"wkpMdO"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 8,
					"--grid-row": "32/41",
					"--grid-column": "9/14",
					"--m-grid-row": "74/83",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"wkpMdO"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"B6HiD2"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 9,
					"--grid-row": "32/41",
					"--grid-column": "15/20",
					"--m-grid-row": "84/93",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"B6HiD2"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"F5-KYX"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 10,
					"--grid-row": "42/52",
					"--grid-column": "2/8",
					"--m-grid-row": "94/103",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"F5-KYX"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"NogONu"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 11,
					"--grid-row": "42/52",
					"--grid-column": "9/14",
					"--m-grid-row": "104/113",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"NogONu"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"sIAfkk"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 12,
					"--grid-row": "42/52",
					"--grid-column": "15/20",
					"--m-grid-row": "114/123",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"sIAfkk"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ynmSgH"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 13,
					"--grid-row": "53/62",
					"--grid-column": "2/20",
					"--m-grid-row": "124/133",
					"--m-grid-column": "1/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridCard
					id={"ynmSgH"}
					background={"#faf6f0"}
					border={"1px solid #c89a91"}
					borderRadius={"16px"}
					boxShadow={"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"}
					opacity={"1"}
					height={"100%"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"kHhJwp"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 14,
					"--grid-row": "8/9",
					"--grid-column": "4/7",
					"--m-grid-row": "7/8",
					"--m-grid-column": "3/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"kHhJwp"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path><polyline points=\"9 22 9 12 15 12 15 22\"></polyline></g></svg>"}
					color={"#702217"}
					shape={"icon-home"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"O4GolS"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 15,
					"--grid-row": "8/9",
					"--grid-column": "10/13",
					"--m-grid-row": "17/18",
					"--m-grid-column": "3/10"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"O4GolS"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path></g></svg>"}
					color={"#702217"}
					shape={"icon-heart"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"cJeaQE"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 16,
					"--grid-row": "8/9",
					"--grid-column": "16/19",
					"--m-grid-row": "27/28",
					"--m-grid-column": "2/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"cJeaQE"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"5\"></circle><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line></g></svg>"}
					color={"#702217"}
					shape={"icon-sun"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"db3Rvq"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 17,
					"--grid-row": "16/17",
					"--grid-column": "5/6",
					"--m-grid-row": "13/14",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"db3Rvq"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"2C2VFW"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 18,
					"--grid-row": "16/17",
					"--grid-column": "11/12",
					"--m-grid-row": "23/24",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"2C2VFW"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"WLgiyl"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 19,
					"--grid-row": "16/17",
					"--grid-column": "17/18",
					"--m-grid-row": "31/32",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"WLgiyl"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"HFO_J5"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 20,
					"--grid-row": "21/22",
					"--grid-column": "4/7",
					"--m-grid-row": "35/36",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"HFO_J5"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"></path><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"></path></g></svg>"}
					color={"#702217"}
					shape={"icon-book-open"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"TTXiio"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 21,
					"--grid-row": "21/22",
					"--grid-column": "10/13",
					"--m-grid-row": "45/46",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"TTXiio"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line></g></svg>"}
					color={"#702217"}
					shape={"icon-calendar"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"CrQNpw"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 22,
					"--grid-row": "21/22",
					"--grid-column": "16/19",
					"--m-grid-row": "55/56",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"CrQNpw"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"></path></g></svg>"}
					color={"#702217"}
					shape={"icon-droplet"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"IqVmCP"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 23,
					"--grid-row": "28/30",
					"--grid-column": "5/6",
					"--m-grid-row": "41/42",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"IqVmCP"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"cpErAe"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 24,
					"--grid-row": "27/29",
					"--grid-column": "11/12",
					"--m-grid-row": "51/52",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"cpErAe"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"DaghXh"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 25,
					"--grid-row": "27/29",
					"--grid-column": "17/18",
					"--m-grid-row": "61/62",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"DaghXh"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"lU3guH"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 26,
					"--grid-row": "33/34",
					"--grid-column": "4/7",
					"--m-grid-row": "65/66",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"lU3guH"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></g></svg>"}
					color={"#702217"}
					shape={"icon-star"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"L68moq"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 27,
					"--grid-row": "33/34",
					"--grid-column": "10/13",
					"--m-grid-row": "75/76",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"L68moq"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 12 20 22 4 22 4 12\"></polyline><rect x=\"2\" y=\"7\" width=\"20\" height=\"5\"></rect><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"7\"></line><path d=\"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z\"></path><path d=\"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z\"></path></g></svg>"}
					color={"#702217"}
					shape={"icon-gift"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"pkpwwr"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 28,
					"--grid-row": "33/34",
					"--grid-column": "16/19",
					"--m-grid-row": "85/86",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"pkpwwr"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon></g></svg>"}
					color={"#702217"}
					shape={"icon-compass"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"LX2G8K"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 29,
					"--grid-row": "39/40",
					"--grid-column": "5/6",
					"--m-grid-row": "71/72",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"LX2G8K"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ORaFqX"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 30,
					"--grid-row": "39/40",
					"--grid-column": "11/12",
					"--m-grid-row": "81/82",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"ORaFqX"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ZtUQ6U"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 31,
					"--grid-row": "39/40",
					"--grid-column": "17/18",
					"--m-grid-row": "91/92",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"ZtUQ6U"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"AJS-5V"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 32,
					"--grid-row": "43/44",
					"--grid-column": "4/7",
					"--m-grid-row": "95/96",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"AJS-5V"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></g></svg>"}
					color={"#702217"}
					shape={"icon-shield"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ipFI_j"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 33,
					"--grid-row": "43/44",
					"--grid-column": "10/13",
					"--m-grid-row": "105/106",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"ipFI_j"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon><polyline points=\"2 17 12 22 22 17\"></polyline><polyline points=\"2 12 12 17 22 12\"></polyline></g></svg>"}
					color={"#702217"}
					shape={"icon-layers"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"3s7o_V"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 34,
					"--grid-row": "43/44",
					"--grid-column": "16/19",
					"--m-grid-row": "115/116",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"3s7o_V"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z\"></path><line x1=\"16\" y1=\"8\" x2=\"2\" y2=\"22\"></line><line x1=\"17.5\" y1=\"15\" x2=\"9\" y2=\"15\"></line></g></svg>"}
					color={"#702217"}
					shape={"icon-feather"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"xqRdB8"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 35,
					"--grid-row": "50/51",
					"--grid-column": "5/6",
					"--m-grid-row": "101/102",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"xqRdB8"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"w9A6Kl"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 36,
					"--grid-row": "50/51",
					"--grid-column": "11/12",
					"--m-grid-row": "111/112",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"w9A6Kl"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"WUSUxu"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 37,
					"--grid-row": "50/51",
					"--grid-column": "17/18",
					"--m-grid-row": "121/122",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"WUSUxu"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"1Mim-J"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 38,
					"--grid-row": "54/55",
					"--grid-column": "4/19",
					"--m-grid-row": "125/126",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridShape
					id={"1Mim-J"}
					svg={"<svg viewBox=\"0 0 48 48\" preserveAspectRatio=\"xMinYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><rect width=\"48\" height=\"48\" rx=\"12\" fill=\"#e6d1ca\"></rect><g transform=\"translate(12 12)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"1\" y=\"3\" width=\"15\" height=\"13\"></rect><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"></polygon><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"></circle><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"></circle></g></svg>"}
					color={"#702217"}
					shape={"icon-truck"}
					height={72}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"j8-PLh"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 39,
					"--grid-row": "60/61",
					"--grid-column": "11/12",
					"--m-grid-row": "131/132",
					"--m-grid-column": "7/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"j8-PLh"}
					text={"Learn More"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={6}
					borderWidth={0}
					backgroundColor={"#8c2b1d"}
					fontColor={"#ffffff"}
					borderColor={"#8c2b1d"}
					backgroundColorHover={"#a3554a"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#a3554a"}
					mobileWidthVw={"39.72222222222222vw"}
					mobileHeightVw={"14.722222222222221vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"4lBI_E"}
				className={"layout-element layout-element--layout transition transition--slide-right"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 40,
					"--grid-row": "2/3",
					"--grid-column": "2/20",
					"--m-grid-row": "2/3",
					"--m-grid-column": "4/13",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"4lBI_E"}
					content={"<h1 dir=\"auto\">Explore Our Pooja Services</h1>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"8E2GYV"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 41,
					"--grid-row": "4/5",
					"--grid-column": "3/21",
					"--m-grid-row": "4/5",
					"--m-grid-column": "4/13"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"8E2GYV"}
					content={"<p dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Authentic Vedic ceremonies performed by Shastri Shree Vishal Bhai with full devotion, custom mantra chanting, and traditional rituals tailored to your family's spiritual needs.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"dUGYQN"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 42,
					"--grid-row": "10/11",
					"--grid-column": "4/7",
					"--m-grid-row": "9/10",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"dUGYQN"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Griha Pravesh Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"QvxCpi"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 43,
					"--grid-row": "10/12",
					"--grid-column": "10/13",
					"--m-grid-row": "19/20",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"QvxCpi"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Wedding Ceremonies</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"fZY4WX"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 44,
					"--grid-row": "10/12",
					"--grid-column": "16/19",
					"--m-grid-row": "28/29",
					"--m-grid-column": "6/12"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"fZY4WX"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Griha Shanti Havan &amp; Yagna</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"niHVnm"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 45,
					"--grid-row": "13/15",
					"--grid-column": "4/7",
					"--m-grid-row": "11/12",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"niHVnm"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Auspicious housewarming ritual performed to purify your new home, invoke divine blessings, and eliminate negative energies before moving in.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"sIM9px"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 46,
					"--grid-row": "13/14",
					"--grid-column": "10/13",
					"--m-grid-row": "21/22",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"sIM9px"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Sacred Vedic marriage rites performed with authentic rituals, traditional saptapadi, and custom mantra chanting for lifelong harmony.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"m4Xt47"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 47,
					"--grid-row": "13/14",
					"--grid-column": "16/19",
					"--m-grid-row": "29/30",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"m4Xt47"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Sacred fire ritual designed to harmonize household atmosphere, purify subtle energies, and invoke lasting peace for your family.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"oAPLe0"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 48,
					"--grid-row": "23/24",
					"--grid-column": "4/7",
					"--m-grid-row": "37/38",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"oAPLe0"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Satyanarayan Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"cWXNsT"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 49,
					"--grid-row": "23/24",
					"--grid-column": "10/13",
					"--m-grid-row": "47/48",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"cWXNsT"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Festival Poojas</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"eAFt1e"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 50,
					"--grid-row": "23/24",
					"--grid-column": "16/19",
					"--m-grid-row": "57/58",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"eAFt1e"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Rudrabhishek Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"176x0j"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 51,
					"--grid-row": "25/26",
					"--grid-column": "4/7",
					"--m-grid-row": "39/40",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"176x0j"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Traditional devotional prayer dedicated to Lord Vishnu, performed for overall well-being, gratitude, and fulfillment of intentions.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"bfLqZg"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 52,
					"--grid-row": "25/26",
					"--grid-column": "10/13",
					"--m-grid-row": "49/50",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"bfLqZg"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Special festival rituals conducted for Diwali, Navratri, Janmashtami, and major observances according to auspicious muhurat timings.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"YXtP9A"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 53,
					"--grid-row": "25/26",
					"--grid-column": "16/19",
					"--m-grid-row": "59/60",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"YXtP9A"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Revered Shiva worship featuring sacred abhishekam offerings and powerful Rudram chanting for health, clarity, and protection.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"lF7rC1"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 54,
					"--grid-row": "35/36",
					"--grid-column": "4/7",
					"--m-grid-row": "67/68",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"lF7rC1"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Ganesh Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"EgJ-pC"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 55,
					"--grid-row": "35/36",
					"--grid-column": "10/13",
					"--m-grid-row": "77/78",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"EgJ-pC"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Lakshmi Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"_Cm7_F"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 56,
					"--grid-row": "35/36",
					"--grid-column": "16/19",
					"--m-grid-row": "87/88",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"_Cm7_F"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Navagraha Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"5QvXbI"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 57,
					"--grid-row": "37/38",
					"--grid-column": "4/7",
					"--m-grid-row": "69/70",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"5QvXbI"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Invocation of Lord Ganesha to remove all obstacles, grant wisdom, and ensure success before beginning new ventures or events.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"AhiuNa"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 58,
					"--grid-row": "37/38",
					"--grid-column": "10/13",
					"--m-grid-row": "79/80",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"AhiuNa"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Devotional worship of Goddess Lakshmi performed to attract abundance, financial prosperity, and growth for home or business.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"N8-c56"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 59,
					"--grid-row": "37/38",
					"--grid-column": "16/19",
					"--m-grid-row": "89/90",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"N8-c56"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Vedic planetary pacification ritual designed to mitigate horoscopic afflictions and restore balance across nine celestial forces.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"Iv6IYM"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 60,
					"--grid-row": "45/46",
					"--grid-column": "4/7",
					"--m-grid-row": "97/98",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"Iv6IYM"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Griha Shanti Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"B-6hvP"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 61,
					"--grid-row": "45/46",
					"--grid-column": "10/13",
					"--m-grid-row": "107/108",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"B-6hvP"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Vastu Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"njFTiA"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 62,
					"--grid-row": "45/46",
					"--grid-column": "16/19",
					"--m-grid-row": "117/118",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"njFTiA"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Saraswati Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"MtbAhG"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 63,
					"--grid-row": "47/48",
					"--grid-column": "4/7",
					"--m-grid-row": "99/100",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"MtbAhG"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Comprehensive protective worship focused on resolving domestic discord and cultivating calm, balanced living environments.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"Vl8ScM"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 64,
					"--grid-row": "47/48",
					"--grid-column": "10/13",
					"--m-grid-row": "109/110",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"Vl8ScM"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Specialized spatial alignment ceremony to correct directional flaws and enhance positive energy flow in residential or office spaces.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"azpGWl"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 65,
					"--grid-row": "47/49",
					"--grid-column": "16/19",
					"--m-grid-row": "119/120",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"azpGWl"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Devotional offering to the Goddess of wisdom and arts, ideal for students, educators, creative professionals, and performers.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"yghsj1"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 66,
					"--grid-row": "56/57",
					"--grid-column": "4/19",
					"--m-grid-row": "127/128",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"yghsj1"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Car Pooja</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"25Ts4D"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 67,
					"--grid-row": "58/59",
					"--grid-column": "4/19",
					"--m-grid-row": "129/130",
					"--m-grid-column": "5/11"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"25Ts4D"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Vedic vehicle consecration ritual performed for new or pre-owned automobiles to ensure safe travels, divine protection, and auspicious journeys.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
