import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { generateId } from '../../../libs/ulid/generateId';
import { subscribePart } from '../domain/parts';
import { RootState } from '../reducers';

export type Part = {
  id: string;
  name: string;
};
export type ChangeOrderPayload = {
  index: number;
  order: number;
};
// action
const actionCreator = actionCreatorFactory();

export const addPartForm = actionCreator('ADD_PART_FORM');
export const deletePartForm = actionCreator('DELETE_PART_FORM');
export const changePart = actionCreator<Part>('CHANGE_PART');
export const changeOrder = actionCreator<ChangeOrderPayload>('CHANGE_ORDER');

// initial state
const INITIAL_STATE: Part[] = [];

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(addPartForm, (state) =>
    state.length < 31 ? [...state, { id: generateId(), name: '' }] : [...state],
  )
  .case(deletePartForm, (state) =>
    state.length === 1 ? [...state] : [...state].slice(0, state.length - 1),
  )
  .case(changePart, (state, payload) =>
    state.map((item) => (item.id === payload.id ? payload : item)),
  )
  .case(changeOrder, (state, { index, order }) =>
    state.map((item, i) => {
      if (i === index + order) return state[index];
      if (i === index) return state[index + order];
      return item;
    }),
  )
  .case(subscribePart, (_state, payload) => [...payload]);
export default reducer;

// selector
export const selectPart = createSelector([(state: RootState) => state.app.part], (part) => part);
