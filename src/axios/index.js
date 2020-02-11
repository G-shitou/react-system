import axios from 'axios';
import {HashRouter} from 'react-router-dom'
import { Modal } from 'antd';

const router = new HashRouter();

// 请求超时10s
axios.defaults.timeout = 10000
// base url
axios.defaults.baseUrl = 'https://www.easy-mock.com/mock/5dfd99e956438735d227bb0c/api'


//http request 拦截器
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        // config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        }
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
  );
  
  
//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.status === 200){
            return Promise.resolve(response)
        }else{
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            // 打印错误信息
            console.log(error.response);
            switch (error.response.status) {
                // 401: 未登录                                
                case 401:
                    Modal.info({
                        title:"提示",
                        content: '未登录,请先登录!',
                        onCancel:function(){
                            router.history.push('/');
                        },
                        onOk:function(){
                            router.history.push('/');
                        }
                    })
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地和redux中token与登录信息                
                // 跳转登录页面              
                case 403:
                    Modal.info({
                        title:"提示",
                        content: '登录过期，请重新登录!',
                        onCancel:function(){
                            // 清除token                   
                            // localStorage.removeItem('token');
                            router.history.push('/');
                        },
                        onOk:function(){
                            // 清除token                   
                            // localStorage.removeItem('token');
                            router.history.push('/');
                        }
                    })
                    break;
                // 404请求不存在                
                case 404:
                    Modal.info({
                        title:"提示",
                        content: '网络请求不存在!'
                    })
                    break;
                // 其他错误，直接抛出错误提示                
                default:
                    Modal.info({
                        title:"提示",
                        content: '请求异常,请稍后再试!'
                    })
            }
            return Promise.reject(error.response);
        }
    }
)

export function get(url,params){
    // 加载模态框
    let loading = document.getElementById('ajaxLoading');
    loading.style.display = 'block';
    return new Promise((resolve,reject) =>{
        axios.get(url,params).then(res => {
            // loading = document.getElementById('ajaxLoading');
            loading.style.display = 'none';
            resolve(res.data)
        }).catch(error => {
            // loading = document.getElementById('ajaxLoading');
            loading.style.display = 'none';
            reject(error)
        })
    })
}

export function post(url,params){
    // 加载模态框
    let loading = document.getElementById('ajaxLoading');
    loading.style.display = 'block';
    return new Promise((resolve,reject) =>{
        axios.post(url,params).then(res => {
            loading.style.display = 'none';
            resolve(res.data)
        }).catch(error => {
            loading.style.display = 'none';
            reject(error)
        })
    })
}