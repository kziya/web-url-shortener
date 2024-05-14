import { Body, Controller, Post } from '@nestjs/common';

import { ShortUrl } from '@web-url-shortener/domain';
import { ShortUrlService } from './services/short-url.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Public()
  @Post('public')
  async createShortUrl(@Body('url') url: string): Promise<ShortUrl> {
    return this.shortUrlService.publicCreateShortUrl(url);
  }
}
