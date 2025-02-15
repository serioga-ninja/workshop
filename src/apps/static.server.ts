import 'reflect-metadata';

import type { Express } from 'express';
import * as express from 'express';
import * as http from 'node:http';
import { container, injectable } from 'tsyringe';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import LoggerService from '../common/services/logger.service';
import config from '../config';
import { createPGConnection } from '../db/typeorm';
import StaticRouter from './static.router';
import MongoConnection from '../db/mongo';
import FilesService from '../common/services/files-service';

@injectable()
export default class ApiServer {
  app: Express;

  constructor(
    private readonly _staticRouter: StaticRouter,
    private readonly _mongoConnection: MongoConnection,
    private readonly _logger: LoggerService,
    private readonly _fileUpload: FilesService,
  ) {
    this.app = express();
  }

  async register() {
    const port = config.STATIC_PORT;

    this.app.use('/static', this._staticRouter.register());
    this.app.get('/:sessionId?', async (req, res) => {
      if (!req.params.sessionId) {
        res.redirect(`/${Math.random().toString(36).substring(7)}`);

        return;
      }

      res.send(await readFile(join(process.cwd(), 'views', 'ws.html'), 'utf-8'));
    });

    await Promise.all([
      createPGConnection(),
      this._mongoConnection.createMongoConnection(),
    ]);
    await this._fileUpload.init();

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

const server = container.resolve(ApiServer);
server.register();
