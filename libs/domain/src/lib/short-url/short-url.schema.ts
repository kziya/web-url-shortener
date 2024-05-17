import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { ShortUrlStatus } from './enums/';

@Schema({ timestamps: true, collection: 'shortUrls' })
export class ShortUrl {
  _id?: string;
  updatedAt?: Date;
  createdAt?: Date;

  @Prop({ type: Types.ObjectId })
  idUser: Types.ObjectId;

  @Prop({ unique: true, required: true })
  uuid: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: 0 })
  clickCount: number;

  @Prop({ type: String, enum: ShortUrlStatus, default: ShortUrlStatus.Active })
  status: ShortUrlStatus;

  @Prop()
  expiresAt: Date;
}

export type ShortUrlDocument = HydratedDocument<ShortUrl>;
export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
