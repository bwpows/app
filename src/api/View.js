import { Service } from "./Server"


export function viewWork(data){
    return Service({
        url: '/view/work',
        data
    })
}