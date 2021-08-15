import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { questions } from '../../../config/questions';
import { RootState } from '../reducers';

export type Covid = {
  userId: string;
  dateId: string;
  answers: {
    [s: string]: 'yes' | 'no';
  };
  timestamp?: number;
};
type ChangeDatePayload = {
  userId: string;
  dateId: string;
};
type ChangeAnswerPayload = {
  [s: string]: 'yes' | 'no';
};
// action
const actionCreator = actionCreatorFactory();

export const initiateCovid = actionCreator('INITIATE_COVID_FORM');
export const changeCovidDate = actionCreator<ChangeDatePayload>('CHANGE_COVID_DATE');
export const changeCovidAnswers = actionCreator<ChangeAnswerPayload>('CHANGE_COVID_ANSWERS');

// initial state
const INITIAL_STATE: Covid = {
  dateId: '',
  userId: '',
  answers: questions.reduce((acc, value) => ({ ...acc, [value.id]: 'no' }), {}),
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(initiateCovid, () => ({ ...INITIAL_STATE }))
  .case(changeCovidDate, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(changeCovidAnswers, (state, payload) => ({
    ...state,
    answers: { ...state.answers, ...payload },
  }));
export default reducer;

// selector
export const selectCovid = createSelector(
  [(state: RootState) => state.app.covid],
  (covid) => covid,
);
