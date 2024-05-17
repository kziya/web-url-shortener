import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortUrl, ShortUrlSchema } from '@web-url-shortener/domain';
import { ShortUrlPublicController } from './controllers/short-url-public.controller';
import { ShortUrlPublicService } from './services/short-url-public.service';
import { ShortUrlRepository } from './short-url.repository';
import { ShortUrlValidatorService } from './services/short-url-validator.service';
import { ShortUrlMapperService } from './services/short-url-mapper.service';
import { ShortUrlUuidService } from './services/short-url-uuid.service';
import { ShortUrlPrivateController } from './controllers/short-url-private.controller';
import { ShortUrlPrivateService } from './services/short-url-private.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
  ],
  controllers: [ShortUrlPublicController, ShortUrlPrivateController],
  providers: [
    ShortUrlPublicService,
    ShortUrlPrivateService,
    ShortUrlRepository,
    ShortUrlValidatorService,
    ShortUrlMapperService,
    ShortUrlUuidService,
  ],
})
export class ShortUrlModule {}
