import { Event } from '../../redux/modules/app/event';

export const isEventInvaild = (event: Event): boolean => {
  return (
    event.title.trim() === '' ||
    event.dates.some((date) => date.day === 'NaN-aN-aN') ||
    event.dates.some((date) => date.time === '')
  );
};
