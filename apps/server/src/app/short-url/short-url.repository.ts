import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { ShortUrl, ShortUrlDocument } from '@web-url-shortener/domain';
import { InjectModel } from '@nestjs/mongoose';

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
}
