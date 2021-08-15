import dayjs from 'dayjs';

export const parseTimestamp = (time: number | undefined): string => {
  if (!time) return '';
  const dt = dayjs(time);
  const years = dt.year();
  const months = ('00' + (dt.month() + 1)).slice(-2);
  const dates = ('00' + dt.date()).slice(-2);
  const hours = ('00' + dt.hour()).slice(-2);
  const minutes = ('00' + dt.minute()).slice(-2);
  const seconds = ('00' + dt.second()).slice(-2);
  return `${years}-${months}-${dates} ${hours}:${minutes}:${seconds}`;
};
