import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizeDto } from './dto/authorize.dto';
import { AuthenticationResponse } from './interfaces/auth-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('authorize')
  async authorize(@Body() body: AuthorizeDto): Promise<AuthenticationResponse> {
    return this.authService.authorize(body);
  }
}
