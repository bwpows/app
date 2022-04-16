import { Service } from "./Server"

// 新增任务
export function addTask(data){
    return Service({
        url: '/task',
        data
    })
}

// 查询客户任务
export function getTaskByUserId(userId){
    return Service({
        url: `/task/${userId}`,
        method: 'GET'
    })
}

// 完成任务
export function completeTask(data){
    return Service({
        url: '/task/completed',
        method: 'PUT',
        data
    })
}

// 取消任务
export function cancelTask(data){
    return Service({
        url: '/task/cancel',
        method: 'PUT',
        data
    })
}

// 删除任务
export function deleteTask(data){
    return Service({
        url: '/task',
        method: 'DELETE',
        data
    })
}

// 删除任务
export function recoveryTask(data){
    return Service({
        url: '/task/recovery',
        method: 'PUT',
        data
    })
}