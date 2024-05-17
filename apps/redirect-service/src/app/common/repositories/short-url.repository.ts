import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ShortUrl,
  ShortUrlDocument,
  ShortUrlStatus,
} from '@web-url-shortener/domain';
import { Model } from 'mongoose';

@Injectable()
export class ShortUrlRepository {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>
  ) {}

  async getActiveShortUrlByUuid(uuid: string): Promise<ShortUrlDocument> {
    return this.shortUrlModel.findOne({
      uuid,
      status: ShortUrlStatus.Active,
      expiresAt: { $gt: new Date() },
    });
  }
}
