import type { Meta, StoryObj } from "@storybook/react";

import { Dropzone } from "./Dropzone/Dropzone.tsx";
import { Draggable } from "./Dropzone/Draggable.tsx";
import { ExampleContainer } from "./Dropzone/StyledComponents.tsx";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	component: Dropzone,
	tags: ["!dev"],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		// layout: "fullscreen",
	},
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleCopy: Story = {
	render: function SimpleCopyExample() {
		return (
			<ExampleContainer>
				<Draggable item={1} />
				<Draggable item={2} />
				<Draggable item={3} />
				<Dropzone />
			</ExampleContainer>
		);
	},
};
