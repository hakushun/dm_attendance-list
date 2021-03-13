import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

type UpdatePayload = {
	currentTarget: HTMLElement;
	target: HTMLElement;
};
export const updateAttendance = actionCreator<UpdatePayload>(
	'update_attendance',
);

export interface Attendance {
	index: number;
	date: string;
	attend: number;
	pending: number;
	respondent: number;
}

const initialState: Attendance = {
	index: 0,
	date: '',
	attend: 0,
	pending: 0,
	respondent: 0,
};

const reducer = reducerWithInitialState(initialState).case(
	updateAttendance,
	(state, payload) => {
		const index = parseInt(
			payload.currentTarget.getAttribute('data-js')!.split('-')[1],
		);
		const attendances = Array.from(
			document.querySelectorAll(`[data-count=attendance-${index}]`),
		);
		const attend = attendances.filter(
			(attendance) => attendance.textContent === '○',
		);
		const pending = attendances.filter(
			(attendance) => attendance.textContent === '△',
		);
		const respondent = attendances.filter(
			(attendance) => !(attendance.textContent === '未回答'),
		);
		return {
			...state,
			index,
			date: payload.target.textContent!,
			attend: attend.length,
			pending: pending.length,
			respondent: respondent.length,
		};
	},
);

export default reducer;

export const selectAttendance = createSelector(
	[(state: RootState) => state.attendance],
	(attendance) => attendance,
);
