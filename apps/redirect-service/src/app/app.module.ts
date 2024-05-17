import { Module } from '@nestjs/common';

import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [RedirectModule],
})
export class AppModule {}
