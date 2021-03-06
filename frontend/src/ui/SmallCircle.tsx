import React from "react";

export function SmallCircle({fill}: {fill: React.SVGProps<{}>["fill"]}) {
	return (
		<svg
			data-mt="3"
			fill={fill}
			height={10}
			width={10}
			viewBox="0 0 10 10"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="5" cy="5" r="5" />
		</svg>
	);
}
