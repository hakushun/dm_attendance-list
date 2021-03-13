import { createStore, compose, applyMiddleware } from 'redux';
import stepsMiddleware from 'redux-effects-steps';
import rootReducer from './modules/reducers';

interface ExtendedWindow extends Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare const window: ExtendedWindow;

const composeReduxDevToolsEnhancers =
	(typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

export const store = createStore(
	rootReducer,
	composeReduxDevToolsEnhancers(applyMiddleware(stepsMiddleware)),
);
