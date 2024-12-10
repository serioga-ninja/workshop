import 'dotenv/config';
import type { Environment } from '../common/constants';

export type Config = {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: Environment;
  MONGO_DATABASE_URL: string;
  JWT_SECRET: string;
  MONGO_LOGS: boolean;
};

const {
  PORT,
  DATABASE_URL,
  NODE_ENV,
  MONGO_DATABASE_URL,
  MONGO_LOGS,
  JWT_SECRET,
} = process.env;

const config = {
  PORT: PORT || '3000',
  DATABASE_URL: DATABASE_URL || '',
  NODE_ENV: NODE_ENV || '',
  MONGO_DATABASE_URL: MONGO_DATABASE_URL || '',
  MONGO_LOGS: MONGO_LOGS === '1',
  JWT_SECRET: JWT_SECRET || '',
};

export default config as Config;
