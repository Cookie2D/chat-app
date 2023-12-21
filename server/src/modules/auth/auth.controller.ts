import { UserService } from './../user/user.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthorizeDto } from './dto/authorize.dto';
import { AuthenticationResponse } from './interfaces/auth-response';
import { Prisma, User } from '@prisma/client';
import { messages } from 'src/const/messages';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('authorize')
  async authorize(@Body() body: AuthorizeDto): Promise<AuthenticationResponse> {
    const existingUser = await this.userService.findOneByName(body.name);

    if (!existingUser) {
      const user = await this.register(body);
      return await this.signIn(user);
    }

    const isMatch = await bcrypt.compare(body.password, existingUser.password);

    if (!isMatch) {
      throw new BadRequestException(messages.INVALID_CREDENTIALS);
    }

    return await this.signIn(existingUser);
  }

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const password = await bcrypt.hash(data.password, process.env.BCRYPT_SALT);
    return await this.userService.create({
      name: data.name,
      password,
    });
  }

  async signIn(user: User): Promise<AuthenticationResponse> {
    const { access_token } = await this.createToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roleId: user.roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        color: user.color,
      },
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
