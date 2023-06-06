import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { WhoIs } from './who-is.service'
import { Miam } from './miam.bot'

@Module({
  imports: [HttpModule],
  providers: [WhoIs, Miam],
  exports: [WhoIs, Miam]
})
export class BotsModule {}