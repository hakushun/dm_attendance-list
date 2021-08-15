import dayjs from 'dayjs';

export const getTimestamp = (): number => dayjs().valueOf();
