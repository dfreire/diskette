import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import registerServiceWorker from './registerServiceWorker';
import * as Modal from 'react-modal';
import * as models from './models';
import App from './App';
import 'tailwindcss/dist/tailwind.min.css';
import './index.css';

const store = init({ models });

Modal.setAppElement('#root');

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);

registerServiceWorker();
