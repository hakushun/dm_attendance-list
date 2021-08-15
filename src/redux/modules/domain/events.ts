import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { RootState } from '../reducers';
import { Event, Date } from '../app/event';
import { createEvent, removeEvent, updateEvent } from '../../../libs/firestore/crudEvent';
import { createPractice } from '../../../libs/firestore/crudPractice';
import { createProgram } from '../../../libs/firestore/crudProgram';
import { createPart } from '../../../libs/firestore/crudPart';
import { createRole } from '../../../libs/firestore/crudRole';

export type Events = {
  events: Event[];
  isLoading: boolean;
};
export type CreatePayload = {
  title: string;
  detail: string;
  dates: Date[];
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Events>(actionCreator);

export const subscribeEvents = actionCreator<Event[]>('SUBSCRIBE_EVENTS');
export const create = asyncActionCreator<CreatePayload, Event | null, CustomError>(
  'CREATE_EVENT',
  async (payload) => {
    const result = await createEvent(payload);
    await createPractice(result);
    await createProgram(result);
    await createPart(result);
    await createRole(result);
    return result;
  },
);
export const update = asyncActionCreator<Event, Event | null, CustomError>(
  'UPDATE_EVENT',
  async (payload) => {
    const result = await updateEvent(payload);
    return result;
  },
);
export const remove = asyncActionCreator<Event, void, CustomError>(
  'REMOVE_EVENT',
  async (payload) => {
    await removeEvent(payload);
  },
);
// initial state
const INITIAL_STATE: Events = {
  events: [],
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(subscribeEvents, (state, payload) => ({
    ...state,
    events: payload,
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
export const selectEvents = createSelector(
  [(state: RootState) => state.domain.events.events],
  (events) => events,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.events.isLoading],
  (isLoading) => isLoading,
);
