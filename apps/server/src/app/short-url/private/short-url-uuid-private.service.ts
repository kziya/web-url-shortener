import { Injectable } from '@nestjs/common';
import short from 'short-uuid';

@Injectable()
export class ShortUrlUuidPrivateService {
  generateShortUrlUuid(): string {
    return short.generate();
  }
}
