import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  FullShortUrl,
  ShortUrlDocument,
  ShortUrlStatus,
} from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlMapperService {
  constructor(private readonly configService: ConfigService) {}

  mapShortUrl(shortUrlDocument: ShortUrlDocument): FullShortUrl {
    const shortUrl = shortUrlDocument.toObject();
    const status =
      shortUrl.status === ShortUrlStatus.Archived
        ? shortUrl.status
        : +shortUrl.expiresAt < +new Date()
        ? ShortUrlStatus.Expired
        : shortUrl.status;

    return {
      ...shortUrl,
      status,
      shortUrl: new URL(
        shortUrl.uuid,
        this.configService.get('REDIRECT_SERVICE_DOMAIN')
      ).href,
    };
  }

  mapShortUrls(shortUrls: ShortUrlDocument[]): FullShortUrl[] {
    return shortUrls.map((shortUrl) => this.mapShortUrl(shortUrl));
  }
}
