import { MessageRepository } from './message.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  createMessage(message: string, userId: number, chatId: number) {
    return this.messageRepository.createOneMessage(message, userId, chatId);
  }
}
