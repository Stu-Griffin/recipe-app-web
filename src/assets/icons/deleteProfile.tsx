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
			d="M4 20v-1a5 5 0 0 1 5-5h3.75M16 15l2.5 2.5m0 0L21 20m-2.5-2.5L21 15m-2.5 2.5L16 20M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
		/>
	</svg>
);

export default SvgComponent;