import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { WhoIs } from './who-is.service'
import { User } from '../user/user.entity'

@Module({
  imports: [HttpModule],
  providers: [WhoIs],
  exports: [WhoIs]
})
export class BotsModule {}

export class Groom {
  public static INSTANCE: Groom = new Groom()

  private constructor() {}

  public hello(user: User): string {
    return `Bonjour ${user.name} !`
  }
}
