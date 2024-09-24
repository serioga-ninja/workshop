import * as express from 'express';
import { Express } from 'express';
import helmet from 'helmet';
import * as http from 'node:http';
import router from './router';

export default class Server {
  app: Express;

  constructor() {
    this.app = express();
  }

  register() {
    const port = 3000;

    this.app.use(helmet());

    this.app.use('/api', router);

    return new Promise<void>(resolve => {
      http.createServer(this.app).listen(port, () => {
        console.log(`Server running on port: ${port}. Open http://localhost:${port} to see the app`);
        resolve();
      });
    })
  }
}
