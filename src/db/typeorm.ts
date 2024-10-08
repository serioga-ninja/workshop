import 'reflect-metadata';

import config from 'src/config';
import { DataSource } from 'typeorm';
import entities from './entities';

const { DATABASE_URL } = config;

export const pgdb = new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: entities,
  synchronize: false,
  logging: true
});

export const createPGConnection = () => {
  return pgdb.initialize()
    .then(() => console.info('Typeorm connected to pg server'))
    .catch((error: unknown) => {
      console.error('Typeorm pg connection error');
      console.error(error);
    });
}

export const closePGConnection = async () => {
  await pgdb.destroy();
}

process.on(
  'exit',
  () => {
  closePGConnection();
  }
);
