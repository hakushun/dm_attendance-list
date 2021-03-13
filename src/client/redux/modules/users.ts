import actionCreatorFactory from 'typescript-fsa';
import { StepAction, steps } from 'redux-effects-steps';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { User } from './user';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import {
	deleteUser,
	postUser,
	putRoles,
	putUser,
} from '../../lib/utilFunctions';

export type Users = {
	eventId: number;
	users: User[];
};
export type CreatePayload = {
	user: User;
	eventId: number;
};
export type UpdatePayload = {
	user: User;
	eventId: number;
};
export type RplePayload = {
	users: User[];
	eventId: number;
};
export type DeletePayload = {
	userId: number;
	eventId: number;
};
type Error = {
	code: string;
	message: string;
};

const actionCreator = actionCreatorFactory();

export const getUsers = actionCreator<Users[]>('get_users');
export const createUsersAcitions = actionCreator.async<
	CreatePayload,
	null,
	Error
>('create_users');
export const createUsers = (body: CreatePayload): StepAction =>
	steps(createUsersAcitions.started(body), () => postUser(body), [
		({ data }) => createUsersAcitions.done({ params: body, result: data }),
		({ code, message }) =>
			createUsersAcitions.failed({
				params: body,
				error: { code, message },
			}),
	]);
export const updateUsersAcitions = actionCreator.async<
	UpdatePayload,
	null,
	Error
>('update_users');
export const updateUsers = (body: UpdatePayload): StepAction =>
	steps(updateUsersAcitions.started(body), () => putUser(body), [
		({ data }) => updateUsersAcitions.done({ params: body, result: data }),
		({ code, message }) =>
			updateUsersAcitions.failed({
				params: body,
				error: { code, message },
			}),
	]);
export const updateRolesAcitions = actionCreator.async<
	RplePayload,
	null,
	Error
>('update_roles');
export const updateRoles = (body: RplePayload): StepAction =>
	steps(updateRolesAcitions.started(body), () => putRoles(body), [
		({ data }) => updateRolesAcitions.done({ params: body, result: data }),
		({ code, message }) =>
			updateRolesAcitions.failed({
				params: body,
				error: { code, message },
			}),
	]);
export const deleteUserActoins = actionCreator.async<
	DeletePayload,
	null,
	Error
>('delete_user');
export const deleteUsers = (body: DeletePayload): StepAction =>
	steps(deleteUserActoins.started(body), () => deleteUser(body), [
		({ data }) => deleteUserActoins.done({ params: body, result: data }),
		({ code, message }) =>
			deleteUserActoins.failed({
				params: body,
				error: { code, message },
			}),
	]);

const initialState: {
	users: Users[];
	isLoading: boolean;
} = {
	users: [],
	isLoading: false,
};

const reducer = reducerWithInitialState(initialState)
	.case(getUsers, (state, payload) => ({
		...state,
		users: [...payload],
	}))
	.case(createUsersAcitions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(createUsersAcitions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(createUsersAcitions.failed, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updateUsersAcitions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(updateUsersAcitions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updateUsersAcitions.failed, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updateRolesAcitions.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(updateRolesAcitions.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(updateRolesAcitions.failed, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(deleteUserActoins.started, (state) => ({
		...state,
		isLoading: true,
	}))
	.case(deleteUserActoins.done, (state) => ({
		...state,
		isLoading: false,
	}))
	.case(deleteUserActoins.failed, (state) => ({
		...state,
		isLoading: false,
	}));

export default reducer;

export const selectUsers = createSelector(
	[
		(state: RootState) => state.users.users,
		(state: RootState) => state.event,
	],
	(users, event) => {
		const newUsers = users.find((user) => user.eventId === event.id);
		if (newUsers) {
			return newUsers.users;
		}
		return [];
	},
);

export const selectUsersIsLoading = createSelector(
	[(state: RootState) => state.users.isLoading],
	(isLoading) => isLoading,
);
