import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthorizeDto } from './dto/authorize.dto';
import { AuthenticationResponse } from './interfaces/auth-response';
import { Prisma, User } from '@prisma/client';
import { messages } from 'src/const/messages';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
);

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

  @Post('google')
  async googleAuthRedirect(@Body() body: { token: string }) {
    if (!body.token) {
      throw new UnauthorizedException('Bad credentials');
    }

    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const user = ticket.getPayload();

    const existingUser = await this.userService.findOneByName(user.email);

    if (!existingUser) {
      const createdUser = await this.userService.create({
        name: user.email,
        email: user.email,
      });
      return await this.signIn(createdUser);
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
