import axios from './axios';

const ENVIRONMENT = Language
const API = '/'  //  api/
const API2 = 'https://orders.proscenic.com'  //  api/

const tenement = "WhWft7s5Pq2K"

export const getAxios =  (url,data)=> axios(url,data,"GET");
export const postAxios = (url,data,header={})=> axios(url,data,"POST",header);

// header
export const $shopList = ()=> postAxios(`${API}${ENVIRONMENT}/mall/category/query/list`,{},{ tenement })

// index
export const index ={
    topCarousel : ()=> getAxios(`${API}${ENVIRONMENT}/mall/adb/list/top/10?mobile=true`), // 头部轮播图
}


/*
  axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
 */

/*
 axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 */