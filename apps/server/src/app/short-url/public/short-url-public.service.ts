import { Injectable } from '@nestjs/common';

import { FullShortUrl } from '@web-url-shortener/domain';
import { ShortUrlValidatorService } from '../shared/services/short-url-validator.service';
import { ShortUrlMapperService } from '../shared/services/short-url-mapper.service';
import { ShortUrlUuidService } from '../shared/services/short-url-uuid.service';
import { ShortUrlPublicRepository } from './short-url-public.repository';

@Injectable()
export class ShortUrlPublicService {
  constructor(
    private readonly shortUrlRepository: ShortUrlPublicRepository,
    private readonly shortUrlValidatorService: ShortUrlValidatorService,
    private readonly shortUrlMapperService: ShortUrlMapperService,
    protected readonly shortUrlUuidService: ShortUrlUuidService
  ) {}

  async createPublicShortUrl(url: string): Promise<FullShortUrl> {
    this.shortUrlValidatorService.validateHttpUrl(url);

    const uuid = this.shortUrlUuidService.generatePublicShortUrlUuid();

    const shortUrl = await this.shortUrlRepository.createPublicShortUrl(
      url,
      uuid
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl);
  }
}
