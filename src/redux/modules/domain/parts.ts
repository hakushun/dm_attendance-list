import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { RootState } from '../reducers';
import { Part } from '../app/part';
import { updatePart } from '../../../libs/firestore/crudPart';
import { Event } from '../app/event';

export type Parts = {
  parts: Part[];
  isLoading: boolean;
};
export type UpdatePayload = {
  event: Event;
  part: Part[];
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Parts>(actionCreator);

export const subscribePart = actionCreator<Part[]>('SUBSCRIBE_PART');
export const update = asyncActionCreator<UpdatePayload, void, CustomError>(
  'UPDATE_PART',
  async (payload) => {
    await updatePart(payload);
  },
);

// initial state
const INITIAL_STATE: Parts = {
  parts: [],
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(subscribePart, (state, payload) => ({
    ...state,
    parts: [...payload],
  }))
  .case(update.async.started, (state) => ({
    ...state,
    isLoading: true,
  }))
  .case(update.async.done, (state) => ({
    ...state,
    isLoading: false,
  }))
  .case(update.async.failed, (state) => ({
    ...state,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectParts = createSelector(
  [(state: RootState) => state.domain.parts.parts],
  (parts) => parts,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.parts.isLoading],
  (isLoading) => isLoading,
);
