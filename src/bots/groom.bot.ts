import { User } from '../user/user.entity'
import { BotInterface } from './bots.interface'

export class Groom implements BotInterface {
  public static INSTANCE: Groom = new Groom()

  private constructor() {}

  public hello(user: User): string {
    return `Bonjour ${user.name} !`
  }
}
