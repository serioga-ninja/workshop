import * as bodyParser from 'body-parser';
import type { Express } from 'express';
import * as express from 'express';
import helmet from 'helmet';
import * as http from 'node:http';
import { injectable } from 'tsyringe';
import LoggerService from './common/services/logger.service';
import config from './config';
import MongoConnection from './db/mongo';
import { createPGConnection } from './db/typeorm';
import ServerRouter from './router';

@injectable()
export default class Server {
  app: Express;

  constructor(
    private readonly _serverRouter: ServerRouter,
    private readonly _mongoConnection: MongoConnection,
    private readonly _logger: LoggerService,
  ) {
    this.app = express();
  }

  async register() {
    const port = config.PORT;

    this.app.use(helmet());
    this.app.use(bodyParser.json());

    this._serverRouter.register(this.app);

    await Promise.all([
      createPGConnection(),
      this._mongoConnection.createMongoConnection(),
    ]);

    return await new Promise<void>(resolve => {
      http.createServer(this.app).listen(
        port,
        () => {
          this._logger.info(`Server running on port: ${port}. Open http://localhost:${port} to see the app`);
          resolve();
        },
      );
    });
  }
}
