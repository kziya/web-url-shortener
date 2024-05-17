import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortUrl, ShortUrlSchema } from '@web-url-shortener/domain';
import { ShortUrlRepository } from './repositories/short-url.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: ShortUrlSchema, name: ShortUrl.name },
    ]),
  ],
  providers: [ShortUrlRepository],
  exports: [ShortUrlRepository],
})
export class CommonModule {}
