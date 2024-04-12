import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { SuccessfulAuthResponseDto } from './dto/successful-auth-response.dto';
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
}
