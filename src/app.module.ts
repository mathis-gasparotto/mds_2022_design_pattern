import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ChatGateway } from './chat/chat.gateway'
import { BotsModule } from './bots/bots.module'

@Module({
  imports: [BotsModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway]
})
export class AppModule {}
