import { Service } from "./Server";



// 发送验证码
export function getBlog(params){
    return Service({
        url:'/publish/public',
        method: 'get',
        params
    })
}