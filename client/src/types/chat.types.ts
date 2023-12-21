export interface Message {
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
}

export interface ChatInfo {
  chatId: number | null;
  messages: Message[];
}
