import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {
  AuthTokenPayload,
  SuccessfulAuthResponseDto,
  ResetPasswordByUidBodyDto,
  GetVerifyStatusResponseDto,
} from '@web-url-shortener/domain';
import { AuthService } from './services/auth.service';
import { Public } from './decorators/public.decorator';
import { GetTokenPayload } from './decorators/get-token-payload.decorator';

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

  @Get('verify/status')
  async getVerifyStatus(
    @GetTokenPayload() tokenPayload: AuthTokenPayload
  ): Promise<GetVerifyStatusResponseDto> {
    return this.authService.getVerifyStatus(tokenPayload.id);
  }

  @Post('verify/send')
  async sendVerifyEmail(
    @GetTokenPayload() tokenPayload: AuthTokenPayload
  ): Promise<void> {
    await this.authService.sendVerifyEmail(tokenPayload.id);
  }

  @Public()
  @Post('verify/:uid')
  async verifyUser(@Param('uid') uid: string): Promise<void> {
    await this.authService.verifyUser(uid);
  }

  @Public()
  @Post('reset-password/send')
  async sendResetPasswordEmail(@Body('email') email: string): Promise<void> {
    await this.authService.sendResetPasswordEmail(email);
  }

  @Public()
  @Post('reset-password/:uid')
  async resetPasswordByUid(
    @Param('uid') uid: string,
    @Body() resetPasswordBodyDto: ResetPasswordByUidBodyDto
  ): Promise<void> {
    await this.authService.resetPasswordByUid(uid, resetPasswordBodyDto);
  }

  @Public()
  @Get('reset-password/:uid')
  async validateResetPassword(@Param('uid') uid: string): Promise<void> {
    await this.authService.validateResetPasswordUid(uid);
  }
}
