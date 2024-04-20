import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';

import { ConfigModuleConfig } from './config/module/config-module.config';
import { MongooseModuleConfig } from './config/module/mongoose-module.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RedisModuleConfig } from './config/module/redis-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    MongooseModule.forRootAsync(MongooseModuleConfig),
    RedisModule.forRootAsync(RedisModuleConfig),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
