import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CorsConfig: CorsOptions = {
  origin: 'https://api.url-shortener.kziya.com',
  methods: [
    'TRACE',
    'DELETE',
    'POST',
    'PATCH',
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'PUT',
    'GET',
  ],
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'Content-Type',
    'Authorization',
  ],
};
