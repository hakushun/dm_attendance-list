import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { updateRole } from '../../../libs/firestore/crudRole';
import { RootState } from '../reducers';
import { RoleItem } from '../app/role';

export type Roles = {
  roles: RoleItem[];
  isLoading: boolean;
};
export type UpdatePayload = {
  eventId: string;
  roles: RoleItem[];
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Roles>(actionCreator);

export const subscribeRoles = actionCreator<RoleItem[]>('SUBSCRIBE_ROLES');
export const update = asyncActionCreator<UpdatePayload, void, CustomError>(
  'UPDATE_ROLE',
  async (payload) => {
    await updateRole(payload);
  },
);
// initial state
const INITIAL_STATE: Roles = {
  roles: [],
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(subscribeRoles, (state, payload) => ({
    ...state,
    roles: payload,
  }))
  .case(update.async.started, (state) => ({
    ...state,
    isLoading: true,
  }))
  .case(update.async.done, (state) => ({
    ...state,
    isLoading: false,
  }))
  .case(update.async.failed, (state) => ({
    ...state,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectRoles = createSelector(
  [(state: RootState) => state.domain.roles.roles],
  (roles) => roles,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.roles.isLoading],
  (isLoading) => isLoading,
);
