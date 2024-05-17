import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ShortUrl,
  ShortUrlDocument,
  ShortUrlStatus,
} from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlRepository {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>
  ) {}

  async getActiveShortUrlByUuidAndIncClickCount(
    uuid: string
  ): Promise<ShortUrlDocument> {
    return this.shortUrlModel.findOneAndUpdate(
      {
        uuid,
        status: ShortUrlStatus.Active,
        expiresAt: { $gt: new Date() },
      },
      { $inc: { clickCount: 1 } }
    );
  }
}
