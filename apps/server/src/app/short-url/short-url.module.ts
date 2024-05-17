import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortUrl, ShortUrlSchema } from '@web-url-shortener/domain';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './services/short-url.service';
import { ShortUrlRepository } from './short-url.repository';
import { ShortUrlValidatorService } from './services/short-url-validator.service';
import { ShortUrlMapperService } from './services/short-url-mapper.service';
import { ShortUrlUuidService } from './services/short-url-uuid.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
  ],
  controllers: [ShortUrlController],
  providers: [
    ShortUrlService,
    ShortUrlRepository,
    ShortUrlValidatorService,
    ShortUrlMapperService,
    ShortUrlUuidService,
  ],
})
export class ShortUrlModule {}
