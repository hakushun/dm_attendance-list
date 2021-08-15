/* eslint-disable no-undefined */
import { subscribePractice } from '../domain/practice';
import reducer, { changeRemark, selectRemarks } from '../app/remarks';
import { initialState } from './_initialState';

// reducer
describe('Reducer: remarks', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({ remarks: [] });
  });
  it('Action: changeRemark', () => {
    const state = {
      remarks: [{ dateId: '01F937GTKXDPW3BD3T6KYZBY9N' }],
    };
    const payload = {
      dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
      content: 'dummy contents',
    };
    const action = changeRemark(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      remarks: [
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          content: 'dummy contents',
        },
      ],
    });
  });
  it('Action :subscribePractice', () => {
    const payload = {
      locations: [],
      plans: [],
      remarks: [
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          content: 'dummy contents',
        },
      ],
    };
    const action = subscribePractice(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      remarks: [
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          content: 'dummy contents',
        },
      ],
    });
  });
});

// selector
describe('Selector: remarks', () => {
  it('selectRemarks', () => {
    const result = [
      {
        content: '譜面台持参',
        dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
      },
      {
        dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
      },
      {
        dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
      },
    ];
    expect(result).toEqual(selectRemarks(initialState));
  });
});
