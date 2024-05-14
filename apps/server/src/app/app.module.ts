import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MailerModule } from '@nestjs-modules/mailer';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModuleConfig } from './config/module/config-module.config';
import { MongooseModuleConfig } from './config/module/mongoose-module.config';
import { RedisModuleConfig } from './config/module/redis-module.config';
import { MailerModuleConfig } from './config/module/mailer-module.config';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    MongooseModule.forRootAsync(MongooseModuleConfig),
    RedisModule.forRootAsync(RedisModuleConfig),
    MailerModule.forRootAsync(MailerModuleConfig),
    AuthModule,
    UserModule,
    ShortUrlModule,
  ],
})
export class AppModule {}
