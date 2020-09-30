
/* 可以使用新的内置插件状Promise或WeakMap静态方法，如Array.from或Object.assign，实例方法一样Array.prototype.includes */
// let babelpolyfill = babelPolyfill // require('@babel/polyfill')

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';
import './public/reset.css';

ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'));









