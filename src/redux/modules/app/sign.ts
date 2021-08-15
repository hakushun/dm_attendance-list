import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  resetUserPassword,
  signInWithFirebase,
  signOutWithFirebase,
  signUpWithFirebase,
} from '../../../libs/firebase/firebaseAuth';
import { RootState } from '../reducers';
import { Userdata } from './user';

export type SignForm = {
  email: string;
  password: string;
};
export type Sign = {
  form: SignForm;
  resetForm: { email: string };
  isLoading: boolean;
};
export type AuthPayload = {
  email: string;
  password: string;
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Sign>(actionCreator);

export const change = actionCreator<Partial<SignForm>>('CHAGNE_FORM');
export const changeResetForm = actionCreator<{ email: string }>('CHAGNE_RESET_FORM');
export const signUp = asyncActionCreator<AuthPayload, Userdata, CustomError>(
  'SIGNUP_USER',
  async (payload) => {
    const user = await signUpWithFirebase(payload);
    return user;
  },
);
export const signIn = asyncActionCreator<AuthPayload, Userdata, CustomError>(
  'SIGNIN_USER',
  async (payload) => {
    const user = await signInWithFirebase(payload);
    return user;
  },
);
export const signOut = asyncActionCreator<void, void, CustomError>('SIGNOUT_USER', async () => {
  await signOutWithFirebase();
});
export const resetPassword = asyncActionCreator<{ email: string }, void, CustomError>(
  'RESET_PASSWORD',
  async ({ email }) => {
    await resetUserPassword(email);
  },
);

// initial state
const INITIAL_STATE: Sign = {
  form: {
    email: 'sample@sample.com',
    password: 'Sample!',
  },
  resetForm: {
    email: '',
  },
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(change, (state, payload) => ({
    ...state,
    form: {
      ...state.form,
      ...payload,
    },
  }))
  .case(changeResetForm, (state, payload) => ({
    ...state,
    resetForm: payload,
  }))
  .cases(
    [
      signUp.async.started,
      signIn.async.started,
      signOut.async.started,
      resetPassword.async.started,
    ],
    (state) => ({
      ...state,
      isLoading: true,
    }),
  )
  .cases(
    [signUp.async.done, signIn.async.done, signOut.async.done, resetPassword.async.done],
    () => ({
      ...INITIAL_STATE,
    }),
  )
  .cases(
    [signUp.async.failed, signIn.async.failed, signOut.async.failed, resetPassword.async.failed],
    (state) => ({
      ...state,
      isLoading: false,
    }),
  );
export default reducer;

// selector
export const selectSignForm = createSelector(
  [(state: RootState) => state.app.sign.form],
  (form) => form,
);
export const selectResetForm = createSelector(
  [(state: RootState) => state.app.sign.resetForm],
  (resetForm) => resetForm,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.app.sign.isLoading],
  (isLoading) => isLoading,
);
