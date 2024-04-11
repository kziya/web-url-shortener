import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModuleConfig } from './config/module/config-module.config';
import { MongooseModuleConfig } from './config/module/mongoose-module.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    MongooseModule.forRootAsync(MongooseModuleConfig),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
