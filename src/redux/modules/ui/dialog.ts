import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from '../reducers';
import { resetPassword, signIn, signOut, signUp } from '../app/sign';
import {
  create as createAttendance,
  remove as removeAttendance,
  update as updateAttendance,
} from '../domain/attendances';
import { create as createCovid, fetch as fetchCovid } from '../domain/covids';
import {
  create as createEvent,
  remove as removeEvent,
  update as updateEvent,
} from '../domain/events';
import { update as updatePart } from '../domain/parts';
import { update as updatePractice } from '../domain/practice';
import { update as updateProgram } from '../domain/programs';
import { update as updateRole } from '../domain/roles';

export type Message = {
  title: string;
  description: string;
};
type Dialog = {
  isOpened: boolean;
  message: Message;
};
// action
const actionCreator = actionCreatorFactory();
export const toggle = actionCreator<boolean>('TOGGLE_DIALOG');

// initial state
const INITIAL_STATE: Dialog = {
  isOpened: false,
  message: {
    title: '',
    description: '',
  },
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(toggle, (state, payload) => ({
    ...state,
    isOpened: payload,
  }))
  .cases(
    [signUp.async.failed, signIn.async.failed, signOut.async.failed, resetPassword.async.failed],
    (state, { error }) => ({
      ...state,
      isOpened: true,
      message: {
        title: error.code,
        description: error.message,
      },
    }),
  )
  .cases(
    [createAttendance.async.failed, updateAttendance.async.failed, removeAttendance.async.failed],
    (state, { error }) => ({
      ...state,
      isOpened: true,
      message: {
        title: error.code,
        description: error.message,
      },
    }),
  )
  .cases([fetchCovid.async.failed, createCovid.async.failed], (state, { error }) => ({
    ...state,
    isOpened: true,
    message: {
      title: error.code,
      description: error.message,
    },
  }))
  .cases(
    [createEvent.async.failed, updateEvent.async.failed, removeEvent.async.failed],
    (state, { error }) => ({
      ...state,
      isOpened: true,
      message: {
        title: error.code,
        description: error.message,
      },
    }),
  )
  .cases(
    [
      updatePart.async.failed,
      updatePractice.async.failed,
      updateProgram.async.failed,
      updateRole.async.failed,
    ],
    (state, { error }) => ({
      ...state,
      isOpened: true,
      message: {
        title: error.code,
        description: error.message,
      },
    }),
  );
export default reducer;

// selector
export const selectDialogIsOpened = createSelector(
  [(state: RootState) => state.ui.dialog.isOpened],
  (isOpened) => isOpened,
);
export const selectDialogMessage = createSelector(
  [(state: RootState) => state.ui.dialog.message],
  (message) => message,
);
