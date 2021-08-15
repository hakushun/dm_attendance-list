/* eslint-disable no-undefined */
import reducer, {
  addPartForm,
  changeOrder,
  changePart,
  deletePartForm,
  selectPart,
} from '../app/part';
import { initialState } from './_initialState';

// reducer
describe('Reducer: part', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual([]);
  });
  it('Action: addPartForm(length < 31)', () => {
    const action = addPartForm();
    const result = reducer(undefined, action);
    expect(result).toEqual([{ id: result[0].id, name: '' }]);
  });
  it('Action: addPartForm(length >= 31)', () => {
    const state = [
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
      { id: '1', name: '' },
    ];
    const action = addPartForm();
    const result = reducer(state, action);
    expect(result).toEqual([...state]);
  });
  it('Action: deletePartForm(length === 1)', () => {
    const state = [{ id: '1', name: '' }];
    const action = deletePartForm();
    const result = reducer(state, action);
    expect(result).toEqual([...state]);
  });
  it('Action: deletePartForm(length > 1)', () => {
    const state = [
      { id: '1', name: '' },
      { id: '2', name: '' },
    ];
    const action = deletePartForm();
    const result = reducer(state, action);
    expect(result).toEqual([{ id: '1', name: '' }]);
  });
  it('Action: changePart', () => {
    const state = [
      { id: '1', name: '' },
      { id: '2', name: '' },
    ];
    const payload = { id: '1', name: 'test' };
    const action = changePart(payload);
    const result = reducer(state, action);
    expect(result).toEqual([
      { id: '1', name: 'test' },
      { id: '2', name: '' },
    ]);
  });
  it('Action: changeOrder(up)', () => {
    const state = [
      { id: '1', name: '' },
      { id: '2', name: '' },
      { id: '3', name: '' },
    ];
    const payload = {
      index: 1,
      order: -1,
    };
    const action = changeOrder(payload);
    const result = reducer(state, action);
    expect(result).toEqual([
      { id: '2', name: '' },
      { id: '1', name: '' },
      { id: '3', name: '' },
    ]);
  });
  it('Action: changeOrder(down)', () => {
    const state = [
      { id: '1', name: '' },
      { id: '2', name: '' },
      { id: '3', name: '' },
    ];
    const payload = {
      index: 1,
      order: 1,
    };
    const action = changeOrder(payload);
    const result = reducer(state, action);
    expect(result).toEqual([
      { id: '1', name: '' },
      { id: '3', name: '' },
      { id: '2', name: '' },
    ]);
  });
});

// selector
describe('Selector: part', () => {
  it('selectPart', () => {
    const result = [
      {
        name: 'Fl',
        id: '01F937G3VMXWPPEV6WN1TJ51QW',
      },
      {
        id: '01F937G3VM7M7HZ9QMRVM02E05',
        name: 'Ob',
      },
      {
        id: '01F937G3VMD2V6SGKH904QP5E0',
        name: 'Cl',
      },
      {
        name: 'Fg',
        id: '01F937G3VM3JXMB12ZABPWVX4E',
      },
      {
        id: '01F937G3VMXKJ833ZYG9RXF2V9',
        name: 'Hr',
      },
      {
        id: '01F937G3VMFEQFXG17HW1GNZQX',
        name: 'Tp',
      },
      {
        name: 'Tb',
        id: '01F937G3VMT251EEC0HTZBV8ES',
      },
      {
        id: '01F937G3VM6BPYJ87X5BPRJYNR',
        name: 'Tuba',
      },
      {
        name: 'Perc',
        id: '01F937G3VMBKBBE11H2NSZ2YBN',
      },
      {
        name: 'Vn',
        id: '01F937G3VMEB4RY6BKTWX5VJW6',
      },
      {
        id: '01F937G3VM5710CZ2T5BY5G8KH',
        name: 'Va',
      },
      {
        id: '01F937G3VMC115BSGV7STWCAS5',
        name: 'Vc',
      },
      {
        id: '01F937G3VMZJNYQWV013TNMNG3',
        name: 'Cb',
      },
    ];
    expect(result).toEqual(selectPart(initialState));
  });
});
