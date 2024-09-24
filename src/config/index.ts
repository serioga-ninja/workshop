import 'dotenv/config';

export type Config = {
  PORT: string;
}

const {
  PORT
} = process.env;

const config = {
  PORT: PORT || '3000',
}

export default config as Config;
