import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { subscribePractice } from '../domain/practice';
import { RootState } from '../reducers';

export type Location = {
  dateId: string;
  name1?: string;
  name2?: string;
  url?: string;
};
type Locations = {
  locations: Location[];
};
type ChangePayload = Partial<Location>;
// action
const actionCreator = actionCreatorFactory();

export const changeLocation = actionCreator<ChangePayload>('CHANGE_LOCATION');

// initial state
const INITIAL_STATE: Locations = {
  locations: [],
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(changeLocation, (state, payload) => ({
    locations: state.locations.map((location) =>
      location.dateId === payload.dateId ? { ...location, ...payload } : location,
    ),
  }))
  .case(subscribePractice, (_state, payload) => ({
    locations: payload.locations,
  }));
export default reducer;

// selector
export const selectLocations = createSelector(
  [(state: RootState) => state.app.locations.locations],
  (locations) => locations,
);
