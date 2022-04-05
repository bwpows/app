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