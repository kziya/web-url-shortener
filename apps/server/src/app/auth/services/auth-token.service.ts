import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserDocument } from '../../user/user.schema';
import { AuthTokenPayload } from '../auth.types';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

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
