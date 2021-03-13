import { combineReducers } from 'redux';
import {
	eventFormIsShown,
	attendanceFormIsShown,
	settingFormIsShown,
	modalIsShown,
	covidFormIsShown,
	covidTableIsShown,
} from './boolean';
import parts from './parts';
import event from './event';
import user from './user';
import users from './users';
import events from './events';
import attendance from './attendance';
import currentUser from './currentUser';
import covids from './covids';

const rootReducer = combineReducers({
	eventFormIsShown,
	attendanceFormIsShown,
	settingFormIsShown,
	modalIsShown,
	covidFormIsShown,
	covidTableIsShown,
	parts,
	event,
	user,
	users,
	events,
	attendance,
	currentUser,
	covids,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
