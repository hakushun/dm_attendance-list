import { Part } from '../../redux/modules/app/part';

export const isPartInvalid = (parts: Part[]): boolean => {
  return parts.some((part) => part.name.trim() === '');
};
