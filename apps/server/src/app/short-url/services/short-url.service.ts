import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { FullShortUrl } from '@web-url-shortener/domain';
import { ShortUrlRepository } from '../short-url.repository';
import { ShortUrlValidatorService } from './short-url-validator.service';
import { ShortUrlMapperService } from './short-url-mapper.service';

@Injectable()
export class ShortUrlService {
  constructor(
    private readonly shortUrlRepository: ShortUrlRepository,
    private readonly shortUrlValidatorService: ShortUrlValidatorService,
    private readonly shortUrlMapperService: ShortUrlMapperService
  ) {}

  async publicCreateShortUrl(url: string): Promise<FullShortUrl> {
    const uuid = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    const shortUrl = await this.shortUrlRepository.createPublicShortUrl(
      url,
      uuid,
      expiresAt
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl.toObject());
  }
}
