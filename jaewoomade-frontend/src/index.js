import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import Root from './Root';
import * as socialAuth from './lib/socialAuth';
import registerServiceWorker from './registerServiceWorker';

window.socialAuth = socialAuth;

const render = window.__REDUX_STATE__ ? ReactDOM.hydrate : ReactDOM.render;

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
