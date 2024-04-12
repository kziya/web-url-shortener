import { BadRequestException } from '@nestjs/common';

export class RefreshTokenExpiredException extends BadRequestException {
  constructor() {
    super('REFRESH_TOKEN_EXPIRED');
  }
}
