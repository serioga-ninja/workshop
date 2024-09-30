import * as express from 'express';
import { Express } from 'express';
import helmet from 'helmet';
import * as http from 'node:http';
import config from './config';
import router from './router';
import { createPGConnection } from './db';

export default class Server {
  app: Express;

  constructor() {
    this.app = express();
  }

  async register() {
    const port = config.PORT;

    this.app.use(helmet());
    this.app.use('/api', router);

    await createPGConnection();

    return new Promise<void>(resolve => {
      http.createServer(this.app).listen(port, () => {
        console.log(`Server running on port: ${port}. Open http://localhost:${port} to see the app`);
        resolve();
      });
    })
  }
}
