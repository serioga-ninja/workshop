import * as bodyParser from 'body-parser';
import type { Express } from 'express';
import * as express from 'express';
import helmet from 'helmet';
import * as http from 'node:http';
import { injectable } from 'tsyringe';
import * as fileUpload from 'express-fileupload';
import LoggerService from './common/services/logger.service';
import config from './config';
import MongoConnection from './db/mongo';
import { createPGConnection } from './db/typeorm';
import ServerRouter from './router';
import AuthModule from './plugins/auth/auth.module';
import RedisConnection from './libs/redis';

@injectable()
export default class Server {
  app: Express;

  constructor(
    private readonly _serverRouter: ServerRouter,
    private readonly _mongoConnection: MongoConnection,
    private readonly _redisConnection: RedisConnection,
    private readonly _authModule: AuthModule,
    private readonly _logger: LoggerService,
  ) {
    this.app = express();
  }

  async register() {
    const port = config.PORT;

    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(fileUpload({
      // limits: { fileSize: 50 * 1024 * 1024 },
    }));

    this.app.use('/api', this._serverRouter.register());

    await Promise.all([
      createPGConnection(),
      this._redisConnection.createConnection(),
      this._mongoConnection.createMongoConnection(),
    ]);

    return await new Promise<void>(resolve => {
      http.createServer(this.app).listen(
        port,
        () => {
          this._authModule.load();
          this._logger.info(`Server running on port: ${port}. Open http://localhost:${port} to see the app`);
          resolve();
        },
      );
    });
  }
}
