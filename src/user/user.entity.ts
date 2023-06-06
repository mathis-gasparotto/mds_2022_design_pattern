export class User {
  readonly ip: string
  socketId: string
  name: string
  constructor(ip: string, socketId: string, name: string) {
    this.ip = ip
    this.socketId = socketId
    this.name = name
  }
}
