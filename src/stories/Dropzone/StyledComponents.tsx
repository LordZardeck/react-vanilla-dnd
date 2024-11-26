import { styled } from "../utils/StyledComponent.tsx";

export const DraggableItem = styled(
	"div",
	"rounded-xl bg-gray-100 overflow-hidden border w-48 h-12 flex items-center justify-center select-none",
);
DraggableItem.displayName = "DraggableItem";

export const DropzoneContainer = styled(
	"div",
	"border-2 border-dashed rounded-xl w-48 h-12 border-gray-500 bg-gray-100 flex items-center justify-center",
);

export const ExampleContainer = styled(
	"div",
	"p-4 flex items-center justify-center gap-12 flex-wrap",
);