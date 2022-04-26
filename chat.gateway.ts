import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

let clientObj: any = {}

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server


  handleDisconnect(client: any) {
    console.log(client.id, '断开连接')
    // delete clientObj[client.id]
    console.log(clientObj)
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(client.id)
  }

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('websocket Initialized')
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, message: string, room: string }){
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string){
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string){
    client.leave(room)
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('connection')
  handleConnectClient(client: Socket, userId: string){
    clientObj[userId] = client.id
    console.log(clientObj)
  }

  @SubscribeMessage('receiveMessage')
  handleReceiveMessage(client: Socket, message: { sender: string, receiver: string, msg: string }){
    console.log(message)
    console.log(clientObj[message.receiver])
    client.to(clientObj[message.receiver]).emit('sendChat', message)
  }

}
