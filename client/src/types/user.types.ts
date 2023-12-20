export interface User {
  id: number;
  name: string;
  color: string;
}

export interface UserFromSocket {
  user: User;
  socketId: string;
  status: string;
}
