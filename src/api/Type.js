import { Service } from "./Server";


// 添加类型
// export function addCard(data){
//     return Service({
//         url: 'card',
//         data
//     })
// }

// 查询用户的类型
export function getTypeByUser(data){
    return Service({
        url: '/data-type/condition',
        data
    })
}