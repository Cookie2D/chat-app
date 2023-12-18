import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthorizeDto } from './dto/authorize.dto';
import { Prisma, User } from '@prisma/client';
import { excludeFromObject } from 'src/utils/exclude';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationResponse } from './interfaces/auth-response';
import { messages } from 'src/const/messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async authorize(data: AuthorizeDto): Promise<AuthenticationResponse> {
    const existingUser = await this.userService.findOneByName(data.name);

    if (!existingUser) {
      return this.register(data);
    }

    return this.login(data, existingUser);
  }

  async register(
    data: Prisma.UserCreateInput,
  ): Promise<AuthenticationResponse> {
    const password = await bcrypt.hash(data.password, process.env.BCRYPT_SALT);
    const user = await this.userService.create({
      name: data.name,
      password,
    });

    const { access_token } = await this.createToken(user);

    return {
      user: excludeFromObject(user, 'password'),
      access_token,
    };
  }

  async login(
    data: Prisma.UserCreateInput,
    user: User,
  ): Promise<AuthenticationResponse> {
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new BadRequestException(messages.INVALID_CREDENTIALS);
    }

    const { access_token } = await this.createToken(user);

    return {
      user: excludeFromObject(user, 'password'),
      access_token,
    };
  }

  private async createToken(user: User) {
    const payload = { sub: user.id, role: user.roleId };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
