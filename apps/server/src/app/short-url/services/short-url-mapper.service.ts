import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FullShortUrl, ShortUrl } from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlMapperService {
  constructor(private readonly configService: ConfigService) {}

  mapShortUrl(shortUrl: ShortUrl): FullShortUrl {
    return {
      ...shortUrl,
      shortUrl: new URL(
        shortUrl.uuid,
        this.configService.get('REDIRECT_SERVICE_DOMAIN')
      ).href,
    };
  }

  mapShortUrls(shortUrls: ShortUrl[]): FullShortUrl[] {
    return shortUrls.map((shortUrl) => this.mapShortUrl(shortUrl));
  }
}
