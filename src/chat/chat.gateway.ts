import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { Groom } from '../bots/bots.module'
import { WhoIs } from '../bots/who-is.service'
import { User } from '../user/user.entity'

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  private static LOGGER: Logger = new Logger('Gateway')
  private static CHANNEL = 'message'

  private readonly blackList: string[] = [
    '10.104.130.27',
    '10.104.129.241',
    '10.104.135.77'
  ]

  constructor(private whoIs: WhoIs) {}

  @WebSocketServer()
  private server: Server

  async handleConnection(socket: Socket, ...args: any[]) {
    const user: User = await this.whoIs.get(socket)
    if (this.whoIs.checkBlackList(socket, user)) return
    socket.emit(ChatGateway.CHANNEL, Groom.INSTANCE.hello(user))
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
