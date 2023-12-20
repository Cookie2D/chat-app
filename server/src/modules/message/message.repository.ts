import { PrismaService } from 'src/core/prisma.service';
import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';

@Injectable()
export class MessageRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createOneMessage(
    message: string,
    userId: number,
    chatId: number,
  ): Promise<Message> {
    return await this.prismaService.message.create({
      data: {
        message,
        user: {
          connect: {
            id: userId,
          },
        },
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
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

  async getLastMessageByUser(userId: number): Promise<Message> {
    return await this.prismaService.message.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
