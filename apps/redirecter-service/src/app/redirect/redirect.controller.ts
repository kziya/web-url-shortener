import { Controller, Get, Param } from '@nestjs/common';

import { RedirectService } from './redirect.service';

@Controller()
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':uuid')
  async redirectByUuid(@Param('uuid') uuid: string) {
    return this.redirectService.redirectByUid(uuid);
  }
}
