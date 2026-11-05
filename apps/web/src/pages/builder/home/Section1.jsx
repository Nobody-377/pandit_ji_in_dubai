import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';
import GridButton from '@/components/builder/elements/GridButton';
import GridCard from '@/components/builder/elements/GridCard';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"fg6uc8"}
			htmlId={"fg6uc8"}
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
				"--m-grid-template-rows": "6.67vw auto auto 3.89vw auto 4.72vw auto 14.44vw auto 1.11vw auto 40.00vw 4.44vw auto auto 3.89vw 3.61vw 6.11vw auto 1.39vw auto 3.89vw 0px",
				"--t-grid-template-rows": "minmax(24px, auto) minmax(18px, auto) minmax(68px, auto) minmax(14px, auto) minmax(125px, auto) minmax(17px, auto) minmax(122px, auto) minmax(52px, auto) minmax(50px, auto) minmax(4px, auto) minmax(50px, auto) minmax(144px, auto) minmax(16px, auto) minmax(21px, auto) minmax(36px, auto) minmax(23px, auto) minmax(13px, auto) minmax(22px, auto) minmax(21px, auto) minmax(5px, auto) minmax(36px, auto) minmax(12px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(5.23vw, auto) minmax(3.27vw, auto) minmax(1.31vw, auto) minmax(6.54vw, auto) minmax(3.27vw, auto) minmax(14.71vw, auto) minmax(0.33vw, auto) minmax(2.12vw, auto) minmax(2.45vw, auto) minmax(0.08vw, auto) minmax(0.25vw, auto) minmax(1.23vw, auto) minmax(0.33vw, auto) minmax(0.41vw, auto) minmax(0.74vw, auto) minmax(0.25vw, auto) minmax(0.08vw, auto) minmax(0.25vw, auto) minmax(0.16vw, auto) minmax(1.14vw, auto) minmax(0.08vw, auto) minmax(0.25vw, auto) minmax(5.47vw, auto) minmax(6.78vw, auto) minmax(0.82vw, auto) minmax(7.84vw, auto) 18.79vw",
				"--grid-template-rows": "minmax(64px, auto) minmax(40px, auto) minmax(16px, auto) minmax(80px, auto) minmax(40px, auto) minmax(180px, auto) minmax(4px, auto) minmax(26px, auto) minmax(30px, auto) minmax(1px, auto) minmax(3px, auto) minmax(15px, auto) minmax(4px, auto) minmax(5px, auto) minmax(9px, auto) minmax(3px, auto) minmax(1px, auto) minmax(3px, auto) minmax(2px, auto) minmax(14px, auto) minmax(1px, auto) minmax(3px, auto) minmax(67px, auto) minmax(83px, auto) minmax(10px, auto) minmax(96px, auto) 1fr",
				"--m-grid-template-columns": "2.44% 13.72% 11.28% 0.30% 2.13% 12.50% 0.91% 0.61% 0.30% 10.98% 0.30% 2.13% 12.20% 2.74% 1.52% 20.43% 3.05% 2.44%",
				"--grid-template-columns": "0.74% 0.90% 2.53% 0.16% 0.33% 4.00% 8.17% 7.92% 0.49% 7.43% 0.98% 2.70% 3.59% 0.33% 0.98% 7.60% 4.25% 6.62% 0.65% 5.96% 0.98% 4.66% 2.78% 0.98% 7.43% 6.54% 4.33% 1.72% 4.25%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "789px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "1030px"
			}}
			background={{
				path: "watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg",
				image: "https://assets.zyrosite.com/HYPBjYBGYLwSMd3s/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg",
				video: {
					videoSrc: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
					videoThumbnailSrc: "https://images.pexels.com/videos/3571264/free-video-3571264.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
				},
				origin: "assets",
				current: "image",
				imagePath: "kxkkch-Cjlz4xQ7ruTeNiqV.png",
				isTransparent: true,
				"overlay-opacity": "0.50",
				src: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg?width=1440&fit=crop",
				srcset: "https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg?width=375&fit=crop 375w, https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg?width=768&fit=crop 768w, https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg?width=1024&fit=crop 1024w, https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg?width=1440&fit=crop 1440w, https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg?width=1920&fit=crop 1920w, https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/watermarked_img_15022933639295714049-WsCabFFGWhQYgrhJ.jpg?width=2560&fit=crop 2560w"
			}}
			isFixed
		>
			<LayoutElement
				elementId={"JXNdGx"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "center",
					"--z-index": 1,
					"--grid-row": "6/7",
					"--grid-column": "5/28",
					"--m-grid-row": "5/6",
					"--m-grid-column": "1/19"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"JXNdGx"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(250, 246, 240); --lineHeightMobile: 1.3; --fontSizeMobile: 32px;\">Authentic Vedic Puja Services in Dubai &amp; UAE</h1>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"tDX7Mh"}
				className={"layout-element layout-element--layout transition transition--fade hover--shine"}
				style={{
					"--z-index": 2,
					"--grid-row": "24/25",
					"--grid-column": "8/26",
					"--m-grid-row": "11/12",
					"--m-grid-column": "1/19",
					"--u-hover-border-radius": "999px",
					"--u-hover-border-radius-m": "999px"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"tDX7Mh"}
					text={"Book a Pooja"}
					type={"primary"}
					href={"https://wa.me/971504192987"}
					target={"_blank"}
					rel={"nofollow"}
					borderRadius={999}
					borderWidth={1}
					backgroundColor={"#D97724"}
					fontColor={"#2B1A14"}
					borderColor={"#302e2c"}
					backgroundColorHover={"#e3b21e"}
					fontColorHover={"#302e2c"}
					borderColorHover={"#302e2c"}
					fontSizeDesktop={29}
					fontSizeMobile={20}
					mobileWidthVw={"91.11111111111111vw"}
					mobileHeightVw={"13.88888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zXKCzL"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 3,
					"--grid-row": "8/9",
					"--grid-column": "4/29",
					"--m-grid-row": "7/8",
					"--m-grid-column": "1/19"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zXKCzL"}
					content={"<p dir=\"auto\" class=\"body\" style=\"--lineHeightMobile: 1.3; --fontSizeMobile: 18px;\"><span style=\"color: rgba(247, 236, 222, 0.85); text-transform: none; letter-spacing: normal; font-family: Mukta, system-ui, sans-serif; font-weight: 400;\">Experienced Pandit Ji for all your religious ceremonies — Griha Pravesh, Weddings, Havans &amp; more, performed at your home with every ritual explained in your language</span></p>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zBojqI"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 4,
					"--grid-row": "12/23",
					"--grid-column": "2/11",
					"--m-grid-row": "18/23",
					"--m-grid-column": "4/15"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"zBojqI"}
					background={"#2B1A14"}
					border={"2px solid #000000"}
					borderRadius={"12px"}
					boxShadow={"none"}
					opacity={"0.55"}
					height={"100%"}
					minHeight={"60px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zPdgKX"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 5,
					"--grid-row": "10/21",
					"--grid-column": "12/21",
					"--m-grid-row": "13/17",
					"--m-grid-column": "11/19"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"zPdgKX"}
					background={"#2B1A14"}
					border={"2px solid #000000"}
					borderRadius={"12px"}
					boxShadow={"none"}
					opacity={"0.55"}
					height={"100%"}
					minHeight={"60px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zGXVa2"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--z-index": 6,
					"--grid-row": "11/22",
					"--grid-column": "22/30",
					"--m-grid-row": "13/17",
					"--m-grid-column": "1/9"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridCard
					id={"zGXVa2"}
					background={"#2B1A14"}
					border={"2px solid #000000"}
					borderRadius={"12px"}
					boxShadow={"none"}
					opacity={"0.55"}
					height={"100%"}
					minHeight={"60px"}
					className={"layout-element__component layout-element__component--GridCard"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zdGHOl"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "right",
					"--m-text": "center",
					"--z-index": 7,
					"--grid-row": "13/17",
					"--grid-column": "3/6",
					"--m-grid-row": "14/15",
					"--m-grid-column": "1/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zdGHOl"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(247, 239, 229);\"><span style=\"color: rgb(247, 239, 229); text-transform: none; letter-spacing: normal;\">12+ </span></p>"}
					textAlign={"right"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zc446c"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "right",
					"--m-text": "center",
					"--z-index": 8,
					"--grid-row": "13/17",
					"--grid-column": "13/15",
					"--m-grid-row": "14/15",
					"--m-grid-column": "11/16"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zc446c"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(247, 239, 229);\"><span style=\"color: rgb(247, 239, 229); text-transform: none; letter-spacing: normal;\">500+</span></p>"}
					textAlign={"right"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zllOm3"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "right",
					"--m-text": "center",
					"--z-index": 9,
					"--grid-row": "14/19",
					"--grid-column": "22/23",
					"--m-grid-row": "19/20",
					"--m-grid-column": "5/8"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zllOm3"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(247, 239, 229);\"><span style=\"color: rgb(247, 239, 229); text-transform: none; letter-spacing: normal;\">24/7</span></p>"}
					textAlign={"right"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zULVDx"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 10,
					"--grid-row": "14/18",
					"--grid-column": "7/9",
					"--m-grid-row": "15/16",
					"--m-grid-column": "2/7"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zULVDx"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(250, 246, 240); --lineHeightMobile: 1.3; --lineHeightDesktop: 1.3; --fontSizeMobile: 14px; --fontSizeDesktop: 14px;\">Years Performing Vedic rituals..</h3>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z63dZ7"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 11,
					"--grid-row": "13/16",
					"--grid-column": "16/19",
					"--m-grid-row": "15/16",
					"--m-grid-column": "13/18"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"z63dZ7"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(250, 246, 240); --lineHeightMobile: 1.3; --lineHeightDesktop: 1.3; --fontSizeMobile: 14px; --fontSizeDesktop: 14px;\">Ceremonies across the UAE..</h3>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zLkrb-"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--align": "flex-start",
					"--justify": "flex-start",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 12,
					"--grid-row": "15/20",
					"--grid-column": "25/27",
					"--m-grid-row": "21/22",
					"--m-grid-column": "6/14"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zLkrb-"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(250, 246, 240); --lineHeightMobile: 1.3; --lineHeightDesktop: 1.3; --fontSizeMobile: 14px; --fontSizeDesktop: 14px;\">Available 24/7 on call..</h3>"}
					textAlign={"left"}
					textAlignMobile={"left"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zbZkp-"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--align": "center",
					"--justify": "center",
					"--m-text": "center",
					"--m-align": "center",
					"--m-justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 13,
					"--grid-row": "2/3",
					"--grid-column": "1/30",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/19"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zbZkp-"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(255, 255, 255); --lineHeightMobile: 1.3; --fontSizeMobile: 26px; --fontSizeDesktop: 32px; font-size: clamp(24px, 5vw, 32px); text-align: center;\"><span style=\"color: rgb(229, 179, 97);\">ॐ</span></h3>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"z0NLBH"}
				className={"layout-element layout-element--layout transition transition--rise"}
				style={{
					"--text": "center",
					"--align": "center",
					"--m-text": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 14,
					"--grid-row": "4/5",
					"--grid-column": "1/30",
					"--m-grid-row": "3/4",
					"--m-grid-column": "1/19"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"z0NLBH"}
					content={"<p dir=\"auto\" class=\"body\" style=\"color: rgb(217, 119, 36); --lineHeightMobile: 1.45; --fontSizeMobile: 17px; --fontSizeDesktop: 20px; font-size: clamp(16px, 4.2vw, 20px); line-height: 1.45; text-align: center; margin-bottom: 4px;\"><span style=\"font-weight: 700;\"><strong>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।</strong></span></p><p dir=\"auto\" class=\"body\" style=\"color: rgb(217, 119, 36); --lineHeightMobile: 1.45; --fontSizeMobile: 17px; --fontSizeDesktop: 20px; font-size: clamp(16px, 4.2vw, 20px); line-height: 1.45; text-align: center; margin-bottom: 0;\"><span style=\"font-weight: 700;\"><strong>निर्विघ्नं कुरु मे देव शुभकार्येषु सर्वदा॥</strong></span></p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zJt-SW"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--align": "center",
					"--justify": "center",
					"--m-element-margin": "0 0 16px 0",
					"--z-index": 15,
					"--grid-row": "26/27",
					"--grid-column": "10/24",
					"--m-grid-row": "9/10",
					"--m-grid-column": "1/19"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"zJt-SW"}
					text={"Call Now"}
					type={"primary"}
					href={"tel:+971504192987"}
					target={"_self"}
					backgroundColor={"rgb(87, 12, 0)"}
					fontColor={"rgb(255, 255, 255)"}
					borderColor={"rgb(0, 0, 0)"}
					backgroundColorHover={"rgb(29, 30, 32)"}
					fontColorHover={"rgb(255, 255, 255)"}
					borderColorHover={"rgb(0, 0, 0)"}
					fontSizeDesktop={31}
					fontSizeMobile={20}
					mobileWidthVw={"91.11111111111111vw"}
					mobileHeightVw={"13.88888888888889vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
