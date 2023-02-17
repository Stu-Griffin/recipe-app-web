import * as React from "react";
import { SVGProps } from "react";

export default function SvgComponent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717ZM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z" />
		</svg>
	);
}