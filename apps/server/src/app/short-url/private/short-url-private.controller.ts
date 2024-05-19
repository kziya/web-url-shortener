import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import {
  AuthTokenPayload,
  FullShortUrl,
  ShortUrlStatus,
} from '@web-url-shortener/domain';
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

  @Get('list')
  async getShortUrlList(
    @GetTokenPayload() tokenPayload: AuthTokenPayload,
    @Query('status') status: ShortUrlStatus,
    @Query('page') page: string
  ): Promise<FullShortUrl[]> {
    return this.shortUrlPrivateService.getShortUrlList(
      tokenPayload,
      +page,
      status
    );
  }

  @Post('renew/:id')
  async renewShortUrl(
    @GetTokenPayload() tokenPayload: AuthTokenPayload,
    @Param('id') id: string
  ): Promise<FullShortUrl> {
    return this.shortUrlPrivateService.renewShortUrl(tokenPayload, id);
  }

  @Delete(':id')
  async deleteShortUrl(
    @GetTokenPayload() tokenPayload: AuthTokenPayload,
    @Param('id') id: string
  ): Promise<void> {
    await this.shortUrlPrivateService.deleteShortUrl(tokenPayload, id);
  }
}
