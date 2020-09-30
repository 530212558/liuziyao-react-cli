
/*
    使用 axios 封装的 ajax 请求函数
    函数返回的是 promise 对象
*/

import axios from 'axios';
import { LoginOut } from '@/redux/actions';

const HTTP = axios.create()
// HTTP.defaults.headers.common['LIUZIYAO'] = "WANGSHENG"; //  设置全局headers请求头
// 添加请求拦截器
HTTP.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log( window.location,window.location.href )
    // config.headers['LIUZIYAO'] = "WANGSHENG";   设置请求头
    // console.log( config )
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
HTTP.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log( response,response.request.responseURL )
    // if( response.data.code==-101 ){
    //     // console.log( response )
    //     LoginOut();
    //     window.location.reload();
    // }
    return response;
}, function (error) {
    // 对响应错误做点什么
    // console.log( error )
    return Promise.reject(error);
});

export default function http(url = '',data={},type="GET",header) {
    // 准备 url query 参数数据
    let dataStr = '' //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))  //把最后一个字符串&字符去掉
        url = url + '?' + dataStr
    }
    // 发送 get 请求
    if (type === 'GET') {
        return HTTP.get(url)
    } else {
        // 发送 post 请求
        return HTTP.post(url, data, {headers: {
                'tenement': 'WhWft7s5Pq2K',
                // 'Content-Type':'application/x-www-form-urlencoded'
                // 'uid':'6bfc7221-1897-4554-a10c-98e8aaa8275f',
                // 'tourist':false, //  是否是游客购物车
                ...header
            }}
        )
    }
}



/*
    执行多个并发请求

    function getUserAccount() {
        return axios.get('/user/12345');
    }
    function getUserPermissions() {
        return axios.get('/user/12345/permissions');
    }
    axios.all([getUserAccount(), getUserPermissions()]).then(axios.spread(function (acct, perms) {
        // 两个请求现在都执行完成
    }));
*/

/*
     创建实例
    可以使用自定义配置新建一个 axios 实例

    axios.create([config])
    var instance = axios.create({
      baseURL: 'https://some-domain.com/api/',  `baseURL` 将自动加在 请求的`url` 前面
      timeout: 1000, // `timeout` 指定请求超时的毫秒数(0 表示无超时时间) 如果请求花费了超过 `timeout` 的时间，请求将被中断
      headers: {'X-Custom-Header': 'foobar'}
    });
*/

/*
   全局的 axios 默认值
    axios.defaults.baseURL = 'https://api.example.com';     //  baseURL` 将自动加在 请求的`url` 前面
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;    //  请求头
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  //  请求方式
*/

/*
    配置的优先顺序

    配置会以一个优先顺序进行合并。这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，
    最后是请求的 config 参数。后者将优先于前者。这里是一个例子：

    // 使用由库提供的配置的默认值来创建实例
    // 此时超时配置的默认值是 `0`
    var instance = axios.create();

    // 覆写库的超时默认值
    // 现在，在超时前，所有请求都会等待 2.5 秒
    instance.defaults.timeout = 2500;

    // 为已知需要花费很长时间的请求覆写超时设置
    instance.get('/longRequest', {
      timeout: 5000
    });
*/

/*
    拦截器
    在请求或响应被 then 或 catch 处理前拦截它们。

    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      });
*/
