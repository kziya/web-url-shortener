import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  FullShortUrl,
  ShortUrl,
  ShortUrlDocument,
  ShortUrlStatus,
} from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlMapperService {
  constructor(private readonly configService: ConfigService) {}

  mapShortUrls(shortUrls: ShortUrlDocument[]): FullShortUrl[] {
    return shortUrls.map((shortUrl) => this.mapShortUrl(shortUrl));
  }

  mapShortUrl(shortUrlDocument: ShortUrlDocument): FullShortUrl {
    const shortUrl = shortUrlDocument.toObject();
    const status = this.getFreshShortUrlStatus(shortUrl);

    return {
      ...shortUrl,
      status,
      shortUrl: this.getRedirectShortUrl(shortUrl),
    };
  }

  private getRedirectShortUrl(shortUrl: ShortUrl): string {
    return new URL(
      shortUrl.uuid,
      this.configService.get('REDIRECT_SERVICE_DOMAIN')
    ).href;
  }

  private getFreshShortUrlStatus(shortUrl: ShortUrl): ShortUrlStatus {
    return shortUrl.status === ShortUrlStatus.Archived
      ? shortUrl.status
      : +shortUrl.expiresAt < +new Date()
      ? ShortUrlStatus.Expired
      : shortUrl.status;
  }
}
