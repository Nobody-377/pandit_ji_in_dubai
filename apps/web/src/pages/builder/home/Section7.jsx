import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridForm from '@/components/builder/elements/GridForm';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section7() {
	return (
		<BlockLayout
			blockId={"zKivjr"}
			htmlId={"zKivjr"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 16,
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
				"--m-grid-template-rows": "22.22vw auto 10.00vw auto 4.72vw auto 14.17vw auto 11.67vw auto 64px",
				"--t-grid-template-rows": "minmax(80px, auto) minmax(22px, auto) minmax(36px, auto) minmax(90px, auto) minmax(17px, auto) minmax(68px, auto) minmax(51px, auto) minmax(42px, auto) minmax(42px, auto) minmax(492px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(1.80vw, auto) minmax(2.94vw, auto) minmax(9.80vw, auto) minmax(2.21vw, auto) minmax(5.88vw, auto) minmax(3.76vw, auto) minmax(1.72vw, auto) minmax(12.34vw, auto) 9.07vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(22px, auto) minmax(36px, auto) minmax(120px, auto) minmax(27px, auto) minmax(72px, auto) minmax(46px, auto) minmax(21px, auto) minmax(151px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "6.54% 35.38% 0.98% 49.92% 7.19%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1004px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "710px"
			}}
			background={{
				color: "#faf6f0",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"uiWXlc"}
				className={"layout-element layout-element--layout"}
				style={{
					"--justify": "center",
					"--z-index": 1,
					"--grid-row": "2/10",
					"--grid-column": "4/5",
					"--m-grid-row": "10/11",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridForm
					id={"uiWXlc"}
					formId={"Contact form 1"}
					elementId={"uiWXlc"}
					collectionName={"contact_form_1"}
					fields={[
						{
							key: "message",
							sourceName: "Message",
							label: "What should we improve?",
							required: false,
							placeholder: "Your comments or suggestions...",
							type: "text",
							control: "textarea"
						},
						{
							key: "email",
							sourceName: "Email",
							label: "May we contact you about your feedback?",
							required: false,
							placeholder: "Enter your email address if yes",
							type: "text",
							control: "text"
						},
						{
							key: "was_the_information_clear_and_trustworthy",
							sourceName: "Was the information clear and trustworthy ",
							label: "Was the information clear and trustworthy ",
							required: false,
							type: "select",
							control: "radio",
							maxSelect: 1,
							values: [
								"YES",
								"NO"
							]
						},
						{
							key: "was_the_website_easy_to_use_on_you_phone",
							sourceName: "Was the website easy to use on you phone?",
							label: "Was the website easy to use on you phone?",
							required: false,
							type: "select",
							control: "radio",
							maxSelect: 1,
							values: [
								"YES",
								"NO"
							]
						}
					]}
					successMessage={"Thank you for helping us improve panditjiindubai.com."}
					formBorderWidth={0}
					formBorderColor={"#00000000"}
					formBorderRadius={6}
					formPadding={0}
					inputFillColor={"#f0ece6"}
					inputFillColorHover={"#e6e2dc"}
					inputTextColor={"#2b1a14"}
					labelTextColor={"#2b1a14"}
					inputBorderColor={"#d0cac4"}
					inputBorderWidth={1}
					inputBorderRadius={6}
					submitButtonBackgroundColor={"#a3554a"}
					submitButtonBackgroundColorHover={"#b5776e"}
					submitButtonFontColor={"#ffffff"}
					submitButtonFontColorHover={"#000000"}
					submitButtonBorderColor={"#a3554a"}
					submitButtonBorderColorHover={"#b5776e"}
					submitButtonBorderWidth={0}
					submitButtonBorderRadius={6}
					submitLabel={"Submit Feedback"}
					submitAlign={"start"}
					className={"layout-element__component layout-element__component--GridForm"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"1Y7cm8"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "2/3",
					"--grid-column": "2/3",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"1Y7cm8"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">• WEBSITE FEEDBACK</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"qDfA_7"}
				className={"layout-element layout-element--layout transition transition--slide-left"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "4/5",
					"--grid-column": "2/3",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/2",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"qDfA_7"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Help Us Improve Your Experience</h2>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"9B8Hpo"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "6/7",
					"--grid-column": "2/3",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"9B8Hpo"}
					content={"<p dir=\"auto\" class=\"body\" style=\"color: rgb(43, 26, 20);\">We strive to make booking Vedic ceremonies in Dubai and the UAE seamless and respectful. Please share your thoughts with us.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"LQrZH8"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 5,
					"--grid-row": "8/9",
					"--grid-column": "2/3",
					"--m-grid-row": "8/9",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"LQrZH8"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(43, 26, 20);\">Thank you for helping us improve panditjiindubai.com.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
