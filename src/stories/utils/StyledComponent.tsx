import {
	Attributes,
	ClassAttributes,
	createElement,
	ElementType,
	FunctionComponentElement,
	ReactElement,
} from "react";
import { clsx } from "clsx";

export function styled<P extends Record<string, unknown>>(
	type: ElementType,
	...className: string[]
): {
	(props?: (Attributes & P) | null): FunctionComponentElement<P>;
	displayName?: string;
};

export function styled<
	T extends keyof JSX.IntrinsicElements,
	P extends JSX.IntrinsicElements[T],
>(
	type: keyof JSX.IntrinsicElements,
	...className: string[]
): {
	(props?: (ClassAttributes<T> & P) | null): ReactElement<P, T>;
	displayName?: string;
};

export function styled<P extends Record<string, unknown>>(
	type: ElementType | keyof JSX.IntrinsicElements,
	...className: string[]
): {
	(props?: (Attributes & P & { className?: string }) | null): ReactElement<P>;
	displayName?: string;
} {
	return function Classed(props) {
		return createElement(type, {
			...props,
			className: clsx(
				// eslint-disable-next-line react/prop-types
				props?.className,
				...className,
			),
		});
	};
}
