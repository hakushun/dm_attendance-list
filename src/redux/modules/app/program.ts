import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { generateId } from '../../../libs/ulid/generateId';
import { subscribeProgram } from '../domain/programs';
import { RootState } from '../reducers';

export type ProgramItem = {
  id: string;
  name: string;
};
type Program = {
  selectedId: string;
  program: ProgramItem[];
};
// action
const actionCreator = actionCreatorFactory();

export const addProgramForm = actionCreator('ADD_PROGRAM_FORM');
export const deleteProgramForm = actionCreator('DELETE_PROGRAM_FORM');
export const changeProgram = actionCreator<ProgramItem>('CHANGE_PROGRAM');
export const focusProgram = actionCreator<string>('FOCUS_PROGRAM');

// initial state
const INITIAL_STATE: Program = {
  selectedId: '',
  program: [],
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(addProgramForm, (state) => ({
    ...state,
    program:
      state.program.length < 11
        ? [...state.program, { id: generateId(), name: '' }]
        : [...state.program],
  }))
  .case(deleteProgramForm, (state) => ({
    ...state,
    program:
      state.program.length === 0
        ? [...state.program]
        : [...state.program].slice(0, state.program.length - 1),
  }))
  .case(changeProgram, (state, payload) => ({
    ...state,
    program: state.program.map((item) => (item.id === payload.id ? payload : item)),
  }))
  .case(focusProgram, (state, payload) => ({
    ...state,
    selectedId: payload,
  }))
  .case(subscribeProgram, (state, payload) => ({
    ...state,
    program: [...payload],
  }));
export default reducer;

// selector
export const selectProgram = createSelector(
  [(state: RootState) => state.app.program.program],
  (program) => program,
);
export const selectSelectedId = createSelector(
  [(state: RootState) => state.app.program.selectedId],
  (selectedId) => selectedId,
);
