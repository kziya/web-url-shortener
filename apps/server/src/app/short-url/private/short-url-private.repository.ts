import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, UpdateWriteOpResult } from 'mongoose';

import {
  ShortUrl,
  ShortUrlDocument,
  ShortUrlStatus,
} from '@web-url-shortener/domain';

@Injectable()
export class ShortUrlPrivateRepository {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>,
    private readonly configService: ConfigService
  ) {}

  async createShortUrl(
    idUser: string,
    url: string,
    uuid: string
  ): Promise<ShortUrlDocument> {
    const expiresAt = this.createShortUrlExpiresAt();

    return this.shortUrlModel.create({ idUser, url, uuid, expiresAt });
  }

  async getShortUrlList(
    idUser: string,
    page: number,
    status?: ShortUrlStatus
  ): Promise<ShortUrlDocument[]> {
    const limit = 20;
    const statusFilter = status
      ? status === ShortUrlStatus.Expired
        ? { expiresAt: { $lte: new Date() } }
        : { status }
      : {};

    return this.shortUrlModel
      .find({
        idUser,
        ...statusFilter,
      })
      .skip(limit * (page - 1))
      .limit(limit);
  }

  async renewShortUrl(idUser: string, id: string): Promise<ShortUrlDocument> {
    const expiresAt = this.createShortUrlExpiresAt();

    return this.shortUrlModel.findOneAndUpdate(
      {
        _id: id,
        idUser,
        status: ShortUrlStatus.Active,
      },
      { $set: { expiresAt: expiresAt } },
      { new: true }
    );
  }

  async deleteShortUrl(
    id: string,
    idUser: string
  ): Promise<UpdateWriteOpResult> {
    return this.shortUrlModel.updateOne(
      { _id: id, idUser },
      { $set: { status: ShortUrlStatus.Archived } }
    );
  }

  private createShortUrlExpiresAt(): Date {
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() +
        Number(this.configService.get('PRIVATE_SHORT_URL_EXPIRES_IN_DAYS'))
    );

    return expiresAt;
  }
}
