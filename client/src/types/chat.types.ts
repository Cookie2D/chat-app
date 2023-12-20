export interface Message {  id: number;
  message: string;
  userId: number;
  chatId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatInfo {
  chatId: number | null;
  messages: Message[];
}
