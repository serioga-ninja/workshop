import * as dotenv from 'dotenv';
import { FileUploadProvider } from '../common/constants';
import type { Environment } from '../common/constants';

dotenv.config({
  debug: true,
  override: true,
});

export type Config = {
  PORT: string;
  STATIC_PORT: string;
  DATABASE_URL: string;
  NODE_ENV: Environment;
  MONGO_DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  MONGO_LOGS: boolean;
  APP_URL: string;

  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  MAILGUN_EMAIL_FROM: string;

  AUTH_SESSION_EXPIRATION_SECONDS: number;
  FILE_UPLOAD_PROVIDER: FileUploadProvider;
};

const {
  PORT,
  STATIC_PORT,
  DATABASE_URL,
  NODE_ENV,
  MONGO_DATABASE_URL,
  REDIS_URL,
  MONGO_LOGS,
  JWT_SECRET,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MAILGUN_EMAIL_FROM,
  APP_URL,
  AUTH_SESSION_EXPIRATION_SECONDS,
  FILE_UPLOAD_PROVIDER,
} = process.env;

const config = {
  PORT: PORT || '3000',
  STATIC_PORT: STATIC_PORT || '3001',
  DATABASE_URL: DATABASE_URL || '',
  NODE_ENV: NODE_ENV || '',
  MONGO_DATABASE_URL: MONGO_DATABASE_URL || '',
  MONGO_LOGS: MONGO_LOGS === '1',
  JWT_SECRET: JWT_SECRET || '',
  REDIS_URL: REDIS_URL || '',
  MAILGUN_API_KEY: MAILGUN_API_KEY || '',
  MAILGUN_DOMAIN: MAILGUN_DOMAIN || '',
  MAILGUN_EMAIL_FROM: MAILGUN_EMAIL_FROM || '',
  APP_URL: APP_URL || '',
  AUTH_SESSION_EXPIRATION_SECONDS: parseInt(AUTH_SESSION_EXPIRATION_SECONDS || '864000'),
  FILE_UPLOAD_PROVIDER: FILE_UPLOAD_PROVIDER as FileUploadProvider || FileUploadProvider.Local,
};

export default config as Config;
