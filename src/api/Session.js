import { Service } from "./Server";

// 密码登录
export function passwordLogin(data){
    return Service({
        url: '/auth/login/phone',
        data
    })
}

// 验证码登录注册
export function SMSCodeLogin(data){
    return Service({
        url: '/auth/login/code',
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


// 获取验证码
export function getSMSCode(data){
    return Service({
        url: '/auth/sms/code',
        data
    })
}