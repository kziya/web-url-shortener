import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShortUrlUuidService {
  generatePublicShortUrlUuid(): string {
    return uuidv4();
  }

  generatePrivateShortUrlUuid(): string {
    return uuidv4();
  }
}
