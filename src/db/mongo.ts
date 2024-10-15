import mongoose from 'mongoose';
import { singleton } from 'tsyringe';
import LoggerService from '../common/services/logger.service';
import config from '../config';

const { MONGO_DATABASE_URL, MONGO_LOGS } = config;

@singleton()
export default class MongoConnection {
  constructor(private readonly _logger: LoggerService) {
    process.on('exit', () => this.closeMongoConnection());

    if (MONGO_LOGS) {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        this._logger.debug('QUERY', {
          mongoose: {
            collectionName,
            method,
            query: JSON.stringify(query),
            doc,
          },
        });
      });
    }
  }

  async createMongoConnection() {
    try {
      mongoose.connect(MONGO_DATABASE_URL, {
        autoCreate: true,
      });

      this._logger.info('Connected to MongoDB');
    } catch (err) {
      this._logger.error(`Could not connect to MongoDB. ${err}`);
    }
  }

  closeMongoConnection() {
    return mongoose.disconnect();
  }
}
