import type {DragEvent} from "react";
import {useRef} from "react";
import {DraggableItem} from "./StyledComponents.tsx";

/**
 * This is a custom data type that we will use to identify the data being dragged.
 * By specifying a data type for this data, we de-couple the drag logic from the drop logic.
 * According to MDN, the data type should be a valid MIME type, but it can be any string.
 *
 * Because we are wanting there to be a unique type for the data being dragged, we will use a custom
 * MIME subtype with the Personal tree, represented by `prs`, and the suffix `+json` to indicate that
 * the data is stored in JSON format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
 * @see https://en.wikipedia.org/wiki/Media_type#Subtypes
 */
export const DragDataType = "application/prs.drag-example+json";

export function Draggable({ item }: { item: number }) {
	const dragRef = useRef<HTMLDivElement>(null);

	/**
	 * When the user starts dragging this element, we will set the data relevant to this item
	 * onto the {@link DataTransfer} object. This allows other events listening to drag operations
	 * to check if the data being dragged is relevant to them.
	 *
	 * By specifying a unique data type, other events know whether they can support a drop operation
	 * of that data type. This allows us to keep the drop handling logic separate from the drag logic.
	 *
	 * In addition, we can set the dragged image to be the current state of the element being dragged,
	 * removing the need for UI locking javascript to keep track of the mouse position to update any custom
	 * drag overlay.
	 */
	function onDragStart(event: DragEvent) {
		event.dataTransfer.setData(DragDataType, item.toString());

		if (dragRef.current)
			event.dataTransfer.setDragImage(dragRef.current, 10, 10);
	}

	return (
		<DraggableItem ref={dragRef} draggable={true} onDragStart={onDragStart}>
			Drag Me: {item}
		</DraggableItem>
	);
}
