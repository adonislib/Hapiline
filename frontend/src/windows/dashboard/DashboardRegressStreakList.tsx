import React from "react";
import {Link} from "react-router-dom";
import {QueryResult} from "react-query";

import {DashboardStreakStats} from "../../models";
import {usePersistentToggle} from "../../hooks/useToggle";
import {pluralize} from "../../services/pluralize";
import {UrlBuilder} from "../../services/url-builder";

import {ChevronUpIcon} from "../../ui/icons/ChevronUp";
import {ChevronDownIcon} from "../../ui/icons/ChevronDown";

import * as UI from "../../ui";

export const DashboardRegressStreakList: React.FC<{
	request: QueryResult<DashboardStreakStats>;
}> = ({request}) => {
	const {on: isRegressStreakListVisible, toggle: toggleRegressStreakList} = usePersistentToggle(
		true,
		"show_regress_streak_list",
	);

	const regressStreakStats = request.data?.regress_streaks ?? [];

	if (regressStreakStats.length === 0) return null;

	return (
		<>
			<UI.Row mt="24" crossAxis="center">
				<UI.Header variant="extra-small">Regress streaks</UI.Header>
				<UI.Badge style={{padding: "0 3px"}} ml="6" variant="neutral">
					{regressStreakStats.length}
				</UI.Badge>

				{isRegressStreakListVisible && (
					<UI.Button
						ml="auto"
						variant="bare"
						title="Hide regress streak list"
						onClick={toggleRegressStreakList}
					>
						<UI.VisuallyHidden>Hide regress streak list</UI.VisuallyHidden>
						<ChevronUpIcon />
					</UI.Button>
				)}

				{!isRegressStreakListVisible && (
					<UI.Button
						ml="auto"
						variant="bare"
						title="Show regress streak list"
						onClick={toggleRegressStreakList}
					>
						<UI.VisuallyHidden>Show regress streak list</UI.VisuallyHidden>
						<ChevronDownIcon />
					</UI.Button>
				)}
			</UI.Row>

			{isRegressStreakListVisible && (
				<UI.Column by="gray-1" mt="24">
					<UI.ExpandContractList max={5}>
						{regressStreakStats.map(habit => (
							<UI.Row
								mainAxis="between"
								crossAxis="end"
								pb="12"
								by="gray-1"
								key={habit.id}
								wrap="wrap"
								width="100%"
							>
								<UI.Text
									mr="12"
									mt="12"
									as={Link}
									to={UrlBuilder.dashboard.habit.preview(habit.id)}
								>
									{habit.name}
								</UI.Text>

								<UI.Row ml="auto" width="auto" wrap={[, "wrap-reverse"]} mainAxis="end" mt="6">
									{!habit.has_vote_for_today && (
										<UI.Badge
											mt={["12", "6"]}
											as={Link}
											to={UrlBuilder.dashboard.calendar.habitToday(habit.id)}
											variant="neutral"
											mr="12"
											title="Vote for this habit"
										>
											No vote yet
										</UI.Badge>
									)}

									<UI.Badge variant="negative" mt={["12", "6"]}>
										{habit.regress_streak} {pluralize("day", habit.regress_streak)} regress streak
									</UI.Badge>
								</UI.Row>
							</UI.Row>
						))}
					</UI.ExpandContractList>
				</UI.Column>
			)}
		</>
	);
};
