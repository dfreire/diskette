import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'tailwindcss/dist/tailwind.min.css';
import './index.css';
import App from './js/App';

export default App

if (typeof document !== 'undefined') {
	const renderMethod = module['hot'] ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render;
	const render = Comp => {
		renderMethod(<Comp />, document.getElementById('root'));
	}
	render(App);
}
