import { BadRequestException } from '@nestjs/common';

export class UidNotValidOrExpiredException extends BadRequestException {
  constructor() {
    super('VERIFY_UID_NOT_EXISTS_OR_EXPIRED');
  }
}
