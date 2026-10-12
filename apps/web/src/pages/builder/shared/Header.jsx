import React from 'react';
import BlockNavigation from '@/components/builder/blocks/BlockNavigation';

export default function Header() {
	return (
		<BlockNavigation
			logoSrc={"https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/new_astrologer_shree_vishal_shastri-removebg-preview-G1TPRlnciYHDfUKK.png?width=768&fit=scale-down"}
			logoText={"Pandit Ji In Dubai - Vedic Pooja & Ritual Services UAE"}
			logoHref={"/"}
			logoHeightDesktop={166}
			logoHeightMobile={85}
			isLogoVisible
			layout={"desktop-1"}
			mobileLayout={"mobile-1"}
			mobileLinksAlignment={"right"}
			isSticky
			cartIconSize={"24px"}
			style={{
				"--width": "1240px",
				"--padding-top": "0px",
				"--padding": "0px 16px 0px 16px",
				"--padding-right": "16px",
				"--padding-bottom": "0px",
				"--padding-left": "16px",
				"--m-padding-top": "6px",
				"--m-padding": "6px 16px 6px 16px",
				"--m-padding-right": "16px",
				"--m-padding-bottom": "6px",
				"--m-padding-left": "16px",
				"--logo-width": "166px",
				"--cartIconSize": "24px",
				"--link-spacing": "64px",
				"--m-logo-width": "85px",
				"--m-link-spacing": "25px",
				"--element-spacing": "64px",
				"--m-element-spacing": "64px",
				"--contrastBackgroundColor": "rgb(225, 209, 177)",
				"--nav-bg": "rgb(242, 235, 221)",
				"--nav-link-color": "rgb(43, 26, 20)",
				"--nav-link-text-color": "rgb(43, 26, 20)",
				"--nav-link-color-hover": "rgb(30, 18, 14)",
				"--nav-link-text-color-hover": "rgb(30, 18, 14)"
			}}
			nav={[
				{
					id: "home",
					href: "/",
					text: "Home",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "zcfa3j",
					href: "/authentic-vedic-pooja-dubai",
					text: "About Pandit Ji",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "zXyBpB",
					href: "/book-pandit-in-dubai",
					text: "Contact & Bookings",
					isHidden: false,
					hasDropdown: false
				}
			]}
		/>
	);
}
