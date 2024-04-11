import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongooseModuleConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      uri: configService.get('MONGODB_CONNECTION_URI'),
    };
  },
  inject: [ConfigService],
};
