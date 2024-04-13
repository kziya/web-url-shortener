import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AuthTokenPayload, UserDocument } from '@web-url-shortener/domain';
import { RefreshTokenExpiredException } from '../exceptions/refresh-token-expired.exception';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  public verifyRefreshToken(refreshToken: string): AuthTokenPayload {
    try {
      return this.jwtService.verify<AuthTokenPayload>(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch (e) {
      console.log(e);
      throw new RefreshTokenExpiredException();
    }
  }

  public signTokens(user: UserDocument): {
    accessToken: string;
    refreshToken: string;
  } {
    const tokenPayload: AuthTokenPayload = {
      id: user._id.toString(),
      isVerified: user.isVerified,
    };

    return {
      accessToken: this.jwtService.sign(tokenPayload),
      refreshToken: this.jwtService.sign(tokenPayload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      }),
    };
  }
}
