import React from "react";
import {Demo} from "./_Demo";
import {CloseIcon, Button} from "../frontend/src/ui";

export default {
	standard: (
		<Demo>
			<CloseIcon />
		</Demo>
	),
	"side by side with a primary button": (
		<Demo>
			<Button variant="primary">New habit</Button>
			<CloseIcon ml="12" />
		</Demo>
	),
	"side by side with a secondary button": (
		<Demo>
			<Button variant="secondary">Show filters</Button>
			<CloseIcon ml="12" />
		</Demo>
	),
};
