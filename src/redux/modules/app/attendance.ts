import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from '../reducers';
import { Event } from './event';

export type AttendanceType = 'presence' | 'undecided' | 'absence';
export type AttendanceItem = {
  dateId: string;
  attendance: AttendanceType;
  remark: string;
};
export type Occupation = '' | 'student' | 'working' | 'extra';
export type Attendance = {
  userId: string;
  occupation: Occupation;
  name: string;
  part: string;
  attendances: AttendanceItem[];
  comment: string;
};
type ChangeAttendancePayload = {
  userId: string;
} & Partial<Attendance>;
type ChangeAttendanceItemPayload = {
  dateId: string;
} & Partial<AttendanceItem>;
// action
const actionCreator = actionCreatorFactory();

export const initiateAttendance = actionCreator<Event>('INITIATE_ATTENDANCE');
export const changeAttendance = actionCreator<ChangeAttendancePayload>('CHANGE_ATTENDANCE');
export const changeAttendanceItem =
  actionCreator<ChangeAttendanceItemPayload>('CHANGE_ATTENDANCE_ITEM');
export const focusAttendance = actionCreator<Attendance>('FOCUS_ATTENDANCE');

// initial state
const INITIAL_STATE: Attendance = {
  userId: '',
  occupation: '',
  name: '',
  part: '',
  attendances: [],
  comment: '',
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(initiateAttendance, (_state, payload) => ({
    ...INITIAL_STATE,
    attendances: payload.dates.map((date) => ({
      dateId: date.id,
      attendance: 'presence' as AttendanceType,
      remark: '',
    })),
  }))
  .case(changeAttendance, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(changeAttendanceItem, (state, payload) => ({
    ...state,
    attendances: [
      ...state.attendances.map((attend) =>
        attend.dateId === payload.dateId ? { ...attend, ...payload } : attend,
      ),
    ],
  }))
  .case(focusAttendance, (_state, payload) => ({
    ...payload,
  }));
export default reducer;

// selector
export const selectAttendance = createSelector(
  [(state: RootState) => state.app.attendance],
  (attendance) => attendance,
);
