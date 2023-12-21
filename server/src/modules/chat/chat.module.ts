import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { PrismaService } from 'src/core/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [ChatGateway, ChatService, ChatRepository, PrismaService],
})
export class ChatModule {}
