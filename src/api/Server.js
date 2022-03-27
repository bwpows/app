import axios from 'axios'
// const configBaseURL =  process.env.NODE_ENV == 'development'?'http://192.168.3.38:3000/':'http://159.75.79.247:3000';
// const configBaseURL = 'http://159.75.79.247:3000/';
const configBaseURL = process.env.NODE_ENV == 'production'?'http://159.75.79.247:3000/':'http://192.168.3.38:3000/'
// const configBaseURL = 'http://192.168.3.38:3000/';
import store from '../store'
import router from '../router';



// 用 create方法创建axios实例
export const Service = axios.create({
    timeout: 7000,
    baseURL: configBaseURL,
    method: 'post',
    headers:{
        'Content-Type': 'application/json;charset=UTF-8'
    }
})


export const baseURL = configBaseURL

Service.interceptors.request.use(req => {
    let token = localStorage.getItem('token') || ''
    req.headers.common['Authorization'] = 'Bearer ' + token;
    return req
})

Service.interceptors.response.use(res => {
    return res.data
}, err=>{
    if(err.response.status == 401){
        store.commit('app/updateSnackbar', { value: true, content: "身份验证错误" });
        router.replace('/signIn')
        return;
    }
    return Promise.reject(err)
})
