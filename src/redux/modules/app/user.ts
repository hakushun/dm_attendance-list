import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from '../reducers';
import { signIn, signOut, signUp } from './sign';

export type Userdata = {
  id: string;
  email: string;
} | null;
export type User = {
  user: Userdata;
  isLoading: boolean;
};

// action
const actionCreator = actionCreatorFactory();

export const auth = actionCreator<Userdata>('AUTH_USER');
export const setLoading = actionCreator<boolean>('SET_LOADING');

// initial state
const INITIAL_STATE: User = {
  user: null,
  isLoading: true,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(auth, (state, payload) => ({
    ...state,
    user: payload,
    isLoading: false,
  }))
  .case(setLoading, (state, payload) => ({
    ...state,
    isLoading: payload,
  }))
  .cases([signUp.async.done, signIn.async.done], (state, { result }) => ({
    ...state,
    user: result,
    isLoading: false,
  }))
  .case(signOut.async.done, (state) => ({
    ...state,
    user: null,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectUser = createSelector(
  [(state: RootState) => state.app.user.user],
  (user) => user,
);

export const selectIsLoading = createSelector(
  [(state: RootState) => state.app.user.isLoading],
  (isLoading) => isLoading,
);
