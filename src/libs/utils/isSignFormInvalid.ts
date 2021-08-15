import { SignForm } from '../../redux/modules/app/sign';
import { isEmail } from './isEmail';

export const isSignFormInvalid = (value: SignForm): boolean => {
  return value.email.trim() === '' || value.password.trim() === '' || !isEmail(value.email);
};
