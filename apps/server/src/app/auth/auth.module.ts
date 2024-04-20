import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

import { JwtModuleConfig } from './config/module/jwt-module.config';
import { PassportModuleConfig } from './config/module/passport-module.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthValidatorService } from './services/auth-validator.service';
import { AuthController } from './auth.controller';
import { AuthHashService } from './services/auth-hash.service';
import { AuthTokenService } from './services/auth-token.service';
import { AuthRedisService } from './services/auth-redis.service';

@Module({
  imports: [
    JwtModule.registerAsync(JwtModuleConfig),
    PassportModule.register(PassportModuleConfig),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthValidatorService,
    AuthHashService,
    AuthTokenService,
    AuthRedisService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
