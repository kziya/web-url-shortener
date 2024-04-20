import { BadRequestException } from '@nestjs/common';

export class VerifyUidNotValidOrExpiredException extends BadRequestException {
  constructor() {
    super('VERIFY_UID_NOT_EXISTS_OR_EXPIRED');
  }
}
