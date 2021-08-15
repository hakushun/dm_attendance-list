import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { Location } from '../app/locations';
import { Plan } from '../app/plans';
import { Remark } from '../app/remarks';
import { RootState } from '../reducers';
import { updatePractice } from '../../../libs/firestore/crudPractice';
import { Event } from '../app/event';

export type PracticeItem = {
  locations: Location[];
  plans: Plan[];
  remarks: Remark[];
};
type Practice = {
  practice: PracticeItem;
  dateId: string;
  isLoading: boolean;
};
export type UpdatePayload = {
  event: Event;
  practice: PracticeItem;
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Practice>(actionCreator);

export const focusPractice = actionCreator<string>('FOCUS_PRACTICE');
export const subscribePractice = actionCreator<PracticeItem>('SUBSCRIBE_PRACTICE');
export const update = asyncActionCreator<UpdatePayload, void, CustomError>(
  'UPDATE_PRACTICE',
  async (payload) => {
    await updatePractice(payload);
  },
);
// initial state
const INITIAL_STATE: Practice = {
  practice: {
    locations: [],
    plans: [],
    remarks: [],
  },
  dateId: '',
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(focusPractice, (state, payload) => ({
    ...state,
    dateId: payload,
  }))
  .case(subscribePractice, (state, payload) => ({
    ...state,
    practice: { ...payload },
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
export const selectPractice = createSelector(
  [(state: RootState) => state.domain.practice.practice],
  (practice) => practice,
);
export const selectDateId = createSelector(
  [(state: RootState) => state.domain.practice.dateId],
  (dateId) => dateId,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.practice.isLoading],
  (isLoading) => isLoading,
);
