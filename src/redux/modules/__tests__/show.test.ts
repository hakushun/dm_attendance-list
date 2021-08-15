/* eslint-disable no-undefined */
import reducer, {
  closeAll,
  selectAttendanceFormIsShown,
  selectCovidFormIsShown,
  selectEventFormIsShown,
  selectSettingIsShown,
  toggleAttendanceForm,
  toggleCovidForm,
  toggleEventForm,
  toggleSetting,
} from '../ui/show';
import {
  create as createAttendance,
  remove as removeAttendance,
  update as updateAttendance,
} from '../domain/attendances';
import {
  create as createEvent,
  remove as removeEvent,
  update as updateEvent,
} from '../domain/events';
import { Attendance, focusAttendance, initiateAttendance } from '../app/attendance';
import { create as createCovid } from '../domain/covids';
import { update as updatePart } from '../domain/parts';
import { update as updatePractice } from '../domain/practice';
import { update as updateProgram } from '../domain/programs';
import { update as updateRole } from '../domain/roles';
import { initiateCovid } from '../app/covid';
import { initialState } from './_initialState';

// reducer
describe('Reducer: show', () => {
  const attendance: Attendance = {
    userId: '123',
    occupation: 'working',
    name: 'name',
    part: 'part',
    attendances: [],
    comment: '',
  };
  const attendancePayload = {
    eventId: '12345',
    attendance,
  };
  const createEventPayload = {
    title: '',
    detail: '',
    dates: [],
  };
  const event = {
    id: '',
    title: '',
    detail: '',
    dates: [],
  };
  const updateEventPayload = { ...event };
  const removeEventPayload = { ...event };
  const focusAttendancePayload = { ...attendance };
  const initiateAttendancePaylaod = { ...event };
  const createCovidPayload = {
    eventId: '',
    covid: {
      userId: '',
      dateId: '',
      answers: {},
    },
    timestamp: 0,
  };
  const updatePartPayload = {
    event,
    part: [],
  };
  const updatePracticePayload = {
    event,
    practice: {
      locations: [],
      plans: [],
      remarks: [],
    },
  };
  const updateProgramPayload = {
    event,
    program: [],
  };
  const updateRolePayload = {
    eventId: '',
    roles: [],
  };
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: toggleEventForm', () => {
    const action = toggleEventForm();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: true,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: toggleCovidForm', () => {
    const action = toggleCovidForm(true);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: true,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: toggleAttendanceForm', () => {
    const action = toggleAttendanceForm(true);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: true,
      setting: false,
    });
  });
  it('Action: toggleSetting', () => {
    const action = toggleSetting(true);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: true,
    });
  });
  it('Action: closeAll', () => {
    const action = closeAll();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: createEvent.async.done', () => {
    const action = createEvent.async.done({ params: createEventPayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: updateEvent.async.done', () => {
    const action = updateEvent.async.done({ params: updateEventPayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: removeEvent.async.done', () => {
    const action = removeEvent.async.done({ params: removeEventPayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: createAttendance.async.done', () => {
    const action = createAttendance.async.done({ params: attendancePayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: updateAttendance.async.done', () => {
    const action = updateAttendance.async.done({ params: attendancePayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: removeAttendance.async.done', () => {
    const action = removeAttendance.async.done({ params: attendancePayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: focusAttendance', () => {
    const action = focusAttendance(focusAttendancePayload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: true,
      setting: false,
    });
  });
  it('Action: initiateAttendance', () => {
    const action = initiateAttendance(initiateAttendancePaylaod);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: true,
      setting: false,
    });
  });
  it('Action: initiateCovid', () => {
    const action = initiateCovid();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: true,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: updatePractice.async.done', () => {
    const action = updatePractice.async.done({ params: updatePracticePayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: updateRole.async.done', () => {
    const action = updateRole.async.done({ params: updateRolePayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: updatePart.async.done', () => {
    const action = updatePart.async.done({ params: updatePartPayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: updateProgram.async.done', () => {
    const action = updateProgram.async.done({ params: updateProgramPayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
  it('Action: createCovid.async.done', () => {
    const action = createCovid.async.done({ params: createCovidPayload, result: null });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    });
  });
});

// selector
describe('Selector: show', () => {
  it('selectEventFormIsShown', () => {
    const result = false;
    expect(result).toEqual(selectEventFormIsShown(initialState));
  });
  it('selectCovidFormIsShown', () => {
    const result = false;
    expect(result).toEqual(selectCovidFormIsShown(initialState));
  });
  it('selectAttendanceFormIsShown', () => {
    const result = false;
    expect(result).toEqual(selectAttendanceFormIsShown(initialState));
  });
  it('selectSettingIsShown', () => {
    const result = false;
    expect(result).toEqual(selectSettingIsShown(initialState));
  });
});
