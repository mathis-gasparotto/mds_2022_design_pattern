import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  private static LOGGER: Logger = new Logger('Gateway')
  private static CHANNEL = 'message'

  @WebSocketServer()
  private server: Server

  handleConnection(socket: Socket, ...args: any[]) {
    const ip = socket.client.conn.remoteAddress
    ChatGateway.LOGGER.log(`Client connected: ${socket.id} - ${ip}`)
    this.server.emit(
      ChatGateway.CHANNEL,
      `Client connected: ${socket.id} - ${ip}`
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
