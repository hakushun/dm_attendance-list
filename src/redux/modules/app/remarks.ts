import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { subscribePractice } from '../domain/practice';
import { RootState } from '../reducers';

export type Remark = {
  dateId: string;
  content?: string;
};
export type Remarks = {
  remarks: Remark[];
};
type ChangePayload = Partial<Remark>;
// action
const actionCreator = actionCreatorFactory();

export const changeRemark = actionCreator<ChangePayload>('CHANGE_REMARK');

// initial state
const INITIAL_STATE: Remarks = {
  remarks: [],
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(changeRemark, (state, payload) => ({
    remarks: state.remarks.map((remark) =>
      remark.dateId === payload.dateId ? { ...remark, ...payload } : remark,
    ),
  }))
  .case(subscribePractice, (_state, payload) => ({
    remarks: payload.remarks,
  }));
export default reducer;

// selector
export const selectRemarks = createSelector(
  [(state: RootState) => state.app.remarks.remarks],
  (remarks) => remarks,
);
