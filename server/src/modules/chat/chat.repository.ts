import { PrismaService } from 'src/core/prisma.service';
import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { ChatWithRelations } from 'src/types/chat.type';

@Injectable()
export class ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOneChat(): Promise<Chat> {
    return await this.prismaService.chat.create({
      data: {},
    });
  }

  async appendChatUser(
    chatId: number,
    userId: number,
  ): Promise<ChatWithRelations> {
    const existingChat = await this.prismaService.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        messages: {
          take: 20,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: {
              select: {
                name: true,
                color: true,
              },
            },
          },
        },
      },
    });

    if (!existingChat) {
      throw new Error(`Chat with id ${chatId} not found.`);
    }

    const userInChat = existingChat.users.some(
      (user) => user.userId === userId,
    );
    if (userInChat) {
      return existingChat;
    }

    // Explicitly create UserOnChat record
    await this.prismaService.userOnChat.create({
      data: {
        userId,
        chatId,
      },
    });

    // Fetch the updated chat with users
    const updatedChat = await this.prismaService.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        messages: {
          take: 20,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: {
              select: {
                name: true,
                color: true,
              },
            },
          },
        },
      },
    });

    return updatedChat;
  }

  async getOneChat(): Promise<Chat> {
    return await this.prismaService.chat.findFirst({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
