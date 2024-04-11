import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const JwtModuleConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    },
  }),
  inject: [ConfigService],
};
