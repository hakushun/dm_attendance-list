import { AttendanceType } from '../../redux/modules/app/attendance';

export const convertAttendance = (type: AttendanceType): string => {
  switch (type) {
    case 'presence':
      return '○';
    case 'undecided':
      return '△';
    case 'absence':
      return '×';
    default:
      return '';
  }
};
