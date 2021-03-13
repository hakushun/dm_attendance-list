import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const setCurrentUser = actionCreator<string>('set_current_user');

const initialState: { currentUser: string } = {
	currentUser: '',
};

const reducer = reducerWithInitialState(initialState).case(
	setCurrentUser,
	(_state, payload) => ({
		currentUser: payload,
	}),
);

export default reducer;

export const selectCurrentUser = createSelector(
	[(state: RootState) => state.currentUser.currentUser],
	(currentUser) => currentUser,
);
