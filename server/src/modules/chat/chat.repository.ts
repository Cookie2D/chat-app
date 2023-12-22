import { PrismaService } from 'src/core/prisma.service';
import { Injectable } from '@nestjs/common';
import { Chat, Message } from '@prisma/client';
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
    messageLimit: number = 20,
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
          take: messageLimit,
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

    const existingUserOnChat = await this.prismaService.userOnChat.findUnique({
      where: {
        userId,
        chatId,
      },
    });

    if (!existingUserOnChat) {
      await this.prismaService.userOnChat.create({
        data: {
          userId,
          chatId,
        },
      });
    }

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
          take: messageLimit,
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
      include: {
        user: {
          select: {
            name: true,
            color: true,
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
