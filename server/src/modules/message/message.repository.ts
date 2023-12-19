import { PrismaService } from 'src/core/prisma.service';
import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';

@Injectable()
export class MessageRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createOneMessage(data: any): Promise<Message> {
    return await this.prismaService.message.create({
      data,
    });
  }

  async getMessagesByChat(chatId: number): Promise<Message[]> {
    return await this.prismaService.message.findMany({
      where: {
        chat: {
          id: chatId,
        },
      },
    });
  }
}
