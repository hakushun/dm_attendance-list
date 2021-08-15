import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { RootState } from '../reducers';
import { ProgramItem } from '../app/program';
import { updateProgram } from '../../../libs/firestore/crudProgram';
import { Event } from '../app/event';

export type Programs = {
  programs: ProgramItem[];
  isLoading: boolean;
};
export type UpdatePayload = {
  event: Event;
  program: ProgramItem[];
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Programs>(actionCreator);

export const subscribeProgram = actionCreator<ProgramItem[]>('SUBSCRIBE_PROGRAM');
export const update = asyncActionCreator<UpdatePayload, void, CustomError>(
  'UPDATE_PROGRAM',
  async (payload) => {
    await updateProgram(payload);
  },
);

// initial state
const INITIAL_STATE: Programs = {
  programs: [],
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(subscribeProgram, (state, payload) => ({
    ...state,
    programs: [...payload],
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
export const selectPrograms = createSelector(
  [(state: RootState) => state.domain.programs.programs],
  (programs) => programs,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.programs.isLoading],
  (isLoading) => isLoading,
);
