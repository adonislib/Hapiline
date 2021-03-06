import React from "react";

export const ExclamationIcon: React.FC<JSX.IntrinsicElements["path"]> = props => (
	<svg
		data-width="100%"
		style={{maxWidth: "24px"}}
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>Exclamation mark</title>
		<path
			d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			stroke="#4A5568"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-label="exclamation mark"
			{...props}
		/>
	</svg>
);
