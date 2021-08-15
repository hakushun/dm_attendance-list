import { Occupation } from '../../redux/modules/app/attendance';

export const convertOccuoation = (occupation: Occupation): string => {
  if (occupation === 'working') return '社会人';
  if (occupation === 'student') return '学生';
  if (occupation === 'extra') return 'エキストラ';
  return '';
};
