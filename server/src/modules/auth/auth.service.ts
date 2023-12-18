import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { AuthorizeDto } from './dto/authorize.dto';
import { Prisma, User } from '@prisma/client';
import { excludeFromObject } from 'src/utils/exclude';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async authorize(data: AuthorizeDto) {
    const existingUser = await this.userService.findOneByName(data.name);

    if (!existingUser) {
      return this.register(data);
    }

    return this.login(data, existingUser);
  }

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const password = await bcrypt.hash(data.password, process.env.BCRYPT_SALT);
    const user = await this.userService.create({
      name: data.name,
      password,
    });

    return excludeFromObject(user, 'password');
  }

  async login(data: Prisma.UserCreateInput, user: User) {
    const isMatch = bcrypt.compare(data.password, user.password);

    return isMatch;
  }
}
