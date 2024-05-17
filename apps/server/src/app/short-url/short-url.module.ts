import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortUrl, ShortUrlSchema } from '@web-url-shortener/domain';
import { ShortUrlPublicController } from './public/short-url-public.controller';
import { ShortUrlPublicService } from './public/short-url-public.service';
import { ShortUrlValidatorService } from './shared/services/short-url-validator.service';
import { ShortUrlMapperService } from './shared/services/short-url-mapper.service';
import { ShortUrlUuidService } from './shared/services/short-url-uuid.service';
import { ShortUrlPrivateController } from './private/short-url-private.controller';
import { ShortUrlPrivateService } from './private/short-url-private.service';
import { ShortUrlPublicRepository } from './public/short-url-public.repository';
import { ShortUrlPrivateRepository } from './private/short-url-private.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
  ],
  controllers: [ShortUrlPublicController, ShortUrlPrivateController],
  providers: [
    ShortUrlPublicService,
    ShortUrlPublicRepository,
    ShortUrlPrivateService,
    ShortUrlPrivateRepository,
    ShortUrlValidatorService,
    ShortUrlMapperService,
    ShortUrlUuidService,
  ],
})
export class ShortUrlModule {}
