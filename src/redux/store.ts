import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/reducers';

const bindMiddleware = (middleware: Middleware[]) =>
  composeWithDevTools(applyMiddleware(...middleware));

export const initStore = (): Store => createStore(rootReducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper(initStore);
