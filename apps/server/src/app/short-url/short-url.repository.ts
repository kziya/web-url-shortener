import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';

import { ShortUrl, ShortUrlDocument } from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlRepository {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>,
    private readonly configService: ConfigService
  ) {}

  async createPublicShortUrl(
    url: string,
    uuid: string
  ): Promise<ShortUrlDocument> {
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() +
        Number(this.configService.get('PUBLIC_SHORT_URL_EXPIRES_IN_DAYS'))
    );

    return this.shortUrlModel.create({ url, uuid, expiresAt });
  }

  async createPrivateShortUrl(
    idUser: string,
    url: string,
    uuid: string
  ): Promise<ShortUrlDocument> {
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() +
        Number(this.configService.get('PRIVATE_SHORT_URL_EXPIRES_IN_DAYS'))
    );

    return this.shortUrlModel.create({ idUser, url, uuid, expiresAt });
  }
}
