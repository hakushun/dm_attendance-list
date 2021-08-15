import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import initFirebase from '../libs/firebase/initFirebase';
import { isEmail } from '../libs/utils/isEmail';
import { isSignFormInvalid } from '../libs/utils/isSignFormInvalid';
import {
  signUp,
  signIn,
  signOut,
  selectIsLoading,
  selectSignForm,
  SignForm,
  change,
  selectResetForm,
  changeResetForm,
  resetPassword,
} from '../redux/modules/app/sign';
import { useRouter } from './useRouter';

initFirebase();

type Hooks = {
  form: SignForm;
  resetForm: { email: string };
  isLoading: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeResetForm: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  handleSignIn: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleResetPassword: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
};
export const useSign = (): Hooks => {
  const dispatch = useDispatch();
  const { router } = useRouter();
  const form = useSelector(selectSignForm);
  const resetForm = useSelector(selectResetForm);
  const isLoading = useSelector(selectIsLoading);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(change({ [e.target.id]: e.target.value }));
    },
    [dispatch],
  );
  const handleChangeResetForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeResetForm({ email: e.target.value }));
    },
    [dispatch],
  );
  const handleSignUp = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (isSignFormInvalid(form)) return;
      await dispatch(signUp(form));
      router.push('/');
    },
    [dispatch, form, router],
  );
  const handleSignIn = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (isSignFormInvalid(form)) return;
      await dispatch(signIn(form));
      router.push('/');
    },
    [dispatch, form, router],
  );
  const handleSignOut = useCallback(async () => {
    await dispatch(signOut());
  }, [dispatch]);
  const handleResetPassword = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!isEmail(resetForm.email)) return;
      await dispatch(resetPassword(resetForm));
    },
    [dispatch, resetForm],
  );
  return {
    form,
    resetForm,
    isLoading,
    handleChange,
    handleChangeResetForm,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleResetPassword,
  };
};
