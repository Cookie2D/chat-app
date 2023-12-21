import { User } from '@prisma/client';

export interface AuthenticationResponse {
  user: Partial<User>;
  access_token: string;
}
