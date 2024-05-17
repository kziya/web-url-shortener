import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { ShortUrlRepository } from '../common/repositories/short-url.repository';

@Injectable()
export class RedirectService {
  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

  async redirectByUid(res: Response, uuid: string) {
    const shortUrl = await this.shortUrlRepository.getActiveShortUrlByUuid(
      uuid
    );

    if (!shortUrl) {
      // redirect to 404
      return res.redirect('https://url-shortener.kziya.com/404');
    }

    res.redirect(shortUrl.url);
  }
}
