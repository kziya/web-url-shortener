import { Body, Controller, Post } from '@nestjs/common';

import { FullShortUrl } from '@web-url-shortener/domain';
import { ShortUrlPublicService } from '../services/short-url-public.service';
import { Public } from '../../auth/decorators/public.decorator';

@Public()
@Controller('short-url/public')
export class ShortUrlPublicController {
  constructor(private readonly shortUrlPublicService: ShortUrlPublicService) {}

  @Post()
  async createPublicShortUrl(@Body('url') url: string): Promise<FullShortUrl> {
    return this.shortUrlPublicService.createPublicShortUrl(url);
  }
}
