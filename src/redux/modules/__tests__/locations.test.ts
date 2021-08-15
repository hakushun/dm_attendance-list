/* eslint-disable no-undefined */
import reducer, { changeLocation, selectLocations } from '../app/locations';
import { subscribePractice } from '../domain/practice';
import { initialState } from './_initialState';

// reducer
describe('Reducer: locations', () => {
  it('initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({ locations: [] });
  });
  it('Actioin: changeLocation', () => {
    const state = {
      locations: [
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
      ],
    };
    const payload = { dateId: '01F937GTKXDPW3BD3T6KYZBY9N', name1: 'palce name' };
    const action = changeLocation(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      locations: [{ dateId: '01F937GTKXDPW3BD3T6KYZBY9N', name1: 'palce name' }],
    });
  });
  it('Actioin: subscribePractice', () => {
    const payload = {
      locations: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          name2: '練習室',
          url: 'https://www.google.co.jp/',
          name1: '区民館',
        },
      ],
      plans: [],
      remarks: [],
    };
    const action = subscribePractice(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      locations: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          name2: '練習室',
          url: 'https://www.google.co.jp/',
          name1: '区民館',
        },
      ],
    });
  });
});

// selector
describe('Selector: locations', () => {
  it('selectLocations', () => {
    const result = [
      {
        dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
        name2: '練習室',
        url: 'https://www.google.co.jp/',
        name1: '区民館',
      },
      {
        dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
      },
      {
        dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
      },
    ];
    expect(result).toEqual(selectLocations(initialState));
  });
});
