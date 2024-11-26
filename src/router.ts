import type { Application } from 'express';
import { Router } from 'express';
import { injectable } from 'tsyringe';
import ArticlesApiController from './plugins/articles/api/articles.router';
import UsersApiController from './plugins/users/api/users-api.controller';

@injectable()
export default class ServerRouter {
  protected router: Router;

  constructor(
    private readonly _articlesApiController: ArticlesApiController,
    private readonly _usersApiController: UsersApiController,
  ) {
    this.router = Router();
  }

  register(app: Application) {
    this._articlesApiController.register(this.router);
    this._usersApiController.register(this.router);

    app.use(
      '/api',
      this.router,
    );
  }
}
