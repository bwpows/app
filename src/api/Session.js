import { Service } from "./Server";

// 密码登录
export function passwordLogin(data){
    return Service({
        url: '/auth/login/phone',
        data
    })
}


// 获取用户信息
export function getUserInfo(){
    return Service({
        url: '/auth/profile',
        method: 'get'
    })
}