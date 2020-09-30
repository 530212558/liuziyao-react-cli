
/*  包含 n 个根据老的 state 和 action 返回新的 state 的函数的模块  */
import {combineReducers} from 'redux'
import {
    NEWS_USER,
} from './action-types'
const initUser = {
    username: '', // 用户名
    type: '', // 类型
    msg: '', // 错误提示信息
    news:['1'],    //聊天信息
}
function user(state = initUser, action) {
    switch (action.type) {
        case NEWS_USER: // 重置用户信息
            return {...state, news:action.data}
        default:
            return state
    }
}

const initUserList = []
function userList(state = initUserList, action) {
    switch (action.type) {
        case NEWS_USER:
            return action.data
        default:
            return state
    }
}


// 返回合并的 reducer
export default combineReducers({
    user,
    userList,
})
