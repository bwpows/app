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
        method: 'GET'
    })
}

// 消费和收入
export function addConsumption(data){
    return Service({
        url: '/consumption',
        data
    })
}

// 查询消费和收入的明细
export function getCardDetails(data){
    return Service({
        url: '/consumption/byUser',
        data
    })
}

// 月消费统计
export function statisticsByMonth(data){
    return Service({
        url: '/consumption/statisticsByUser',
        data
    })
}
