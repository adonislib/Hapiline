import {Link, useHistory} from "react-router-dom";
import * as Async from "react-async";
import React from "react";

import {BareButton} from "./BareButton";
import {HabitScore} from "./HabitScore";
import {HabitStrength} from "./HabitStrength";
import {IHabit} from "./interfaces/IHabit";
import {Vote} from "./interfaces/IDayVote";
import {api} from "./services/api";
import {useErrorNotification, useSuccessNotification} from "./contexts/notifications-context";
import {useQueryParam} from "./hooks/useQueryParam";

interface DayDialogHabitVoteListProps {
	habit: IHabit;
	day: string;
	vote: Vote | undefined;
	onResolve: VoidFunction;
}

export const DayDialogHabitVoteListItem: React.FC<DayDialogHabitVoteListProps> = ({
	onResolve,
	vote,
	habit,
	day,
}) => {
	const history = useHistory();
	const highlightedHabitId = useQueryParam("highlightedHabitId");

	const triggerSuccessNotification = useSuccessNotification();
	const triggerErrorNotification = useErrorNotification();
	const addHabitDayVoteRequestState = Async.useAsync({
		deferFn: api.habit.addHabitDayVote,
		onResolve: () => {
			triggerSuccessNotification("Habit vote added successfully!");
			onResolve();
		},
		onReject: () => triggerErrorNotification("Error while changing habit vote."),
	});

	const progressButtonBg = vote === "progress" ? "bg-green-300" : "bg-white";
	const plateauButtonBg = vote === "plateau" ? "bg-gray-300" : "bg-white";
	const regressButtonBg = vote === "regress" ? "bg-red-300" : "bg-white";

	function changeVote(type: NonNullable<Vote>) {
		addHabitDayVoteRequestState.run({
			day: new Date(day),
			habit_id: habit.id,
			vote: vote === type ? null : type,
		});
	}

	const isHabitHighlighted = Number(highlightedHabitId) === habit.id;

	return (
		<li className="flex items-baseline justify-between bg-gray-100 my-2 p-2 mt-4">
			<div className="flex items-center">
				<BareButton
					className="mr-4"
					onClick={() => history.push(`/calendar?previewDay=${day}`)}
					hidden={!isHabitHighlighted}
				>
					Unmark
				</BareButton>
				<HabitScore score={habit.score} className="px-1 py-1" />
				<HabitStrength strength={habit.strength} className="px-1 py-1 mr-4" />
				<Link
					to={`/dashboard?previewHabitId=${habit.id}`}
					className={isHabitHighlighted ? "text-blue-600" : ""}
				>
					{habit.name}
				</Link>
			</div>
			{!vote && (
				<div title="Vote for a habit" className="ml-auto text-red-600 mr-1 px-2 font-bold">
					!
				</div>
			)}
			<div>
				<BareButton
					onClick={() => changeVote("progress")}
					className={progressButtonBg}
					disabled={addHabitDayVoteRequestState.isPending}
				>
					+
				</BareButton>
				<BareButton
					onClick={() => changeVote("plateau")}
					className={plateauButtonBg}
					disabled={addHabitDayVoteRequestState.isPending}
				>
					=
				</BareButton>
				<BareButton
					onClick={() => changeVote("regress")}
					disabled={addHabitDayVoteRequestState.isPending}
					className={regressButtonBg}
				>
					-
				</BareButton>
			</div>
		</li>
	);
};