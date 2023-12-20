import { Chat } from '@prisma/client';

export type ChatWithRelations = Chat & {
  messages: {
    id: number;
    message: string;
    userId: number;
    user: {
      name: string;
      color: string;
    };
    chatId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
