import React from "react";

import * as UI from "../ui";
import {Habit} from "../models";

export const useHabitSearch = (defaultValue = "") => {
	const [habitSearchPhrase, setHabitSearchPhrase] = React.useState(defaultValue);

	const habitSearchFilterFn = (habitName: Habit["name"]): boolean => {
		if (!habitSearchPhrase) return true;
		return habitName.toLowerCase().includes(habitSearchPhrase.toLowerCase());
	};

	const clearHabitSearchPhrase = () => setHabitSearchPhrase("");
	const onHabitSearchPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHabitSearchPhrase(event.target.value);
	};

	return {
		value: habitSearchPhrase,
		onChange: onHabitSearchPhraseChange,
		filterFn: habitSearchFilterFn,
		clearPhrase: clearHabitSearchPhrase,
	};
};

export const HabitSearchInput: React.FC<JSX.IntrinsicElements["input"]> = props => (
	<UI.Field>
		<UI.Label htmlFor="habit_name">Habit name</UI.Label>
		<UI.Input id="habit_name" type="search" placeholder="Search for habits..." {...props} />
	</UI.Field>
);
