import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { ShortUrlRepository } from '../common/repositories/short-url.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedirectService {
  constructor(
    private readonly shortUrlRepository: ShortUrlRepository,
    private readonly configService: ConfigService
  ) {}

  async redirectByUid(res: Response, uuid: string) {
    const shortUrl =
      await this.shortUrlRepository.getActiveShortUrlByUuidAndIncClickCount(
        uuid
      );

    if (!shortUrl) {
      // redirect to 404
      return res.redirect(302, this.configService.get('REDIRECT_404_URL'));
    }

    res.redirect(301, shortUrl.url);
  }
}
