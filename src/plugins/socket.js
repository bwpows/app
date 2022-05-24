
import { io } from 'socket.io-client'
import { getUnreadAlert } from '../api/Message';
import { baseURL } from '../api/Server'
import store from '../store'

let usreInfo = JSON.parse(localStorage.getItem('userInfo'))