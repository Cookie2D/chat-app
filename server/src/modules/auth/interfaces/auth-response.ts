import { User } from '@prisma/client';

export interface AuthenticationResponse {
  user: User;
  access_token: string;
}
