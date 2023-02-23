import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		fill="none"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke="#000"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19 5 5 19M5 5l14 14"
		/>
	</svg>
);

export default SvgComponent;