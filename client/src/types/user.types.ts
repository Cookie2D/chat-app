export interface User {
  id: number;
  name: string;
}

export interface UserFromSocket {
  user: User;
  socketId: string;
}
