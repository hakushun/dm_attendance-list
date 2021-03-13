import actionCreatorFactory from 'typescript-fsa';
import { StepAction, steps } from 'redux-effects-steps';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { putCovid } from '../../lib/utilFunctions';

export type Response = {
	userId: number;
	date: string;
	answers: {
		[s: string]: string;
	};
	timestamp: number;
};
export type UpdatePayload = {
	response: Response;
	eventId: number;
};
export type Covid = {
	eventId: number;
	responses: Response[];
};
type Error = {
	code: string;
	message: string;
};

const actionCreator = actionCreatorFactory();

export const getCovids = actionCreator<Covid[]>('get_covids');
export const updateCovidsAcitions = actionCreator.async<
	UpdatePayload,
	null,
	Error
>('update_covids');

export const updateCovids = (body: UpdatePayload): StepAction =>
	steps(updateCovidsAcitions.started(body), () => putCovid(body), [
		({ data }) => updateCovidsAcitions.done({ params: body, result: data }),
		({ code, message }) =>
			updateCovidsAcitions.failed({
				params: body,
				error: { code, message },
			}),
	]);

const initialState: {
	covids: Covid[];
	isLoading: boolean;
} = {
	covids: [],
	isLoading: false,
};

const reducer = reducerWithInitialState(initialState)
	.case(getCovids, (state, payload) => ({
		...state,
		covids: [...payload],
	}))
	.case(updateCovidsAcitions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(updateCovidsAcitions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updateCovidsAcitions.failed, (state) => ({
		...state,
		isLoading: false,
	}));

export default reducer;

export const selectResponses = createSelector(
	[
		(state: RootState) => state.covids.covids,
		(state: RootState) => state.event,
	],
	(covids, event) => {
		const newResponses = covids.find((covid) => covid.eventId === event.id);
		if (newResponses) {
			return newResponses.responses;
		}
		return [];
	},
);

export const selectCovidsIsLoading = createSelector(
	[(state: RootState) => state.covids.isLoading],
	(isLoading) => isLoading,
);
