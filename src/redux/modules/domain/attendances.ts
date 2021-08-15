import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { RootState } from '../reducers';
import { Attendance } from '../app/attendance';
import {
  createAttendance,
  removeAttendance,
  updateAttendance,
} from '../../../libs/firestore/crudAttendance';

export type Attendances = {
  attendances: Attendance[];
  isLoading: boolean;
};
export type CrudPayload = {
  eventId: string;
  attendance: Attendance;
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Attendances>(actionCreator);

export const subscribeAtendances = actionCreator<Attendance[]>('SUBSCRIBE_ATTENDANCES');
export const create = asyncActionCreator<CrudPayload, void, CustomError>(
  'CREATE_ATTENDANCE',
  async (payload) => {
    await createAttendance(payload);
  },
);
export const update = asyncActionCreator<CrudPayload, void, CustomError>(
  'UPDATE_ATTENDANCE',
  async (payload) => {
    await updateAttendance(payload);
  },
);
export const remove = asyncActionCreator<CrudPayload, void, CustomError>(
  'REMOVE_ATTENDANCE',
  async (payload) => {
    await removeAttendance(payload);
  },
);
// initial state
const INITIAL_STATE: Attendances = {
  attendances: [],
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(subscribeAtendances, (state, payload) => ({
    ...state,
    attendances: payload,
  }))
  .cases([create.async.started, update.async.started, remove.async.started], (state) => ({
    ...state,
    isLoading: true,
  }))
  .cases([create.async.done, update.async.done, remove.async.done], (state) => ({
    ...state,
    isLoading: false,
  }))
  .cases([create.async.failed, update.async.failed, remove.async.failed], (state) => ({
    ...state,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectAttendances = createSelector(
  [
    (state: RootState) => state.domain.attendances.attendances,
    (state: RootState) => state.domain.parts.parts,
  ],
  (attendances, parts) => {
    const newArray: Attendance[] = [];
    parts.forEach((part) => {
      attendances.forEach((attendance) => {
        part.name === attendance.part && newArray.push(attendance);
      });
    });
    return newArray;
  },
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.attendances.isLoading],
  (isLoading) => isLoading,
);
export const selectBreakdownAttendances = createSelector(
  [
    (state: RootState) => state.domain.attendances.attendances,
    (state: RootState) => state.domain.practice.dateId,
  ],
  (attendances, dateId) => {
    const presence = attendances.filter((attendance) =>
      attendance.attendances.some(
        (item) => item.dateId === dateId && item.attendance === 'presence',
      ),
    );
    const undecided = attendances.filter((attendance) =>
      attendance.attendances.some(
        (item) => item.dateId === dateId && item.attendance === 'undecided',
      ),
    );
    const absence = attendances.filter((attendance) =>
      attendance.attendances.some(
        (item) => item.dateId === dateId && item.attendance === 'absence',
      ),
    );
    return { presence, undecided, absence };
  },
);
