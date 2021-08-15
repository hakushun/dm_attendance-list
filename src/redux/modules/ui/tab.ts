import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from '../reducers';

export type Value = 'practice' | 'program' | 'role' | 'part';
export type Tab = {
  setting: Value;
};
type ChangePayload = {
  [s: string]: Value;
};

// action
const actionCreator = actionCreatorFactory();

export const change = actionCreator<ChangePayload>('CHANGE_TAB');

// initial state
const INITIAL_STATE: Tab = {
  setting: 'practice',
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE).case(change, (state, payload) => ({
  ...state,
  ...payload,
}));
export default reducer;

// selector
export const selectTab = createSelector([(state: RootState) => state.ui.tab], (tab) => tab);
