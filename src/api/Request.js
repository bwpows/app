// 封装接口的文件

// post/post/put 请求接受参数方式是 data
// get 请求接受参数方式是 params

import { Service } from "./Server";



// 发送验证码
export function sendMail(data){
    console.log(data)
    return Service({
        url:'/user/sendMail',
        data: data
    })
}

// 验证验证码
export function venCode(data){
    console.log(data)
    return Service({
        url:'/user/venCode',
        data: data
    })
}

// 注册
export function reg(data){
    console.log(data)
    return Service({
        url:'/user/reg',
        data: data
    })
}

// 登录
export function login(data){
    console.log(data)
    return Service({
        url:'/user/login',
        data: data
    })
}

// 获取个人信息
export function getInfo(data){
    return Service({
        url:'/user/Info',
        method: 'get',
        params: data
    })
}

// 修改信息
export function putInfo(data){
    return Service({
        url:'/user/Info',
        method: 'put',
        data
    })
}

// 获取个人点赞博客
export function getFabulous(params){
    return Service({
        url: '/user/fabulous',
        method: 'get',
        params
    })
}



// ====================== 博客 ======================

// 添加博客
export function addBlog(data){
    return Service({
        url:'/blog',
        data
    })
}

// 删除博客
export function delBlog(data){
    return Service({
        url:'/blog',
        method: 'delete',
        data
    })
}

// 修改博客
export function putBlog(data){
    return Service({
        url:'/blog',
        method:'put',
        data
    })
}

// 查询博客 (ID)
export function getBlog(params){
    return Service({
        url:'/blog',
        method:'get',
        params
    })
}

// 查询博客 (关键字)
export function byKwGetBlog(params){
    return Service({
        url:'/blog/byKw',
        method:'get',
        params
    })
}

// 查询博客 (时间)
export function byTimeGetBlog(){
    return Service({
        url:'/blog/byTime',
        method:'get'
    })
}

// 查询博客 (用户名)
export function byUsGetBlog(params){
    return Service({
        url: '/blog/byUs',
        method: 'get',
        params
    })
}

// 博客点赞
export function fabulous(params){
    return Service({
        url: '/blog/fabulous',
        method: 'get',
        params
    })
}


// ================== 评论 ===================

// 添加评论
export function addComment(data){
    return Service({
        url:'/comment',
        data:data
    })
}

// 删除评论
export function delComment(data){
    return Service({
        url:'/comment',
        method:'delete',
        data:data
    })
}

// 查询评论
export function getByBlogIdComment(data){
    return Service({
        url:'/comment/byBlogId',
        method:'get',
        params:data
    })
}


// ====================== 合作人 ======================

// 添加合伙人
export function addPartner(data){
    return Service({
        url:'/partner',
        data:data
    })
}

// 删除合伙人
export function delPartner(id){
    return Service({
        url:'/partner',
        data: id,
        method: 'delete'
    })
}


// ====================== 后台管理 =====================

// 查询博客
export function backGetBlog(){
    return Service({
        url:'/back/blog',
        method:'get'
    })
}

// 查询评论
export function backGetComment(){
    return Service({
        url:'/back/comment',
        method:'get'
    })
}

// 查询用户
export function backGetUser(){
    return Service({
        url:'/back/user',
        method:'get'
    })
}

// 删除评论
export function backDelComment(data){
    return Service({
        url:'/back/comment',
        method:'delete',
        data
    })
}

// 删除用户
export function backDelUser(data){
    return Service({
        url:'/back/user',
        method:'delete',
        data
    })
}

// 删除博客
export function backDelBlog(data){
    return Service({
        url:'/back/blog',
        method:'delete',
        data
    })
}



// 上传文件接口
export function upload(data){
    return Service({
        url: '/upload',
        data
    })
}



// =============== 反馈 =================
export function feedback(data){
    return Service({
        url: 'feedback',
        data
    })
}
