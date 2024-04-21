import { BadRequestException } from '@nestjs/common';

export class EmailNotValidException extends BadRequestException {
  constructor() {
    super('EMAIL_NOT_VALID');
  }
}
