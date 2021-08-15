import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { fetch } from '../domain/covids';
import { focusPractice } from '../domain/practice';
import { RootState } from '../reducers';
import { resetPassword } from '../app/sign';

type KeyName = 'practice' | 'covidResult' | 'passwordReset';
export type Modal = Record<KeyName, boolean>;

// action
const actionCreator = actionCreatorFactory();

export const togglePracticeModal = actionCreator<boolean>('TOGGLE_PRACTICE_MODAL');
export const toggleCovidResult = actionCreator<boolean>('TOGGLE_COVID_RESULT');
export const togglePasswordReset = actionCreator<boolean>('TOGGLE_PASSWORD_RESET');
export const closeAllModal = actionCreator('CLOSE_ALL_MODAL');

// initial state
const INITIAL_STATE: Modal = {
  practice: false,
  covidResult: false,
  passwordReset: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(togglePracticeModal, (state, payload) => ({
    ...state,
    practice: payload,
  }))
  .case(toggleCovidResult, (state, payload) => ({
    ...state,
    covidResult: payload,
  }))
  .case(togglePasswordReset, (state, payload) => ({
    ...state,
    passwordReset: payload,
  }))
  .case(closeAllModal, () => ({ ...INITIAL_STATE }))
  .case(focusPractice, (state) => ({
    ...state,
    practice: true,
  }))
  .case(fetch.async.started, (state) => ({
    ...state,
    covidResult: true,
  }))
  .case(resetPassword.async.done, (state) => ({
    ...state,
    passwordReset: false,
  }));
export default reducer;

// selector
export const selectPracticeModalIsShown = createSelector(
  [(state: RootState) => state.ui.modal.practice],
  (practice) => practice,
);
export const selectCovidResultIsShown = createSelector(
  [(state: RootState) => state.ui.modal.covidResult],
  (covidResult) => covidResult,
);
export const selectPasswordResetIsShown = createSelector(
  [(state: RootState) => state.ui.modal.passwordReset],
  (passwordReset) => passwordReset,
);
