import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { WhoIs } from '../bots/who-is.service'
import { User } from '../user/user.entity'
import { Miam } from '../bots/miam.bot'
import { Groom } from '../bots/groom.bot'

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  private static LOGGER: Logger = new Logger('Gateway')
  private static CHANNEL = 'message'

  constructor(private whoIs: WhoIs, private miam: Miam) {}

  @WebSocketServer()
  private server: Server

  async handleConnection(socket: Socket, ...args: any[]) {
    const user: User = await this.whoIs.get(socket)
    if (this.whoIs.checkBlackList(socket, user)) return
    socket.emit(ChatGateway.CHANNEL, await Groom.INSTANCE.hello(user))
    socket.emit(ChatGateway.CHANNEL, await this.miam.hello())
    ChatGateway.LOGGER.log(`Client connected: ${user.socketId} - ${user.ip}`)
    this.server.emit(
      ChatGateway.CHANNEL,
      `Client connected: ${user.socketId} - ${user.ip}`
    )
  }

  @SubscribeMessage('message')
  handleMessage(socket: any, payload: any): string {
    ChatGateway.LOGGER.log(`Client ${socket.id} says: ${payload}`)
    this.server.emit(
      ChatGateway.CHANNEL,
      `Client ${socket.id} says: ${payload}`
    )
    return payload
  }

  handleDisconnect(socket: Socket) {
    ChatGateway.LOGGER.log(`Client disconnected: ${socket.id}`)
    this.server.emit(ChatGateway.CHANNEL, `Client disconnected: ${socket.id}`)
  }
}
