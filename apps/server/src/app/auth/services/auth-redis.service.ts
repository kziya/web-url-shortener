import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthRedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getVerifyUser(uid: string): Promise<string> {
    return this.redis.get(this.generateVerifyKey(uid));
  }

  async setVerifyUser(uid: string, email: string): Promise<string> {
    return this.redis.set(this.generateVerifyKey(uid), email, 'EX', 180);
  }

  private generateVerifyKey(uid: string): string {
    return `VERIFY_${uid}`;
  }
}
