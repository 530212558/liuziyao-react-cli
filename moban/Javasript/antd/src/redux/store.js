/*
    redux 最核心的 store 对象模块
*/
import {createStore, applyMiddleware} from 'redux'  // applyMiddleware 是包括使用异步 创建Store对象
import thunk from 'redux-thunk' /* redux的使用异步函数 */
import {composeWithDevTools} from 'redux-devtools-extension'    //调试工具函数
import reducers from './reducers'
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))