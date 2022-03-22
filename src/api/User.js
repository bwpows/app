import { Service } from "./Server"



// 修改用户密码
export function editUsername(_id, data){
    return Service({
        url: `/user/username/${_id}`,
        method: 'PUT',
        data,
    })
}

