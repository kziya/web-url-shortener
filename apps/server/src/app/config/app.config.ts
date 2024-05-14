import * as process from 'process';

const error = (name: string) => {
  throw new Error(`Environment variable ${name} is not defined`);
};
export default () => ({
  APP_DOMAIN: process.env.APP_DOMAIN || 'http://localhost:4200',

  API_PORT: process.env.API_PORT || 3000,
  API_DOMAIN: process.env.API_DOMAIN || 'http://localhost:3000',

  MONGODB_CONNECTION_URI:
    process.env.MONGODB_CONNECTION_URI || error('MONGODB_CONNECTION_URI'),

  REDIS_CONNECTION_URI:
    process.env.REDIS_CONNECTION_URI || error('REDIS_CONNECTION_URI'),

  MAIL_TRANSPORTER_URI:
    process.env.MAIL_TRANSPORTER_URI || error('MAIL_TRANSPORTER_URI'),

  JWT_ACCESS_TOKEN_SECRET:
    process.env.JWT_ACCESS_TOKEN_SECRET || error('JWT_ACCESS_TOKEN_SECRET'),
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',
  JWT_REFRESH_TOKEN_SECRET:
    process.env.JWT_REFRESH_TOKEN_SECRET || error('JWT_REFRESH_TOKEN_SECRET'),
  JWT_REFRESH_TOKEN_EXPIRES_IN:
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '1d',

  REDIRECT_APP_DOMAIN: 'https://r.kziya.com/',
});
