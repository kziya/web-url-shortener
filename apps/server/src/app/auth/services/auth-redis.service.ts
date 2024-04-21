import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthRedisService {
  private readonly VERIFY_KEY_EXP_IN_SEC = 180;
  private readonly RESET_PASSWORD_KEY_EXP_IN_SEC = 180;

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getVerifyUser(uid: string): Promise<string> {
    return this.redis.get(this.generateVerifyKey(uid));
  }

  async setVerifyUser(uid: string, email: string): Promise<string> {
    return this.redis.set(
      this.generateVerifyKey(uid),
      email,
      'EX',
      this.VERIFY_KEY_EXP_IN_SEC
    );
  }

  async getResetPassword(uid: string): Promise<string> {
    return this.redis.get(this.generateResetPasswordKey(uid));
  }

  async setResetPassword(uid: string, email: string): Promise<string> {
    return this.redis.set(
      this.generateResetPasswordKey(uid),
      email,
      'EX',
      this.RESET_PASSWORD_KEY_EXP_IN_SEC
    );
  }

  private generateVerifyKey(uid: string): string {
    return `VERIFY_${uid}`;
  }

  private generateResetPasswordKey(uid: string): string {
    return `RESET_PASSWORD_${uid}`;
  }
}
