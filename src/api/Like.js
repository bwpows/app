import { Service } from "./Server";

// 对这个作品点赞
export function praise(data){
    return Service({
        url: 'like/praise',
        data
    })
}


// 取消点赞
export function cancelPraise(params){
    return Service({
        url: `like/praise/cancel/${params}`,
        method: 'put'
    })
}

// 查询用户的点赞
export function getPraiseByUserId(userId){
    return Service({
        url: `like/praise/user/${userId}`,
        method: 'GET'
    })
}

