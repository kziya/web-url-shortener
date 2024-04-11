import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongooseModuleConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const user = configService.get('MONGODB_USER');
    const password = configService.get('MONGODB_PASSWORD');
    const host = configService.get('MONGODB_HOST');
    const name = configService.get('MONGODB_NAME');

    return {
      uri: `mongodb+srv://${user}:${password}@${host}/${name}?retryWrites=true&w=majority&appName=web-url-shortener`,
    };
  },
  inject: [ConfigService],
};
