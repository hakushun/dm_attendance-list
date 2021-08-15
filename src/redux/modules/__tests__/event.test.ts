/* eslint-disable no-undefined */
import reducer, {
  addDateForm,
  changeDay,
  changeText,
  changeTime,
  deleteDateForm,
  focusEvent,
  initiateEvent,
  selectDates,
  selectDetail,
  selectEvent,
  selectTitle,
} from '../app/event';
import {
  create as createEvent,
  remove as removeEvent,
  update as updateEvent,
} from '../domain/events';
import { initialState } from './_initialState';

// reducer
describe('Reducer: event', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      id: '',
      title: '',
      detail: '',
      dates: [
        {
          id: result.dates[0].id,
          day: result.dates[0].day,
          time: '13:00~17:00',
        },
      ],
    });
  });
  it('Action: changeText', () => {
    const payload = { title: 'dummy title' };
    const action = changeText(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      id: '',
      title: 'dummy title',
      detail: '',
      dates: [
        {
          id: result.dates[0].id,
          day: result.dates[0].day,
          time: '13:00~17:00',
        },
      ],
    });
  });
  it('Action: changeDay', () => {
    const state = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
      ],
      title: 'sample concert',
      detail: 'This is a sample concert.',
    };
    const payload = {
      index: 1,
      day: '2021-06-28',
    };
    const action = changeDay(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      id: 'ynwbWy11Lws3O9wFyWdg',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-28',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
      ],
      title: 'sample concert',
      detail: 'This is a sample concert.',
    });
  });
  it('Action: changeTime', () => {
    const state = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
      ],
    };
    const payload = {
      index: 1,
      time: '13:00~18:30',
    };
    const action = changeTime(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~18:30',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
      ],
    });
  });
  it('Action: addDateForm(length < 31)', () => {
    const state = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
      ],
    };
    const action = addDateForm();
    const result = reducer(state, action);
    expect(result).toEqual({
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          day: result.dates[2].day,
          id: result.dates[2].id,
        },
      ],
    });
  });
  it('Action: addDateForm(length >= 31)', () => {
    const state = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        ...Array(31).map(() => ({
          id: '',
          day: '',
          time: '',
        })),
      ],
    };
    const action = addDateForm();
    const result = reducer(state, action);
    expect(result).toEqual({
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        ...Array(31).map(() => ({
          id: '',
          day: '',
          time: '',
        })),
      ],
    });
  });
  it('Action: deleteDateForm(length === 1)', () => {
    const action = deleteDateForm();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      id: '',
      title: '',
      detail: '',
      dates: [
        {
          id: result.dates[0].id,
          day: result.dates[0].day,
          time: '13:00~17:00',
        },
      ],
    });
  });
  it('Action: deleteDateForm(length > 1)', () => {
    const state = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          id: '',
          day: '',
          time: '',
        },
        {
          id: '',
          day: '',
          time: '',
        },
      ],
    };
    const action = deleteDateForm();
    const result = reducer(state, action);
    expect(result).toEqual({
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          id: '',
          day: '',
          time: '',
        },
      ],
    });
  });
  it('Action: initiateEvent', () => {
    const action = initiateEvent();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      id: '',
      title: '',
      detail: '',
      dates: [
        {
          id: result.dates[0].id,
          day: result.dates[0].day,
          time: '13:00~17:00',
        },
      ],
    });
  });
  it('Action: focusEvent', () => {
    const payload = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
    };
    const action = focusEvent(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
    });
  });
  it('Action: createEvent.async.done', () => {
    const payload = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
    };
    const action = createEvent.async.done({ params: payload, result: payload });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      id: '',
      title: '',
      detail: '',
      dates: [
        {
          id: result.dates[0].id,
          day: result.dates[0].day,
          time: '13:00~17:00',
        },
      ],
    });
  });
  it('Action: updateEvent.async.done', () => {
    const payload = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
    };
    const action = updateEvent.async.done({ params: payload, result: payload });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
    });
  });
  it('Action: removeEvent.async.done', () => {
    const payload = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      title: 'sample concert',
      detail: 'This is a sample concert.',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
    };
    const action = removeEvent.async.done({ params: payload, result: undefined });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      id: '',
      title: '',
      detail: '',
      dates: [
        {
          id: result.dates[0].id,
          day: result.dates[0].day,
          time: '13:00~17:00',
        },
      ],
    });
  });
});

// selector
describe('Selector: event', () => {
  it('selectEvent', () => {
    const result = {
      id: 'ynwbWy11Lws3O9wFyWdg',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
      title: 'sample concert',
      detail: 'This is a sample concert.',
    };
    expect(result).toEqual(selectEvent(initialState));
  });
  it('selectTitle', () => {
    const reuslt = 'sample concert';
    expect(reuslt).toEqual(selectTitle(initialState));
  });
  it('selectDetail', () => {
    const reuslt = 'This is a sample concert.';
    expect(reuslt).toEqual(selectDetail(initialState));
  });
  it('selectDates', () => {
    const reuslt = [
      {
        time: '13:00~17:00',
        id: '01F937G4BYBXW1QRV8BYH1VX9Z',
        day: '2021-06-26',
      },
      {
        time: '13:00~17:00',
        day: '2021-06-27',
        id: '01F937GTKXDPW3BD3T6KYZBY9N',
      },
      {
        time: '13:00~17:00',
        id: '01F937GV9SP8WNQFTAYC3K1YSQ',
        day: '2021-06-28',
      },
    ];
    expect(reuslt).toEqual(selectDates(initialState));
  });
});
