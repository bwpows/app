import { Service } from "./Server";

// 发表评论
export function addComment(data){
    return Service({
        url: '/comment',
        data
    })
}


// 获取作品的评论
export function getCommentByWorkId(work_id){
    return Service({
        url: `/comment/byWorkId/${work_id}`,
        method: 'GET'
    })
}