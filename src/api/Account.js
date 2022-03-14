import { Service } from "./Server";


// 修改头像
export function uploadHeadImg(data){
    return Service({
        url: '/upload/headimg',
        data
    })
}


// 获取用户
export function getUserInfo(_id){
    return Service({
        url: `/user/${_id}`,
        method: 'GET'
    })
}
