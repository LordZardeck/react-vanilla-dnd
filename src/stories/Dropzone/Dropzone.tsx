import { useEffect, useState } from "react";
import type { DragEvent as ReactDragEvent } from "react";
import { clsx } from "clsx";
import { DragDataType } from "./Draggable.tsx";
import { DropzoneContainer } from "./StyledComponents.tsx";

export function Dropzone() {
	// Lets us know if the user is currently dragging something.
	// We use this to determine if we should show an error border
	const [isDragging, setIsDragging] = useState(false);
	// Lets us know if the user is currently dragging something that we can accept.
	// We use this to determine if we should show a warning border
	const [isValidTarget, setIsValidTarget] = useState(false);
	// If the user has dragged over something we support, we set this to true so we can show a green border
	const [isOverValidTarget, setIsOverValidTarget] = useState(false);
	// Stores the last valid value that has been dropped onto this element
	const [dropValue, setDropValue] = useState<number | null>(null);

	/**
	 * We attach event listeners to all `dragstart` and `dragend` events so that we can update our UI to
	 * inform the user if our dropzone can accept the data being dragged. This only works for dragged items
	 * which originate from the same window.
	 *
	 * If we want to support dragged items which originate from another
	 * window, we would need to also handle the `dragenter` and `dragleave` events.
	 */
	function onDragEvent() {
		function checkIfValidTarget(event: DragEvent) {
			setIsDragging(true);
			if (event.dataTransfer?.types.includes(DragDataType))
				setIsValidTarget(true);
		}

		function clearValidTarget() {
			setIsDragging(false);
			setIsValidTarget(false);
			setIsOverValidTarget(false);
		}

		window.addEventListener("dragstart", checkIfValidTarget);
		window.addEventListener("dragend", clearValidTarget);

		return () => {
			window.removeEventListener("dragstart", checkIfValidTarget);
			window.removeEventListener("dragend", clearValidTarget);
		};
	}

	// Register our event listeners when the component mounts
	useEffect(onDragEvent, []);

	/**
	 * When the user drags an item over this element, we check if the data being dragged is of a type we support.
	 * If it is, we call `event.preventDefault()` to allow the drop event to occur.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event
	 */
	function onDragOver(event: ReactDragEvent) {
		const supportsTarget = event.dataTransfer.types.includes(DragDataType);
		setIsOverValidTarget(supportsTarget);

		if (supportsTarget) event.preventDefault();
	}

	/**
	 * When the user drops an item onto this element, we check if the data being dropped is of a type we support.
	 * If it is, we handle the event (in this case by setting our UI to show the dropped value, but this could be
	 * a call to an API, or a change in state), and call `event.preventDefault()` to prevent the default drop action.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event
	 */
	function onDrop(event: ReactDragEvent) {
		const data = event.dataTransfer.getData(DragDataType);

		if (!data) return;

		event.preventDefault();
		setDropValue(parseInt(data));
	}

	/**
	 * If the user had dragged an item over this element, but then moved the item away, we need to reset our UI
	 */
	function onDragLeave() {
		setIsOverValidTarget(false);
	}

	return (
		<DropzoneContainer
			className={clsx({
				"border-red-500": isDragging && !isValidTarget,
				"border-yellow-500": !isOverValidTarget && isValidTarget,
				"border-green-500": isOverValidTarget,
			})}
			onDragOver={onDragOver}
			onDrop={onDrop}
			onDragLeave={onDragLeave}
		>
			Drop Here {dropValue !== null ? `: ${dropValue}` : ""}
		</DropzoneContainer>
	);
}
