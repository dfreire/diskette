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
import 'text-spinners/spinners.css';
import './index.css';

if (window.location.href.indexOf('localhost:3051') >= 0) {
  window.location.href = 'http://localhost:3050/';
} else {
  Modal.setAppElement('#root');

  const store = init({ models });
  const { dispatch } = store;
  dispatch['ui'].loadMessages().then(() => {
    document.title = store.getState().ui.messages.title;

    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root') as HTMLElement,
    );
  });

  registerServiceWorker();
}
