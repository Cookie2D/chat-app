export interface Message {
  id: number;
  message: string;
  userId: number;
  chatId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserOnChat {
  userId: number;
  chatId: number;
  color: string;
  user: {
    name: string;
  };
}

export interface ChatInfo {
  chatId: number | null;
  users: UserOnChat[];
  messages: Message[];
}
