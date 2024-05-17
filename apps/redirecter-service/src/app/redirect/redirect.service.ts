import { Injectable } from '@nestjs/common';

@Injectable()
export class RedirectService {
  async redirectByUid(uuid: string) {
    console.log(uuid);
  }
}
