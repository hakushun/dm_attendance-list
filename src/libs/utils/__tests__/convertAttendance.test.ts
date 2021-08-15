import { convertAttendance } from '../convertAttendance';

describe('convertAttendance', () => {
  it('type: presence', () => {
    const result = '○';
    expect(result).toEqual(convertAttendance('presence'));
  });

  it('type: undecided', () => {
    const result = '△';
    expect(result).toEqual(convertAttendance('undecided'));
  });

  it('type: absence', () => {
    const result = '×';
    expect(result).toEqual(convertAttendance('absence'));
  });
});
