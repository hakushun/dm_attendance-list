/* eslint-disable no-undefined */
import reducer, {
  addProgramForm,
  changeProgram,
  deleteProgramForm,
  focusProgram,
  selectProgram,
  selectSelectedId,
} from '../app/program';
import { subscribeProgram } from '../domain/programs';
import { initialState } from './_initialState';

// reducer
describe('Reducer: program', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({ selectedId: '', program: [] });
  });
  it('Action: addProgramForm(length < 11)', () => {
    const action = addProgramForm();
    const result = reducer(undefined, action);
    expect(result).toEqual({ selectedId: '', program: [{ id: result.program[0].id, name: '' }] });
  });
  it('Action: addProgramForm(length >= 11)', () => {
    const state = {
      selectedId: '',
      program: [
        { id: '1', name: '' },
        { id: '2', name: '' },
        { id: '3', name: '' },
        { id: '4', name: '' },
        { id: '5', name: '' },
        { id: '6', name: '' },
        { id: '7', name: '' },
        { id: '8', name: '' },
        { id: '9', name: '' },
        { id: '10', name: '' },
        { id: '11', name: '' },
      ],
    };
    const action = addProgramForm();
    const result = reducer(state, action);
    expect(result).toEqual({ selectedId: '', program: [...state.program] });
  });
  it('deleteProgramForm(length === 0', () => {
    const action = deleteProgramForm();
    const result = reducer(undefined, action);
    expect(result).toEqual({ selectedId: '', program: [] });
  });
  it('deleteProgramForm(length > 1', () => {
    const state = {
      selectedId: '',
      program: [
        { id: '1', name: '' },
        { id: '2', name: '' },
        { id: '3', name: '' },
      ],
    };
    const action = deleteProgramForm();
    const result = reducer(state, action);
    expect(result).toEqual({
      selectedId: '',
      program: [
        { id: '1', name: '' },
        { id: '2', name: '' },
      ],
    });
  });
  it('changeProgram', () => {
    const state = {
      selectedId: '',
      program: [
        { id: '1', name: '' },
        { id: '2', name: '' },
        { id: '3', name: '' },
      ],
    };
    const payload = {
      id: '2',
      name: '曲目',
    };
    const action = changeProgram(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      selectedId: '',
      program: [
        { id: '1', name: '' },
        { id: '2', name: '曲目' },
        { id: '3', name: '' },
      ],
    });
  });
  it('focusProgram', () => {
    const payload = '1234567';
    const action = focusProgram(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({ selectedId: '1234567', program: [] });
  });
  it('subscribeProgram', () => {
    const payload = [
      { id: '1', name: '' },
      { id: '2', name: '' },
      { id: '3', name: '' },
    ];
    const action = subscribeProgram(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      selectedId: '',
      program: [
        { id: '1', name: '' },
        { id: '2', name: '' },
        { id: '3', name: '' },
      ],
    });
  });
});

// selector
describe('Selector: program', () => {
  it('selectProgram', () => {
    const result = [
      {
        name: '１曲目',
        id: '01F937NK2V8K2W2F6QC9PKJZRP',
      },
      {
        name: '２曲目',
        id: '01F937NXKS2YDN1M98MZ9G1JWB',
      },
    ];
    expect(result).toEqual(selectProgram(initialState));
  });
  it('selectSelectedId', () => {
    const result = '';
    expect(result).toEqual(selectSelectedId(initialState));
  });
});
