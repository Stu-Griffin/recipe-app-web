import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M10 12h8m0 0-2.5-2.222M18 12l-2.5 2.222m2.5-7.11V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2.111"
		/>
	</svg>
);

export default SvgComponent;