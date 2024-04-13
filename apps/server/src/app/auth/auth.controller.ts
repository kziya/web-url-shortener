import { Body, Controller, Post } from '@nestjs/common';

import { SuccessfulAuthResponseDto } from '@web-url-shortener/domain';
import { AuthService } from './services/auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<SuccessfulAuthResponseDto> {
    return this.authService.signUp(email, password);
  }

  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<SuccessfulAuthResponseDto> {
    return this.authService.login(email, password);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string
  ): Promise<SuccessfulAuthResponseDto> {
    return this.authService.refreshToken(refreshToken);
  }
}
