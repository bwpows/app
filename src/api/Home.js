import { Service } from "./Server";



// 发送验证码
export function getBlog(data){
    return Service({
        url:'/publish/public',
        data
    })
}