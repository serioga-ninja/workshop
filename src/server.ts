import * as express from 'express';
import { Express } from 'express';
import helmet from 'helmet';
import * as http from 'node:http';
import config from './config';
import { createPGConnection } from './db';
import ArticlesApiController from './plugins/articles/api/articles-api.controller';
import ArticlesRepository from './plugins/articles/repositories/articles.repository';
import ArticlesCRUDService from './plugins/articles/services/articles-crud.service';
import ServerRouter from './router';

export default class Server {
  app: Express;

  constructor() {
    this.app = express();
  }

  async register() {
    const port = config.PORT;

    this.app.use(helmet());

    new ServerRouter(
      new ArticlesApiController(
        new ArticlesCRUDService(
          new ArticlesRepository()
        )
      )
    ).register(this.app);

    await createPGConnection();

    return new Promise<void>(resolve => {
      http.createServer(this.app).listen(port, () => {
        console.log(`Server running on port: ${port}. Open http://localhost:${port} to see the app`);
        resolve();
      });
    })
  }
}
