import 'reflect-metadata';

import type { Express } from 'express';
import * as express from 'express';
import helmet from 'helmet';
import * as http from 'node:http';
import { container, injectable } from 'tsyringe';
import LoggerService from '../common/services/logger.service';
import config from '../config';
import MongoConnection from '../db/mongo';
import { createPGConnection } from '../db/typeorm';
import CronJobsService from '../plugins/cron/services/cron-jobs.service';

@injectable()
export default class CronServer {
  app: Express;

  constructor(
    private readonly _mongoConnection: MongoConnection,
    private readonly _logger: LoggerService,
    private readonly _cronJobsService: CronJobsService,
  ) {
    this.app = express();
  }

  async register() {
    const port = config.CRON_PORT;

    this.app.use(helmet());

    await Promise.all([
      createPGConnection(),
      this._mongoConnection.createMongoConnection(),
    ]);

    this.app.get('/', (_req, res) => {
      const jobs = this._cronJobsService.getJobs();
      const html = jobs.map(job => `<p>${job.getJobName()} is running: ${job.isRunning()}</p>`).join('');

      res.send(html);
    });

    return await new Promise<void>(resolve => {
      http.createServer(this.app).listen(
        port,
        () => {
          this._logger.info(`Server running on port: ${port}. Open http://localhost:${port} to see the app`);
          this._cronJobsService.start();
          resolve();
        },
      );
    });
  }
}

const server = container.resolve(CronServer);
server.register();
