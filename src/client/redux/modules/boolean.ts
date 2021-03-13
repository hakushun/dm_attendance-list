/* eslint-disable no-shadow */
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { initiateUser } from './user';
import {
	createEventActions,
	removeEventActions,
	updateEventsActions,
} from './events';
import { initiateEvent, updateEvent } from './event';
import { updatePartsActions } from './parts';
import { toggleAriaHidden, toggleScrollLock } from '../../lib/utilFunctions';
import { updateCovidsAcitions } from './covids';
import {
	createUsersAcitions,
	deleteUserActoins,
	updateRolesAcitions,
	updateUsersAcitions,
} from './users';

const actionCreator = actionCreatorFactory();

export const toggleEventFormIsShown = actionCreator<boolean>(
	'toggle_eventFormIsShown',
);
export const toggleAttendanceFormIsShown = actionCreator<boolean>(
	'toggle_attendanceFormIsShown',
);
export const toggleSettingFormIsShown = actionCreator<boolean>(
	'toggle_settingFormIsShown',
);
export const toggleModalIsShown = actionCreator<boolean>('toggle_modalIsShown');
export const toggleCovidFormIsShown = actionCreator<boolean>(
	'toggle_covidFormIsShown',
);
export const toggleCovidTableIsShown = actionCreator<boolean>(
	'toggle_covidTableIsShown',
);

const initialState = false;

export const eventFormIsShown = reducerWithInitialState(initialState)
	.case(toggleEventFormIsShown, (_state, payload) => payload)
	.case(updateEvent, () => false)
	.case(createEventActions.done, () => false)
	.case(createEventActions.failed, () => false)
	.case(updateEventsActions.done, () => false)
	.case(updateEventsActions.failed, () => false)
	.case(removeEventActions.done, () => false)
	.case(removeEventActions.failed, () => false)
	.case(initiateEvent, (state) => !state);
export const attendanceFormIsShown = reducerWithInitialState(initialState)
	.case(toggleAttendanceFormIsShown, (_state, payload) => payload)
	.case(initiateUser, (state) => !state)
	.case(createUsersAcitions.done, () => false)
	.case(createUsersAcitions.failed, () => false)
	.case(updateUsersAcitions.done, () => false)
	.case(updateUsersAcitions.failed, () => false)
	.case(deleteUserActoins.done, () => false)
	.case(deleteUserActoins.failed, () => false);
export const settingFormIsShown = reducerWithInitialState(initialState)
	.case(toggleSettingFormIsShown, (_state, payload) => payload)
	.case(updatePartsActions.done, () => false)
	.case(updatePartsActions.failed, () => false)
	.case(updateEvent, () => false)
	.case(updateRolesAcitions.done, () => false)
	.case(updateRolesAcitions.failed, () => false)
	.case(updateEventsActions.done, () => false)
	.case(updateEventsActions.failed, () => false);
export const modalIsShown = reducerWithInitialState(initialState).case(
	toggleModalIsShown,
	(_state, payload) => {
		toggleAriaHidden(payload);
		toggleScrollLock(payload);
		return payload;
	},
);
export const covidFormIsShown = reducerWithInitialState(initialState)
	.case(toggleCovidFormIsShown, (_state, payload) => payload)
	.case(updateCovidsAcitions.done, () => false)
	.case(updateCovidsAcitions.failed, () => false);
export const covidTableIsShown = reducerWithInitialState(initialState).case(
	toggleCovidTableIsShown,
	(_state, payload) => payload,
);

export const selectEventFormIsShown = createSelector(
	[(state: RootState) => state.eventFormIsShown],
	(eventFormIsShown) => eventFormIsShown,
);
export const selectAttendanceFormIsShown = createSelector(
	[(state: RootState) => state.attendanceFormIsShown],
	(attendanceFormIsShown) => attendanceFormIsShown,
);
export const selectSettingFormIsShown = createSelector(
	[(state: RootState) => state.settingFormIsShown],
	(settingFormIsShown) => settingFormIsShown,
);
export const selectModalIsShown = createSelector(
	[(state: RootState) => state.modalIsShown],
	(modalIsShown) => modalIsShown,
);
export const selectCovidFormIsShown = createSelector(
	[(state: RootState) => state.covidFormIsShown],
	(covidFormIsShown) => covidFormIsShown,
);
export const selectCovidTableIsShown = createSelector(
	[(state: RootState) => state.covidTableIsShown],
	(covidTableIsShown) => covidTableIsShown,
);
