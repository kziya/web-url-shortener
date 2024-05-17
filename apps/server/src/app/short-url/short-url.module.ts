import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortUrl, ShortUrlSchema } from '@web-url-shortener/domain';
import { ShortUrlPublicController } from './public/short-url-public.controller';
import { ShortUrlPublicService } from './public/short-url-public.service';
import { ShortUrlRepository } from './shared/repositories/short-url.repository';
import { ShortUrlValidatorService } from './shared/services/short-url-validator.service';
import { ShortUrlMapperService } from './shared/services/short-url-mapper.service';
import { ShortUrlUuidService } from './shared/services/short-url-uuid.service';
import { ShortUrlPrivateController } from './private/short-url-private.controller';
import { ShortUrlPrivateService } from './private/short-url-private.service';

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
