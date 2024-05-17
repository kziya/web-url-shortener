import { Body, Controller, Post } from '@nestjs/common';
import { AuthTokenPayload, FullShortUrl } from '@web-url-shortener/domain';

import { ShortUrlPrivateService } from './short-url-private.service';
import { GetTokenPayload } from '../../auth/decorators/get-token-payload.decorator';

@Controller('short-url/private')
export class ShortUrlPrivateController {
  constructor(
    private readonly shortUrlPrivateService: ShortUrlPrivateService
  ) {}

  @Post()
  async createPrivateShortUrl(
    @GetTokenPayload() tokenPayload: AuthTokenPayload,
    @Body('url') url: string
  ): Promise<FullShortUrl> {
    return this.shortUrlPrivateService.createPrivateShortUrl(tokenPayload, url);
  }
}
