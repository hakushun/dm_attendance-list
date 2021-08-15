import { Attendance, Occupation } from '../../../redux/modules/app/attendance';
import { isAttendanceInvalid } from '../isAttendanceInvalid';

describe('isAttendanceInvalid', () => {
  const baseAttendance: Attendance = {
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
  it('nameがfalsy', () => {
    const attendance = {
      ...baseAttendance,
      name: '',
    };
    const result = true;
    expect(result).toEqual(isAttendanceInvalid(attendance));
  });
  it('partがfalsy', () => {
    const attendance = {
      ...baseAttendance,
      part: '',
    };
    const result = true;
    expect(result).toEqual(isAttendanceInvalid(attendance));
  });
  it('occupationがfalsy', () => {
    const attendance = {
      ...baseAttendance,
      occupation: '' as Occupation,
    };
    const result = true;
    expect(result).toEqual(isAttendanceInvalid(attendance));
  });
  it('userIdがfalsy', () => {
    const attendance = {
      ...baseAttendance,
      userId: '',
    };
    const result = true;
    expect(result).toEqual(isAttendanceInvalid(attendance));
  });
  it('入力に問題ない', () => {
    const result = false;
    expect(result).toEqual(isAttendanceInvalid(baseAttendance));
  });
});
