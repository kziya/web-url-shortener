import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  GetVerifyStatusResponseDto,
  ResetPasswordByUidBodyDto,
  SuccessfulAuthResponseDto,
  UserDocument,
} from '@web-url-shortener/domain';
import { UserRepository } from '../../user/user.repository';
import { AuthValidatorService } from './auth-validator.service';
import { AuthTokenService } from './auth-token.service';
import { AuthHashService } from './auth-hash.service';
import { AuthRedisService } from './auth-redis.service';
import { AuthMailerService } from './auth-mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly authValidatorService: AuthValidatorService,
    private readonly authHashService: AuthHashService,
    private readonly authRedisService: AuthRedisService,
    private readonly authMailerService: AuthMailerService,
    private readonly userRepository: UserRepository
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<SuccessfulAuthResponseDto> {
    await this.authValidatorService.validateLogin(email, password);

    const userDocument = await this.userRepository.getUserByEmail(email);
    await this.authHashService.verifyHash(password, userDocument.password);

    return this.generateSuccessfulAuthResponse(userDocument);
  }

  async signUp(
    email: string,
    password: string
  ): Promise<SuccessfulAuthResponseDto> {
    await this.authValidatorService.validateSignUp(email, password);

    const hashedPassword = await this.authHashService.hashPassword(password);
    const userDocument = await this.userRepository.createUser(
      email,
      hashedPassword
    );

    return this.generateSuccessfulAuthResponse(userDocument);
  }

  async refreshToken(refreshToken: string): Promise<SuccessfulAuthResponseDto> {
    const tokenPayload = this.authTokenService.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.getUserById(tokenPayload.id);

    return this.generateSuccessfulAuthResponse(user);
  }

  async getVerifyStatus(id: string): Promise<GetVerifyStatusResponseDto> {
    const user = await this.userRepository.getUserById(id);
    await this.authValidatorService.validateGetVerifyStatus(user);

    return { status: user.isVerified };
  }

  async verifyUser(uid: string): Promise<void> {
    const emailToVerify = await this.authRedisService.getVerifyUser(uid);

    await this.authValidatorService.validateVerify(emailToVerify);
    await this.userRepository.verifyUser(emailToVerify);
    await this.authRedisService.deleteVerifyUser(uid);
  }

  async sendVerifyEmail(id: string): Promise<void> {
    const user = await this.userRepository.getUserById(id);

    await this.authValidatorService.validateSendVerifyEmail(user);

    const uid = uuidv4();
    await this.authRedisService.setVerifyUser(uid, user.email);
    await this.authMailerService.sendVerifyUserEmail(uid, user.email);
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    await this.authValidatorService.validateSendResetPasswordEmail(email);

    const uid = uuidv4();
    await this.authRedisService.setResetPassword(uid, email);
    await this.authMailerService.sendResetPasswordEmail(uid, email);
  }

  async resetPasswordByUid(
    uid: string,
    resetPasswordByUidBodyDto: ResetPasswordByUidBodyDto
  ) {
    const email = await this.authRedisService.getResetPassword(uid);
    const { password, confirmPassword } = resetPasswordByUidBodyDto;

    await this.authValidatorService.validateResetPasswordByUid(
      email,
      password,
      confirmPassword
    );

    const hashedPassword = await this.authHashService.hashPassword(password);

    await this.userRepository.updatePassword(email, hashedPassword);
  }

  private generateSuccessfulAuthResponse(
    userDocument: UserDocument
  ): SuccessfulAuthResponseDto {
    const { password, ...userToReturn } = userDocument.toObject();

    const { accessToken, refreshToken } =
      this.authTokenService.signTokens(userDocument);

    return { user: userToReturn, accessToken, refreshToken };
  }
}
