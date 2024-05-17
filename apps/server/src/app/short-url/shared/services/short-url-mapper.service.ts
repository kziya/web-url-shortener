import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FullShortUrl, ShortUrlDocument } from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlMapperService {
  constructor(private readonly configService: ConfigService) {}

  mapShortUrl(shortUrl: ShortUrlDocument): FullShortUrl {
    return {
      ...shortUrl.toObject(),
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
