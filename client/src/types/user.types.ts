export interface User {
  id: number;
  name: string;
  color: string;
  banned: boolean;
  muted: boolean;
}

export interface UserFromSocket {
  user: User;
  socketId: string;
  status: string;
}
