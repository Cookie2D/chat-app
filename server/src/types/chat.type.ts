import { Chat } from '@prisma/client';

export type ChatWithRelations = Chat & {
  users: {
    userId: number;
    chatId: number;
    user: {
      id: number;
      email: string | null;
      name: string;
      roleId: number;
      createdAt: Date;
      updatedAt: Date;
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
