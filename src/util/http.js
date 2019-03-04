
import axios from 'axios'
import * as auth from './auth.js'
//axios.defaults.withCredentials=true;

import {setCookie, getCookie, delCookie } from '@/util/cookie'
let token = getCookie('USERTOKEN');

const myAxios = axios.create({
    baseURL:'/api' ,
    timeout:60*1000000000,
    headers: {'token':token},
    validateStatus: function (status) {
        return status < 500; 
    }
});


/*
let needLoadingRequestCount = 0

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}
*/

// // 添加请求拦截器
// myAxios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
// 
// // 添加响应拦截器
// myAxios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
// 
// //    if(response.status === 401 || response.status === 403){
// //         MessageBox.confirm('登录认证超时过期，重新登录吗？', '提示', {
// //             confirmButtonText: '确定',
// //             cancelButtonText: '取消',
// //             type: 'warning'
// //         }).then(() => {
// //             localStorage.removeItem('USERTOKEN');
// //             localStorage.removeItem("permissions");
// //             localStorage.removeItem('USERNAME');
// //             location.reload();
// //         }).catch(() => {
// //                     
// //         });
// //         localStorage.removeItem('USERTOKEN');
// //         localStorage.removeItem("permissions");
// //         localStorage.removeItem('USERNAME');
// //         return;
// //    }
// //         
// 
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     console.log(error.code,222222222222)
//     return Promise.reject(error);
// });

export default{
    install(Vue,option){
        Vue.prototype.$http = myAxios ;
    }
}