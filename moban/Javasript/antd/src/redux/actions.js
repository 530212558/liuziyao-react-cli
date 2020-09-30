/*
    包含所有 action creator 函数的模块
*/
import {
    NEWS_USER,
} from './action-types'
export const userNews = (news)=> ({type:NEWS_USER,data:news})
/*  异步获取用户聊天信息  */
export const USERNEWS = () => {
    return (dispatch)=> {
        // const response = await news({to,from,InUpdate})
        // const result = response.data
        // if (result.code === 0) {
        //     await dispatch(userNews(result.data))    //
        //     await getChatMsgList(dispatch)
        // }
        console.log(123);
    }
}