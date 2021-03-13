import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Event, updateEvent } from './event';

const actionCreator = actionCreatorFactory();

type ChangePayload = {
	name: string;
	value: string | string[];
};
export interface User {
	id: number;
	part: string;
	name: string;
	attendances: string[];
	remarks: string[];
	comment: string;
	role: { [s: string]: string };
}

export const changeUser = actionCreator<ChangePayload>('change_user');
export const updateUser = actionCreator<User>('update_user');
export const initiateUser = actionCreator<Event>('initiate_user');

export const initialState: User = {
	id: 0,
	part: '',
	name: '',
	attendances: [''],
	remarks: [''],
	comment: '',
	role: {},
};

const reducer = reducerWithInitialState(initialState)
	.case(changeUser, (state, payload) => ({
		...state,
		[payload.name]: payload.value,
	}))
	.case(updateUser, (_state, payload) => ({
		...payload,
	}))
	.case(initiateUser, (_state, paylaod) => {
		let i: number;
		const attendances: string[] = [];
		const remarks: string[] = [];
		for (i = 0; i < paylaod.days.length; i += 1) {
			attendances.push('○');
			remarks.push('');
		}
		return { ...initialState, attendances, remarks };
	})
	.case(updateEvent, (_state, paylaod) => {
		let i: number;
		const attendances: string[] = [];
		const remarks: string[] = [];
		for (i = 0; i < paylaod.days.length; i += 1) {
			attendances.push('○');
			remarks.push('');
		}
		return { ...initialState, attendances, remarks };
	});

export default reducer;

export const selectUser = createSelector(
	[(state: RootState) => state.user],
	(user) => user,
);
