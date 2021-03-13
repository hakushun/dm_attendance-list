import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import {
	createEventActions,
	removeEventActions,
	updateEventsActions,
} from './events';

export type Location = {
	name1: string;
	name2: string;
	url: string;
};
export type Plan = {
	category: string;
	schedule: string;
};
export type Remark = {
	contents: string;
};
export interface Event {
	id: number;
	title: string;
	detail: string;
	days: string[];
	times: string[];
	locations: Location[];
	plans: Plan[];
	remarks: Remark[];
	programs: string[];
}

const actionCreator = actionCreatorFactory();

export const initiateEvent = actionCreator('initiate_event');
export const updateEvent = actionCreator<Event>('update_event');

export const initialDay = (): string => {
	const dt = new Date();
	const y = dt.getFullYear();
	const m = ('00' + (dt.getMonth() + 1)).slice(-2);
	const d = ('00' + dt.getDate()).slice(-2);
	return `${y}-${m}-${d}`;
};
export const initialTime = '13:00~17:00';
const initialLocation: Location = { name1: '', name2: '', url: '' };
const initialPlan: Plan = { category: '', schedule: '' };
const initialRemark: Remark = { contents: '' };
const initialState: Event = {
	id: 0,
	title: '',
	detail: '',
	days: [initialDay()],
	times: [initialTime],
	locations: [initialLocation],
	plans: [initialPlan],
	remarks: [initialRemark],
	programs: [],
};

const reducer = reducerWithInitialState(initialState)
	.case(initiateEvent, () => ({ ...initialState }))
	.case(updateEvent, (_state, payload) => ({
		...payload,
	}))
	.case(createEventActions.done, (state, { result }) => ({
		...state,
		...result.event,
	}))
	.case(updateEventsActions.done, (state, { result }) => ({
		...state,
		...result.event,
	}))
	.case(removeEventActions.done, () => ({ ...initialState }))
	.case(removeEventActions.failed, () => ({ ...initialState }));

export default reducer;

export const selectEvent = createSelector(
	[(state: RootState) => state.event],
	(event) => event,
);
