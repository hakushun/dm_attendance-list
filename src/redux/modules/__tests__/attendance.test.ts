/* eslint-disable no-undefined */
import reducer, {
  Attendance,
  AttendanceType,
  changeAttendance,
  changeAttendanceItem,
  focusAttendance,
  initiateAttendance,
  selectAttendance,
} from '../app/attendance';
import { initialState } from './_initialState';

// reducer
describe('Reducer: attendance', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      userId: '',
      occupation: '',
      name: '',
      part: '',
      attendances: [],
      comment: '',
    });
  });

  it('Action: initiateAttendance', () => {
    const payload = {
      id: '',
      title: '',
      detail: '',
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
    const action = initiateAttendance(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      userId: '',
      occupation: '',
      name: '',
      part: '',
      attendances: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          remark: '',
          attendance: 'presence',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          attendance: 'presence',
          remark: '',
        },
      ],
      comment: '',
    });
  });
  it('Action: changeAttendance', () => {
    const payload = {
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      name: 'sample user1',
    };
    const action = changeAttendance(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      occupation: '',
      name: 'sample user1',
      part: '',
      attendances: [],
      comment: '',
    });
  });
  it('Action: changeAttendanceItem', () => {
    const state: Attendance = {
      comment: 'コメント',
      name: 'sample user1',
      attendances: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          remark: '',
          attendance: 'presence',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          attendance: 'undecided',
          remark: '15時早退',
        },
      ],
      occupation: 'working',
      part: 'Perc',
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
    };
    const payload = {
      dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
      attendance: 'absence' as AttendanceType,
    };
    const action = changeAttendanceItem(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      occupation: 'working',
      name: 'sample user1',
      part: 'Perc',
      attendances: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          remark: '',
          attendance: 'absence',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          attendance: 'undecided',
          remark: '15時早退',
        },
      ],
      comment: 'コメント',
    });
  });
  it('Action: focusAttendance', () => {
    const payload: Attendance = {
      comment: 'コメント',
      name: 'sample user1',
      attendances: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          remark: '',
          attendance: 'presence',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          attendance: 'undecided',
          remark: '15時早退',
        },
      ],
      occupation: 'working',
      part: 'Perc',
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
    };
    const action = focusAttendance(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      comment: 'コメント',
      name: 'sample user1',
      attendances: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          remark: '',
          attendance: 'presence',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          attendance: 'undecided',
          remark: '15時早退',
        },
      ],
      occupation: 'working',
      part: 'Perc',
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
    });
  });
});

// selector
describe('Selector: attendance', () => {
  it('selectAttendance', () => {
    const result = {
      userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
      occupation: 'extra',
      name: 'sample user2',
      part: 'Hr',
      attendances: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          attendance: 'absence',
          remark: '',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          attendance: 'undecided',
          remark: '',
        },
        {
          dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          attendance: 'presence',
          remark: '',
        },
      ],
      comment: '',
    };
    expect(result).toEqual(selectAttendance(initialState));
  });
});
