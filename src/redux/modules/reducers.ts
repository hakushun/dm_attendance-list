import { combineReducers } from 'redux';
import attendance from './app/attendance';
import attendances from './domain/attendances';
import covid from './app/covid';
import covids from './domain/covids';
import dialog from './ui/dialog';
import event from './app/event';
import events from './domain/events';
import locations from './app/locations';
import part from './app/part';
import parts from './domain/parts';
import plans from './app/plans';
import practice from './domain/practice';
import program from './app/program';
import programs from './domain/programs';
import remarks from './app/remarks';
import role from './app/role';
import roles from './domain/roles';
import user from './app/user';
import modal from './ui/modal';
import show from './ui/show';
import sign from './app/sign';
import tab from './ui/tab';

const rootReducer = combineReducers({
  domain: combineReducers({
    attendances,
    covids,
    events,
    parts,
    practice,
    programs,
    roles,
  }),
  app: combineReducers({
    attendance,
    covid,
    event,
    locations,
    part,
    plans,
    program,
    remarks,
    role,
    sign,
    user,
  }),
  ui: combineReducers({ dialog, modal, show, tab }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
