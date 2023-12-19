import { PrismaService } from 'src/core/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createOneChat() {
    this.prismaService.chat.create({
      data: {},
    });
  }
}
