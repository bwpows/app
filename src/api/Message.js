import { Service } from './Server'


// Get unread alert quantity by user_id
export function getUnreadAlert(user_id){
    return Service({
        url: `/alert/unreadNum/${user_id}`,
        method: 'GET'
    })
}

// Get user alert
export function getAlert(user_id){
    return Service({
        url: `/alert/${user_id}`,
        method: 'GET'
    })
}

// Modity user alert is read
export function modityRead(data){
    return Service({
        url: '/alert/read',
        data
    })
}