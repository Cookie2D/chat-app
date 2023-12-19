import { ChatRepository } from './chat.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  createChat() {
    this.chatRepository.createOneChat();
  }
}
