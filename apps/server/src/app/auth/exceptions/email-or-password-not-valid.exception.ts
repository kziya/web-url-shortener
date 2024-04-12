import { BadRequestException } from '@nestjs/common';

export class EmailOrPasswordNotValidException extends BadRequestException {
  constructor() {
    super('EMAIL_OR_PASSWORD_IS_NOT_VALID');
  }
}
