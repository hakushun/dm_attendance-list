/* eslint-disable no-undefined */
import reducer, { change, selectTab } from '../ui/tab';
import { initialState } from './_initialState';

// reducer
describe('Reducer: tab', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({ setting: 'practice' });
  });

  it('Action: change', () => {
    const action = change({ setting: 'role' });
    const result = reducer(undefined, action);
    expect(result).toEqual({ setting: 'role' });
  });
});

// selector
describe('Selector: tab', () => {
  it('selectTab', () => {
    const result = { setting: 'practice' };
    expect(result).toEqual(selectTab(initialState));
  });
});
