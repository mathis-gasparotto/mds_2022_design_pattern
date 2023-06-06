import { Injectable } from '@nestjs/common'
import { BotInterface } from './bots.interface'
import { MiamService } from './miam.service'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class Miam implements BotInterface {
  public constructor(private http: HttpService) {}

  private service: MiamService = new MiamService(this.http)

  public async hello(): Promise<string> {
    const message = await this.service.get()
    return message
  }
}
