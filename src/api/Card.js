import { Service } from "./Server";


// 添加卡
export function addCard(data){
    return Service({
        url: 'card',
        data
    })
}

// 查询用户的卡
export function getCardByUser(params){
    return Service({
        url: `/card/${params}`,
        method: 'GET',
        // params
    })
}