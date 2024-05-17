import { Injectable } from '@nestjs/common';

import { AuthTokenPayload, FullShortUrl } from '@web-url-shortener/domain';
import { ShortUrlValidatorService } from '../shared/services/short-url-validator.service';
import { ShortUrlMapperService } from '../shared/services/short-url-mapper.service';
import { ShortUrlUuidService } from '../shared/services/short-url-uuid.service';
import { ShortUrlPrivateRepository } from './short-url-private.repository';

@Injectable()
export class ShortUrlPrivateService {
  constructor(
    private readonly shortUrlRepository: ShortUrlPrivateRepository,
    private readonly shortUrlValidatorService: ShortUrlValidatorService,
    private readonly shortUrlMapperService: ShortUrlMapperService,
    protected readonly shortUrlUuidService: ShortUrlUuidService
  ) {}

  async createPrivateShortUrl(
    tokenPayload: AuthTokenPayload,
    url: string
  ): Promise<FullShortUrl> {
    this.shortUrlValidatorService.validateHttpUrl(url);
    const uuid = this.shortUrlUuidService.generatePrivateShortUrlUuid();

    const shortUrl = await this.shortUrlRepository.createPrivateShortUrl(
      tokenPayload.id,
      url,
      uuid
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl.toObject());
  }
}
