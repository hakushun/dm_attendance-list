import './lib/service-worker';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './redux/createStore';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app'),
);
