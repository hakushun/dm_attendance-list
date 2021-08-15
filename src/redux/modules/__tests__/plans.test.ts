/* eslint-disable no-undefined */
import reducer, { changePlan, selectPlans } from '../app/plans';
import { subscribePractice } from '../domain/practice';
import { initialState } from './_initialState';

// reducer
describe('Reducer: plans', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({ plans: [] });
  });
  it('Action: changePlan', () => {
    const state = {
      plans: [
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
      ],
    };
    const payload = { dateId: '01F937GTKXDPW3BD3T6KYZBY9N', category: 'practice' };
    const action = changePlan(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      plans: [{ dateId: '01F937GTKXDPW3BD3T6KYZBY9N', category: 'practice' }],
    });
  });
  it('Action :subscribePractice', () => {
    const payload = {
      locations: [],
      plans: [
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          category: 'practice',
          schedule: '13:00~14:00',
        },
      ],
      remarks: [],
    };
    const action = subscribePractice(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      plans: [
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          category: 'practice',
          schedule: '13:00~14:00',
        },
      ],
    });
  });
});

// selector
describe('Selector: plans', () => {
  it('selectPlans', () => {
    const result = [
      {
        schedule: '13:00~ 準備\n14:00~ 練習1\n15:00~ 練習2\n16:00~ 片付け',
        category: '団員合奏',
        dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
      },
      {
        dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
      },
      {
        dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
      },
    ];
    expect(result).toEqual(selectPlans(initialState));
  });
});
