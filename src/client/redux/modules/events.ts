import actionCreatorFactory from 'typescript-fsa';
import { StepAction, steps } from 'redux-effects-steps';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Event } from './event';
import { deleteEvent, postEvent, putEvent } from '../../lib/utilFunctions';

export interface Events {
	events: Event[];
	state: string;
	isLoading: boolean;
}
export type CreatePayload = {
	event: Event;
};
export type UpdatePayload = {
	event: Event;
};
type Error = {
	code: string;
	message: string;
};
const actionCreator = actionCreatorFactory();

export const changeState = actionCreator('change_state');
export const getEvents = actionCreator<Event[]>('get_events');

export const createEventActions = actionCreator.async<
	CreatePayload,
	{ event: Event },
	Error
>('create_event');
export const createEvent = (body: CreatePayload): StepAction =>
	steps(createEventActions.started(body), () => postEvent(body), [
		({ data }) => createEventActions.done({ params: body, result: data }),
		({ code, message }) =>
			createEventActions.failed({
				params: body,
				error: { code, message },
			}),
	]);
export const updateEventsActions = actionCreator.async<
	UpdatePayload,
	{ event: Event },
	Error
>('update_event');
export const updateEvents = (body: UpdatePayload): StepAction =>
	steps(updateEventsActions.started(body), () => putEvent(body), [
		({ data }) => updateEventsActions.done({ params: body, result: data }),
		({ code, message }) =>
			updateEventsActions.failed({
				params: body,
				error: { code, message },
			}),
	]);
export const removeEventActions = actionCreator.async<number, null, Error>(
	'remove_event',
);
export const removeEvent = (body: number): StepAction =>
	steps(removeEventActions.started(body), () => deleteEvent(body), [
		({ data }) => removeEventActions.done({ params: body, result: data }),
		({ code, message }) =>
			removeEventActions.failed({
				params: body,
				error: { code, message },
			}),
	]);

const initialState: Events = {
	events: [],
	state: 'initial',
	isLoading: false,
};

const reducer = reducerWithInitialState(initialState)
	.case(changeState, (state) => ({ ...state, state: 'complete' }))
	.case(getEvents, (state, payload) => ({
		...state,
		events: [...payload],
	}))
	.case(createEventActions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(createEventActions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(createEventActions.failed, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updateEventsActions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(updateEventsActions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updateEventsActions.failed, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(removeEventActions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(removeEventActions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(removeEventActions.failed, (state) => ({
		...state,
		isLoading: false,
	}));

export default reducer;

export const selectEvents = createSelector(
	[(state: RootState) => state.events.events],
	(events) => events,
);

export const selectEventsState = createSelector(
	[(state: RootState) => state.events.state],
	(state) => state,
);

export const selectEventsIsLoading = createSelector(
	[(state: RootState) => state.events.isLoading],
	(isLoading) => isLoading,
);
