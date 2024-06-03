import { Injectable } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';

import {
  AuthTokenPayload,
  FullShortUrl,
  ShortUrlStatus,
} from '@web-url-shortener/domain';
import { ShortUrlValidatorService } from '../shared/services/short-url-validator.service';
import { ShortUrlMapperService } from '../shared/services/short-url-mapper.service';
import { ShortUrlPrivateRepository } from './short-url-private.repository';
import { NotFoundShortUrlException } from '../shared/exceptions/not-found-short-url.exception';
import { ShortUrlUuidPrivateService } from './short-url-uuid-private.service';

@Injectable()
export class ShortUrlPrivateService {
  constructor(
    private readonly shortUrlRepository: ShortUrlPrivateRepository,
    private readonly shortUrlValidatorService: ShortUrlValidatorService,
    private readonly shortUrlMapperService: ShortUrlMapperService,
    protected readonly shortUrlUuidService: ShortUrlUuidPrivateService
  ) {}

  async createShortUrl(
    tokenPayload: AuthTokenPayload,
    url: string
  ): Promise<FullShortUrl> {
    this.shortUrlValidatorService.validateHttpUrl(url);
    const uuid = this.shortUrlUuidService.generateShortUrlUuid();

    const shortUrl = await this.shortUrlRepository.createShortUrl(
      tokenPayload.id,
      url,
      uuid
    );

    return this.shortUrlMapperService.mapShortUrl(shortUrl);
  }

  async getShortUrlList(
    tokenPayload: AuthTokenPayload,
    idLast: string,
    status: ShortUrlStatus
  ): Promise<FullShortUrl[]> {
    const shortUrls = await this.shortUrlRepository.getShortUrlList(
      tokenPayload.id,
      idLast,
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
