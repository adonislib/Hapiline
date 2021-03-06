import {_internal_api} from "./api";
import {constructUrl} from "../hooks/useQueryParam";
import {formatDay} from "../services/date-formatter";

import {Journal, DraftJournal, SortJournalByOption} from "../models";

export const getJournalRequest = async (_key: "journal", day: Journal["day"]) =>
	_internal_api
		.get<Journal>(constructUrl(`/journal`, {day: formatDay(day)}))
		.then(response => response.data);

export const updateJournalRequest = (newJournalPayload: DraftJournal) =>
	_internal_api
		.post<Journal>(`/journal`, {
			day: formatDay(newJournalPayload.day),
			content: newJournalPayload.content,
		})
		.then(response => response.data);

export const getJournalsRequest = async (_key: "journals", sort: SortJournalByOption) =>
	_internal_api.get<Journal[]>(constructUrl("/journals", {sort})).then(response => response.data);
