import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [AuthModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
