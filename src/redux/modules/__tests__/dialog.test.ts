/* eslint-disable no-undefined */
import reducer, { selectDialogIsOpened, selectDialogMessage, toggle } from '../ui/dialog';
import { resetPassword, signIn, signOut, signUp } from '../app/sign';
import {
  create as createAttendance,
  CrudPayload,
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
import { initialState } from './_initialState';

// reducer
describe('Reducer: dialog', () => {
  const error = {
    name: 'error',
    code: 'Invalid',
    message: 'This is a critical error.',
  };
  const signPayload = {
    email: '',
    password: '',
  };
  const attendancePayload: CrudPayload = {
    eventId: '12345',
    attendance: {
      userId: '123',
      occupation: 'working',
      name: 'name',
      part: 'part',
      attendances: [],
      comment: '',
    },
  };
  const fetchCovidPayload = {
    eventId: '',
    dateId: '',
  };
  const createCovidPayload = {
    eventId: '',
    covid: {
      userId: '',
      dateId: '',
      answers: {},
    },
    timestamp: 0,
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
      isOpened: false,
      message: {
        title: '',
        description: '',
      },
    });
  });
  it('Action: toggle', () => {
    const action = toggle(true);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: '',
        description: '',
      },
    });
  });
  it('Action: signUp.async.failed', () => {
    const action = signUp.async.failed({ params: signPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: signIn.async.failed', () => {
    const action = signIn.async.failed({ params: signPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: signOut.async.failed', () => {
    const action = signOut.async.failed({ params: undefined, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: resetPassword.async.failed', () => {
    const action = resetPassword.async.failed({ params: { email: '' }, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: createAttendance.async.failed', () => {
    const action = createAttendance.async.failed({ params: attendancePayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: updateAttendance.async.failed', () => {
    const action = updateAttendance.async.failed({ params: attendancePayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: removeAttendance.async.failed', () => {
    const action = removeAttendance.async.failed({ params: attendancePayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: fetchCovid.async.failed', () => {
    const action = fetchCovid.async.failed({ params: fetchCovidPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: createCovid.async.failed', () => {
    const action = createCovid.async.failed({ params: createCovidPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: createEvent.async.failed', () => {
    const action = createEvent.async.failed({ params: createEventPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: updateEvent.async.failed', () => {
    const action = updateEvent.async.failed({ params: updateEventPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: removeEvent.async.failed', () => {
    const action = removeEvent.async.failed({ params: removeEventPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: updatePart.async.failed', () => {
    const action = updatePart.async.failed({ params: updatePartPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: updatePractice.async.failed', () => {
    const action = updatePractice.async.failed({ params: updatePracticePayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: updateProgram.async.failed', () => {
    const action = updateProgram.async.failed({ params: updateProgramPayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
  it('Action: updateRole.async.failed', () => {
    const action = updateRole.async.failed({ params: updateRolePayload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      isOpened: true,
      message: {
        title: 'Invalid',
        description: 'This is a critical error.',
      },
    });
  });
});

// selector
describe('Selector: dialog', () => {
  it('selectDialogIsOpened', () => {
    const result = false;
    expect(result).toEqual(selectDialogIsOpened(initialState));
  });
  it('selectDialogMessage', () => {
    const result = {
      title: '',
      description: '',
    };
    expect(result).toEqual(selectDialogMessage(initialState));
  });
});
