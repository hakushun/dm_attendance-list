import dayjs from 'dayjs';

export const getStringDate = (date?: string | number): string => {
  const dt = dayjs(date);
  const years = dt.year();
  const months = ('00' + (dt.month() + 1)).slice(-2);
  const dates = ('00' + dt.date()).slice(-2);
  return `${years}-${months}-${dates}`;
};
