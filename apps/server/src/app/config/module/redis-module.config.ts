import { RedisModuleAsyncOptions } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisModuleConfig: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'single',
    url: configService.get('REDIS_CONNECTION_URI'),
  }),
  inject: [ConfigService],
};
