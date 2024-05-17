import { Injectable } from '@nestjs/common';

import { AuthTokenPayload, FullShortUrl } from '@web-url-shortener/domain';
import { ShortUrlRepository } from '../short-url.repository';
import { ShortUrlValidatorService } from './short-url-validator.service';
import { ShortUrlMapperService } from './short-url-mapper.service';
import { ShortUrlUuidService } from './short-url-uuid.service';

@Injectable()
export class ShortUrlService {
  constructor(
    private readonly shortUrlRepository: ShortUrlRepository,
    private readonly shortUrlValidatorService: ShortUrlValidatorService,
    private readonly shortUrlMapperService: ShortUrlMapperService,
    protected readonly shortUrlUuidService: ShortUrlUuidService
  ) {}

  async createPublicShortUrl(url: string): Promise<FullShortUrl> {
    const uuid = this.shortUrlUuidService.generatePublicShortUrlUuid();

    const shortUrl = await this.shortUrlRepository.createPublicShortUrl(
      url,
      uuid
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl.toObject());
  }

  async createPrivateShortUrl(
    tokenPayload: AuthTokenPayload,
    url: string
  ): Promise<FullShortUrl> {
    const uuid = this.shortUrlUuidService.generatePrivateShortUrlUuid();

    const shortUrl = await this.shortUrlRepository.createPrivateShortUrl(
      tokenPayload.id,
      url,
      uuid
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl.toObject());
  }
}
