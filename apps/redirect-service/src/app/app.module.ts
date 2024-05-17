import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { RedirectModule } from './redirect/redirect.module';
import { MongooseModuleConfig } from './config/mongoose-module.config';
import Configuration from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync(MongooseModuleConfig),
    ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),
    RedirectModule,
  ],
})
export class AppModule {}
