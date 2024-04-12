import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../user/user.repository';
import { AuthValidatorService } from './auth-validator.service';
import { SuccessfulAuthResponseDto } from '../dto/successful-auth-response.dto';
import { AuthTokenService } from './auth-token.service';
import { AuthHashService } from './auth-hash.service';
import { UserDocument } from '../../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly authValidatorService: AuthValidatorService,
    private readonly authHashService: AuthHashService,
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

  private generateSuccessfulAuthResponse(
    userDocument: UserDocument
  ): SuccessfulAuthResponseDto {
    const { password: unusefulPassword, ...userToReturn } =
      userDocument.toObject();

    const { accessToken, refreshToken } =
      this.authTokenService.signTokens(userDocument);

    return { user: userToReturn, accessToken, refreshToken };
  }
}