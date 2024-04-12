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
    private readonly authValidator: AuthValidatorService,
    private readonly authHashService: AuthHashService,
    private readonly userRepository: UserRepository
  ) {}

  async signUp(
    email: string,
    password: string
  ): Promise<SuccessfulAuthResponseDto> {
    await this.authValidator.validateSignUp(email, password);

    const hashedPassword = await this.authHashService.hashPassword(password);
    const userDocument = await this.userRepository.createUser(
      email,
      hashedPassword
    );

    return this.generateSuccessfulAuthResponse(userDocument);
  }

  generateSuccessfulAuthResponse(
    userDocument: UserDocument
  ): SuccessfulAuthResponseDto {
    const { password: unusefulPassword, ...userToReturn } =
      userDocument.toObject();

    const { accessToken, refreshToken } =
      this.authTokenService.signTokens(userDocument);

    return { user: userToReturn, accessToken, refreshToken };
  }
}
