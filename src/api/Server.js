import axios from 'axios'
const configBaseURL = 'http://192.168.3.38:3000/';
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
