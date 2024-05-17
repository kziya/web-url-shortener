import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShortUrl, ShortUrlDocument } from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlRepository {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>
  ) {}

  async createPublicShortUrl(
    url: string,
    uuid: string
  ): Promise<ShortUrlDocument> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return this.shortUrlModel.create({ url, uuid, expiresAt });
  }

  async createPrivateShortUrl(
    idUser: string,
    url: string,
    uuid: string
  ): Promise<ShortUrlDocument> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return this.shortUrlModel.create({ idUser, url, uuid, expiresAt });
  }
}
