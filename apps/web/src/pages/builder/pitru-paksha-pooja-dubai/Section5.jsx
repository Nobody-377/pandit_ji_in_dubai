import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridForm from '@/components/builder/elements/GridForm';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section5() {
	return (
		<BlockLayout
			blockId={"Ts-KTF"}
			htmlId={"book-pooja"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 11,
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
				"--m-grid-template-rows": "6.67vw auto 6.67vw auto 4.72vw auto 6.67vw auto 36px",
				"--t-grid-template-rows": "minmax(24px, auto) minmax(22px, auto) minmax(24px, auto) minmax(90px, auto) minmax(17px, auto) minmax(63px, auto) minmax(24px, auto) minmax(477px, auto) 36px",
				"--small-desktop-grid-template-rows": "minmax(5.88vw, auto) minmax(10.21vw, auto) minmax(1.80vw, auto) minmax(2.94vw, auto) minmax(9.80vw, auto) minmax(2.21vw, auto) minmax(5.15vw, auto) minmax(7.03vw, auto) 5.64vw",
				"--grid-template-rows": "minmax(72px, auto) minmax(125px, auto) minmax(22px, auto) minmax(36px, auto) minmax(120px, auto) minmax(27px, auto) minmax(63px, auto) minmax(86px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "6.54% 35.38% 0.98% 49.92% 7.19%",
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
				elementId={"Gy6gCR"}
				className={"layout-element layout-element--layout"}
				style={{
					"--justify": "center",
					"--z-index": 1,
					"--grid-row": "2/9",
					"--grid-column": "4/5",
					"--m-grid-row": "8/9",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridForm
					id={"Gy6gCR"}
					formId={"Contact form"}
					elementId={"Gy6gCR"}
					collectionName={"contact_form"}
					fields={[
						{
							key: "name",
							sourceName: "Name",
							label: "Your Full Name",
							required: true,
							placeholder: "Enter your name",
							type: "text",
							control: "text"
						},
						{
							key: "phone",
							sourceName: "Phone",
							label: "Phone / WhatsApp Number",
							required: true,
							placeholder: "+971 50 000 0000",
							type: "text",
							control: "text"
						},
						{
							key: "email",
							sourceName: "Email",
							label: "Email Address",
							required: false,
							placeholder: "your.email@example.com",
							type: "text",
							control: "text"
						},
						{
							key: "message",
							sourceName: "Message",
							label: "Preferred Tithi / Ritual Details",
							required: false,
							placeholder: "Mention specific Tithi or requirements...",
							type: "text",
							control: "textarea"
						}
					]}
					successMessage={"Thank you. Pandit Ji will contact you shortly to confirm your Tithi and details."}
					formBorderWidth={0}
					formBorderColor={"#00000000"}
					formBorderRadius={8}
					formPadding={0}
					inputFillColor={"#f0ece6"}
					inputFillColorHover={"#e6e2dc"}
					inputTextColor={"#2b1a14"}
					labelTextColor={"#2b1a14"}
					inputBorderColor={"#d0cac4"}
					inputBorderWidth={1}
					inputBorderRadius={8}
					submitButtonBackgroundColor={"#d97724"}
					submitButtonBackgroundColorHover={"#ad5f1c"}
					submitButtonFontColor={"#000000"}
					submitButtonFontColorHover={"#ffffff"}
					submitButtonBorderColor={"#d97724"}
					submitButtonBorderColorHover={"#ad5f1c"}
					submitButtonBorderWidth={0}
					submitButtonBorderRadius={8}
					submitLabel={"Schedule Pitru Paksha Pooja"}
					submitAlign={"start"}
					className={"layout-element__component layout-element__component--GridForm"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"IWTZO4"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "3/4",
					"--grid-column": "2/3",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"IWTZO4"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Schedule Rituals</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"zYJMmQ"}
				className={"layout-element layout-element--layout transition transition--slide-left"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "5/6",
					"--grid-column": "2/3",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/2",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"zYJMmQ"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Book Your Pitru Paksha Pooja</h2>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"273cC7"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "7/8",
					"--grid-column": "2/3",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"273cC7"}
					content={"<p dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Schedule ancestral rituals according to your specific ancestral Tithis. Reach out via form or direct call/WhatsApp consultation.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
