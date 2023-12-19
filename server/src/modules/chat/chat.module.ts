import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { PrismaService } from 'src/core/prisma.service';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  providers: [ChatGateway, ChatService, ChatRepository, PrismaService],
})
export class ChatModule {}
