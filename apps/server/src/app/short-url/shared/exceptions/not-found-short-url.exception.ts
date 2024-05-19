import { BadRequestException } from '@nestjs/common';

export class NotFoundShortUrlException extends BadRequestException {
  constructor() {
    super('NOT_FOUND_SHORT_URL');
  }
}
