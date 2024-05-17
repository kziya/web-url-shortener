import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RedirectModule } from './redirect/redirect.module';
import { MongooseModuleConfig } from './config/mongoose-module.config';

@Module({
  imports: [MongooseModule.forRootAsync(MongooseModuleConfig), RedirectModule],
})
export class AppModule {}
