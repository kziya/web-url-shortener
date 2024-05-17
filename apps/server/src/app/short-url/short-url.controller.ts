import { Body, Controller, Post } from '@nestjs/common';

import { AuthTokenPayload, FullShortUrl } from '@web-url-shortener/domain';
import { ShortUrlService } from './services/short-url.service';
import { Public } from '../auth/decorators/public.decorator';
import { GetTokenPayload } from '../auth/decorators/get-token-payload.decorator';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Public()
  @Post('public')
  async createPublicShortUrl(@Body('url') url: string): Promise<FullShortUrl> {
    return this.shortUrlService.createPublicShortUrl(url);
  }

  @Post('private')
  async createPrivateShortUrl(
    @GetTokenPayload() tokenPayload: AuthTokenPayload,
    @Body('url') url: string
  ): Promise<FullShortUrl> {
    return this.shortUrlService.createPrivateShortUrl(tokenPayload, url);
  }
}
