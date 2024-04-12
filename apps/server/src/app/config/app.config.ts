import * as process from 'process';

const error = (name: string) => {
  throw new Error(`Environment variable ${name} is not defined`);
};
export default () => ({
  APP_PORT: process.env.APP_PORT || 3000,

  MONGODB_CONNECTION_URI:
    process.env.MONGODB_CONNECTION_URI || error('MONGODB_CONNECTION_URI'),

  JWT_ACCESS_TOKEN_SECRET:
    process.env.JWT_ACCESS_TOKEN_SECRET || error('JWT_ACCESS_TOKEN_SECRET'),
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',
  JWT_REFRESH_TOKEN_SECRET:
    process.env.JWT_REFRESH_TOKEN_SECRET || error('JWT_REFRESH_TOKEN_SECRET'),
  JWT_REFRESH_TOKEN_EXPIRES_IN:
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '1d',
});
