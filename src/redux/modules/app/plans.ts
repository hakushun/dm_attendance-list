import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { subscribePractice } from '../domain/practice';
import { RootState } from '../reducers';

export type Plan = {
  dateId: string;
  category?: string;
  schedule?: string;
};
export type Plans = {
  plans: Plan[];
};
type ChangePayload = Partial<Plan>;
// action
const actionCreator = actionCreatorFactory();

export const changePlan = actionCreator<ChangePayload>('CHANGE_PLAN');

// initial state
const INITIAL_STATE: Plans = {
  plans: [],
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(changePlan, (state, payload) => ({
    plans: state.plans.map((plan) =>
      plan.dateId === payload.dateId ? { ...plan, ...payload } : plan,
    ),
  }))
  .case(subscribePractice, (_state, payload) => ({
    plans: payload.plans,
  }));
export default reducer;

// selector
export const selectPlans = createSelector(
  [(state: RootState) => state.app.plans.plans],
  (plans) => plans,
);
