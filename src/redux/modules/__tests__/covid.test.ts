/* eslint-disable no-undefined */
import reducer, {
  changeCovidAnswers,
  changeCovidDate,
  initiateCovid,
  selectCovid,
} from '../app/covid';
import { initialState } from './_initialState';

// reducer
describe('Reducer: covid', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      dateId: '',
      userId: '',
      answers: {
        covid_q0: 'no',
        covid_q1: 'no',
        covid_q2: 'no',
      },
    });
  });
  it('Action: initiateCovid', () => {
    const action = initiateCovid();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      dateId: '',
      userId: '',
      answers: {
        covid_q0: 'no',
        covid_q1: 'no',
        covid_q2: 'no',
      },
    });
  });
  it('Action: changeCovidDate', () => {
    const payload = {
      userId: '1234567',
      dateId: '09876543',
    };
    const action = changeCovidDate(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      dateId: '09876543',
      userId: '1234567',
      answers: {
        covid_q0: 'no',
        covid_q1: 'no',
        covid_q2: 'no',
      },
    });
  });
  it('Action: changeCovidAnswers', () => {
    const payload = {
      covid_q1: 'yes' as const,
    };
    const action = changeCovidAnswers(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      dateId: '',
      userId: '',
      answers: {
        covid_q0: 'no',
        covid_q1: 'yes',
        covid_q2: 'no',
      },
    });
  });
});

// selector
describe('Selector: covid', () => {
  it('selectCovid', () => {
    const result = {
      dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
      userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
      answers: {
        covid_q0: 'no',
        covid_q1: 'no',
        covid_q2: 'no',
      },
    };
    expect(result).toEqual(selectCovid(initialState));
  });
});
