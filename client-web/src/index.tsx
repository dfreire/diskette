import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import { BrowserRouter } from 'react-router-dom';
import * as models from './models';
import App from './App';
import './index.css';

const store = init({ models });

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
