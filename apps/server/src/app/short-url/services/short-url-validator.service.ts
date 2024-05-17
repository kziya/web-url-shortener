import { Injectable } from '@nestjs/common';
import { NotValidUrlException } from '../exceptions/not-valid-url.exception';

@Injectable()
export class ShortUrlValidatorService {
  validateHttpUrl(url: string): void {
    let protocol: string;
    try {
      protocol = new URL(url).protocol;
    } catch {
      throw new NotValidUrlException();
    }

    if (!['http:', 'https:'].includes(protocol)) {
      throw new NotValidUrlException();
    }
  }
}
