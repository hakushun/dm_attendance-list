import { Event } from '../../../redux/modules/app/event';
import { isEventInvaild } from '../isEventInvalid';

describe('isEventInvaild', () => {
  const baseEvent: Event = {
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
  it('titleがfalsy', () => {
    const event = {
      ...baseEvent,
      title: '',
    };
    const result = true;
    expect(result).toEqual(isEventInvaild(event));
  });
  it('dayがfalsy', () => {
    const event = {
      ...baseEvent,
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: 'NaN-aN-aN',
        },
      ],
    };
    const result = true;
    expect(result).toEqual(isEventInvaild(event));
  });
  it('timeがfalsy', () => {
    const event = {
      ...baseEvent,
      dates: [
        {
          time: '',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
    };
    const result = true;
    expect(result).toEqual(isEventInvaild(event));
  });
  it('問題ない場合', () => {
    const result = false;
    expect(result).toEqual(isEventInvaild(baseEvent));
  });
});
