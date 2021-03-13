import actionCreatorFactory from 'typescript-fsa';
import { StepAction, steps } from 'redux-effects-steps';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { putParts } from '../../lib/utilFunctions';

export type Parts = string[];
export type UpdatePayload = {
	parts: Parts;
};
type Error = {
	code: string;
	message: string;
};

const actionCreator = actionCreatorFactory();

export const getParts = actionCreator<Parts>('get_parts');
export const updatePartsActions = actionCreator.async<
	UpdatePayload,
	null,
	Error
>('update_parts');
export const updateParts = (body: UpdatePayload): StepAction =>
	steps(updatePartsActions.started(body), () => putParts(body), [
		({ data }) => updatePartsActions.done({ params: body, result: data }),
		({ code, message }) =>
			updatePartsActions.failed({
				params: body,
				error: { code, message },
			}),
	]);

const initialState: { parts: Parts; isLoading: boolean } = {
	parts: [],
	isLoading: false,
};

const reducer = reducerWithInitialState(initialState)
	.case(getParts, (state, payload) => ({
		...state,
		parts: [...payload],
	}))
	.case(updatePartsActions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(updatePartsActions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updatePartsActions.failed, (state) => ({
		...state,
		isLoading: false,
	}));

export default reducer;

export const selectParts = createSelector(
	[(state: RootState) => state.parts.parts],
	(parts) => parts,
);

export const selectPartsIsLoading = createSelector(
	[(state: RootState) => state.parts.isLoading],
	(isLoading) => isLoading,
);
