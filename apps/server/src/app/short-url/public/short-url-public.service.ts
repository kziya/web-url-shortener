import { Injectable } from '@nestjs/common';

import { FullShortUrl } from '@web-url-shortener/domain';
import { ShortUrlValidatorService } from '../shared/services/short-url-validator.service';
import { ShortUrlMapperService } from '../shared/services/short-url-mapper.service';
import { ShortUrlPublicRepository } from './short-url-public.repository';
import { ShortUrlUuidPublicService } from './short-url-uuid-public.service';

@Injectable()
export class ShortUrlPublicService {
  constructor(
    private readonly shortUrlRepository: ShortUrlPublicRepository,
    private readonly shortUrlValidatorService: ShortUrlValidatorService,
    private readonly shortUrlMapperService: ShortUrlMapperService,
    protected readonly shortUrlUuidService: ShortUrlUuidPublicService
  ) {}

  async createPublicShortUrl(url: string): Promise<FullShortUrl> {
    this.shortUrlValidatorService.validateHttpUrl(url);

    const uuid = this.shortUrlUuidService.generateShortUrlUuid();

    const shortUrl = await this.shortUrlRepository.createPublicShortUrl(
      url,
      uuid
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl);
  }
}
