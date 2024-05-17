import { BadRequestException } from '@nestjs/common';

export class NotValidUrlException extends BadRequestException {
  constructor() {
    super('NOT_VALID_URL');
  }
}
