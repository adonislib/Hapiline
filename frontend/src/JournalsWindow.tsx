import React from "react";
import {useQuery} from "react-query";

import {Journal, SortJournalByOption, SORT_JOURNAL_BY_OPTIONS} from "./models";
import {api} from "./services/api";
import {formatDay, formatDayName} from "./services/date-formatter";
import {pluralize} from "./services/pluralize";
import {useErrorToast} from "./contexts/toasts-context";
import * as UI from "./ui/";
import {useQueryParams} from "./hooks/useQueryParam";
import {getMonthOffsetFromDate} from "./hooks/useMonthsWidget";

export function JournalsWindow() {
	const triggerErrorToast = useErrorToast();

	const [sortJournalsBy, setSortJournalsBy] = React.useState<SortJournalByOption>(
		SORT_JOURNAL_BY_OPTIONS.days_desc,
	);

	const getJournalsRequestState = useQuery<Journal[], ["journals", SortJournalByOption]>({
		queryKey: ["journals", sortJournalsBy],
		queryFn: api.journal.get,
		config: {
			onError: () => triggerErrorToast("Couldn't fetch journals."),
			retry: false,
		},
	});

	const journals = getJournalsRequestState.data ?? [];

	return (
		<UI.Card
			as="main"
			tabIndex={0}
			pt="12"
			mx={["auto", "6"]}
			mt={["48", "12"]}
			mb="24"
			width={["view-l", "auto"]}
		>
			<UI.Row bg="gray-1" p={["24", "12"]}>
				<UI.Header variant={["large", "small"]}>Journals</UI.Header>
			</UI.Row>

			<UI.Column p="24" px={["24", "6"]}>
				<UI.ShowIf request={getJournalsRequestState} is="loading">
					<UI.Text>Loading...</UI.Text>
				</UI.ShowIf>

				<UI.ShowIf request={getJournalsRequestState} is="error">
					<UI.ErrorBanner>
						Cannot fetch journals, please try again.
						<UI.Button ml="12" variant="outlined" onClick={() => getJournalsRequestState.refetch()}>
							Retry
						</UI.Button>
					</UI.ErrorBanner>
				</UI.ShowIf>

				<UI.ShowIf request={getJournalsRequestState} is="success">
					<UI.Row mainAxis="between" crossAxis="end" mb={["24", "12"]} mt="12">
						<UI.Field variant="column">
							<UI.Label htmlFor="sort_by">Sort by</UI.Label>
							<UI.Select
								id="sort_by"
								value={sortJournalsBy}
								onChange={event => {
									if (isSortJournalByOption(event.target.value)) {
										setSortJournalsBy(event.target.value);
									}
								}}
							>
								<option value="days_desc">Latest days first</option>
								<option value="days_asc">Earliest days first</option>
							</UI.Select>
						</UI.Field>

						<UI.Text>
							<UI.Text variant="bold">{journals.length}</UI.Text>{" "}
							{pluralize("result", journals.length)}
						</UI.Text>
					</UI.Row>

					{journals.length === 0 && getJournalsRequestState.status === "success" && (
						<UI.InfoBanner>
							<UI.Text>You don't have any journals yet.</UI.Text>
						</UI.InfoBanner>
					)}

					<UI.ExpandContractList max={20}>
						{journals.map(journal => (
							<JournalItem key={journal.id} {...journal} />
						))}
					</UI.ExpandContractList>
				</UI.ShowIf>
			</UI.Column>
		</UI.Card>
	);
}

function JournalItem(journal: Journal) {
	const [, updateQueryParams] = useQueryParams("journals");

	function showJournal() {
		updateQueryParams("calendar", {
			preview_day: formatDay(journal.day),
			tab: "journal",
			month_offset: String(getMonthOffsetFromDate(journal.day)),
		});
	}

	const numberOfWords = getNumberOfWords(journal.content);

	return (
		<UI.Row key={journal.id} crossAxis="baseline" by="gray-1" py="12">
			<UI.Row wrap={[, "wrap"]} mainAxis="between">
				<UI.Wrapper mr="24">
					<UI.Text variant="semi-bold" mr="12">
						{formatDay(journal.day)}
					</UI.Text>

					<UI.Text>{formatDayName(journal.day)}</UI.Text>
				</UI.Wrapper>

				<UI.Text variant="bold" mr="24">
					{numberOfWords} {pluralize("word", numberOfWords)}
				</UI.Text>
			</UI.Row>

			<UI.Button variant="outlined" onClick={showJournal}>
				Show
			</UI.Button>
		</UI.Row>
	);
}

function getNumberOfWords(content: Journal["content"]): number {
	if (!content) return 0;
	return content.split(" ").length;
}

function isSortJournalByOption(value: any): value is SortJournalByOption {
	return Object.keys(SORT_JOURNAL_BY_OPTIONS).includes(value);
}
