import * as Async from "react-async";

import {IHabit} from "../interfaces/IHabit";
import {_internal_api} from "./api";

export const getHabitsRequest: Async.PromiseFn<IHabit[]> = () =>
	_internal_api.get<IHabit[]>("/habits").then(response => response.data);

export const getHabitRequest: Async.PromiseFn<IHabit> = ({id}) =>
	_internal_api.get<IHabit>(`/habit/${id}`).then(response => response.data);

export const addHabitRequest: Async.DeferFn<IHabit> = ([
	name,
	score,
	strength,
	user_id,
]: string[]) =>
	_internal_api
		.post<IHabit>("/habit", {
			name,
			score,
			strength,
			user_id,
		})
		.then(response => response.data);

export const deleteHabitRequest: Async.DeferFn<void> = ([id]: number[]) =>
	_internal_api.delete(`/habit/${id}`).then(response => response.data);

export const patchHabitRequest: Async.DeferFn<IHabit> = ([id, payload]) =>
	_internal_api.patch<IHabit>(`/habit/${id}`, payload).then(response => response.data);

export const reorderHabitsRequest: Async.DeferFn<void> = ([reorderHabitsPayload]) =>
	_internal_api.patch("/reorder-habits", reorderHabitsPayload).then(response => response.data);

export const addHabitDayVoteRequest: Async.DeferFn<void> = ([habitDayVotePayload]) =>
	_internal_api.post("/vote", habitDayVotePayload).then(response => response.data);
