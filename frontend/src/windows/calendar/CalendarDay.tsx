import {isFuture, isSameDay, isToday} from "date-fns";
import React from "react";

import * as UI from "../../ui";
import {DayDialog} from "../../DayDialog";
import {DaySummaryChart} from "../../DayDialogSummary";
import {DayCellWithFullStats} from "../../models";
import {formatDay, formatShortDayName} from "../../services/date-formatter";
import {getHabitsAvailableAtThisDay} from "../../selectors/getHabitsAvailableAtDay";
import {useHabits} from "../../contexts/habits-context";
import {useQueryParams} from "../../hooks/useQueryParam";
import {pluralize} from "../../services/pluralize";

type CalendarDayProps = DayCellWithFullStats & {
	refreshCalendar: VoidFunction;
};

export function CalendarDay(props: CalendarDayProps) {
	const {day, styles, refreshCalendar, ...stats} = props;

	const habits = useHabits();
	const [queryParams, updateQueryParams] = useQueryParams();

	const previewDay = queryParams.preview_day;

	const thisDay = new Date(day);
	const isThisDayToday = isToday(thisDay);
	const isThisDayInTheFuture = isFuture(thisDay);

	const numberOfHabitsAvailableAtThisDay = getHabitsAvailableAtThisDay(habits, thisDay).length;

	const isDayDialogAvailable = !isThisDayInTheFuture && numberOfHabitsAvailableAtThisDay > 0;
	const isDayDialogVisible = previewDay && isSameDay(new Date(previewDay), thisDay);

	function openDialog() {
		updateQueryParams("calendar", {
			month_offset: queryParams.month_offset,
			preview_day: day,
			habit_vote_filter: isThisDayToday && stats.numberOfMissingVotes > 0 ? "unvoted" : "all",
		});
	}

	const isNewHabitsTextVisible = stats.numberOfCreatedHabits > 0;

	const newHabitsText = `${stats.numberOfCreatedHabits} new ${pluralize(
		"habit",
		stats.numberOfCreatedHabits,
	)}`;

	const textVariant = isThisDayToday ? "bold" : "regular";

	return (
		<UI.Column mt={[, "6"]} bg="gray-0" bw="2" b="gray-1" style={styles} data-testid="day">
			<UI.Row px="6">
				<UI.Text variant={textVariant}>{day}</UI.Text>

				<UI.Text variant={textVariant} ml={["auto", "12"]}>
					{formatShortDayName(day)}
				</UI.Text>
			</UI.Row>

			{isDayDialogAvailable && (
				<UI.Row mainAxis="between" crossAxis="end" p="6" my="auto">
					{isNewHabitsTextVisible && <UI.Text variant="dimmed">{newHabitsText}</UI.Text>}

					<UI.Button ml="auto" variant="bare" bg="gray-1" onClick={openDialog}>
						Show
					</UI.Button>
				</UI.Row>
			)}

			{isDayDialogVisible && <DayDialog day={day} onResolve={refreshCalendar} {...stats} />}

			{isDayDialogAvailable && (
				<DaySummaryChart
					numberOfPossibleVotes={numberOfHabitsAvailableAtThisDay}
					day={formatDay(thisDay)}
					{...stats}
				/>
			)}
		</UI.Column>
	);
}
