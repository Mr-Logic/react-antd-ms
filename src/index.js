import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IRouter from './router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IRouter />, document.getElementById('root'));
registerServiceWorker();
