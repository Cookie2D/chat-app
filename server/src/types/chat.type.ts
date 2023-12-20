import { Chat } from '@prisma/client';

export type ChatWithRelations = Chat & {
  users: {
    userId: number;
    chatId: number;
    color: string;
    user: {
      name: string;
    };
  }[];
  messages: {
    id: number;
    message: string;
    userId: number;
    chatId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
