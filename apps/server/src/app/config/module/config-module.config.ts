import { ConfigModuleOptions } from '@nestjs/config';

import AppConfig from '../app.config';

export const ConfigModuleConfig: ConfigModuleOptions = {
  load: [AppConfig],
  isGlobal: true,
};
