import { MessageRepository } from './message.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  createMessage() {
    this.messageRepository.createOneMessage({
      message: '',
      userId: 1,
      chatId: 2,
    });
  }
}
