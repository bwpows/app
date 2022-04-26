
import { io } from 'socket.io-client'
import { baseURL } from '../api/Server'

let usreInfo = JSON.parse(localStorage.getItem('userInfo'))

const socket = io(baseURL+'chat');

if(usreInfo){
    socket.emit('connection', usreInfo.userId,(res) =>{
      console.log(res)
    })
    socket.on('connect', res => {
      console.log(res)
    })
    socket.on('sendChat', (res) => {
        console.log(res)
    })
}


export default socket;