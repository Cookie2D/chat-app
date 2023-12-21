import { Chat, Message } from '@prisma/client';
import { ChatRepository } from './chat.repository';
import { Injectable } from '@nestjs/common';
import { ChatWithRelations } from 'src/types/chat.type';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  createChat(): Promise<Chat> {
    return this.chatRepository.createOneChat();
  }

  appendChatUser(
    chatId: number,
    userId: number,
    messageLimit: number = 20,
  ): Promise<ChatWithRelations> {
    return this.chatRepository.appendChatUser(chatId, userId, messageLimit);
  }

  getChatInfo(): Promise<Chat> {
    return this.chatRepository.getOneChat();
  }

  createMessage(message: string, userId: number, chatId: number) {
    return this.chatRepository.createOneMessage(message, userId, chatId);
  }

  getLastMessageByUser(userId: number): Promise<Message> {
    return this.chatRepository.getLastMessageByUser(userId);
  }
}
