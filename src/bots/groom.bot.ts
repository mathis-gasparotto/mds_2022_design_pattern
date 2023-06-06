import { User } from '../user/user.entity'
import { BotInterface } from './bots.interface'

export class Groom implements BotInterface {
  public static INSTANCE: Groom = new Groom()

  private constructor() {}

  public hello(user: User): Promise<string> {
    return Promise.resolve(`Bonjour ${user.name} !`)
  }

  public react(message: string): Promise<string> {
    if (message.includes('Bonjour')) return Promise.resolve('Bonjour !')
    return Promise.resolve('')
  }
}
