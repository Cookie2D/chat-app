import { Chat } from '@prisma/client';
import { ChatRepository } from './chat.repository';
import { Injectable } from '@nestjs/common';
import { ChatWithRelations } from 'src/types/chat.type';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  createChat(): Promise<Chat> {
    return this.chatRepository.createOneChat();
  }

  appendChatUser(chatId: number, userId: number): Promise<ChatWithRelations> {
    return this.chatRepository.appendChatUser(chatId, userId);
  }

  getChatInfo(): Promise<Chat> {
    return this.chatRepository.getOneChat();
  }
}
