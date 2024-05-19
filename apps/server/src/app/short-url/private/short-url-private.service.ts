import { Injectable } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';

import {
  AuthTokenPayload,
  FullShortUrl,
  ShortUrlStatus,
} from '@web-url-shortener/domain';
import { ShortUrlValidatorService } from '../shared/services/short-url-validator.service';
import { ShortUrlMapperService } from '../shared/services/short-url-mapper.service';
import { ShortUrlUuidService } from '../shared/services/short-url-uuid.service';
import { ShortUrlPrivateRepository } from './short-url-private.repository';
import { NotFoundShortUrlException } from '../shared/exceptions/not-found-short-url.exception';

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

    const shortUrl = await this.shortUrlRepository.createShortUrl(
      tokenPayload.id,
      url,
      uuid
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl);
  }

  async getShortUrlList(
    tokenPayload: AuthTokenPayload,
    page: number,
    status: ShortUrlStatus
  ): Promise<FullShortUrl[]> {
    const shortUrls = await this.shortUrlRepository.getShortUrlList(
      tokenPayload.id,
      page,
      status
    );

    return this.shortUrlMapperService.mapShortUrls(shortUrls);
  }

  async renewShortUrl(
    tokenPayload: AuthTokenPayload,
    id: string
  ): Promise<FullShortUrl> {
    const shortUrlDocument = await this.shortUrlRepository.renewShortUrl(
      tokenPayload.id,
      id
    );

    if (!shortUrlDocument) {
      throw new NotFoundShortUrlException();
    }

    return this.shortUrlMapperService.mapShortUrl(shortUrlDocument);
  }

  async deleteShortUrl(
    tokenPayload: AuthTokenPayload,
    id: string
  ): Promise<UpdateWriteOpResult> {
    return this.shortUrlRepository.deleteShortUrl(id, tokenPayload.id);
  }
}
