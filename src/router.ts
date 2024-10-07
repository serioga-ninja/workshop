import { Application, Router } from 'express';
import ArticlesApiController from './plugins/articles/api/articles-api.controller';

export default class ServerRouter {
  protected router: Router;

  constructor(
    private readonly _articlesApiController: ArticlesApiController
  ) {
    this.router = Router();
  }

  register(app: Application) {
    this._articlesApiController.register(this.router);

    app.use('/api', this.router);
  }
}
