import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  providers: [MessageService, MessageRepository, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
