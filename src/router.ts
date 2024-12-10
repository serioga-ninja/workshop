import { Router } from 'express';
import { injectable } from 'tsyringe';
import ArticlesApiController from './plugins/articles/api/articles.router';
import UsersApiController from './plugins/users/api/users-api.controller';
import AuthApiController from './plugins/auth/api/auth-api.controller';

@injectable()
export default class ServerRouter {
  protected router: Router;

  constructor(
    private readonly _articlesApiController: ArticlesApiController,
    private readonly _usersApiController: UsersApiController,
    private readonly _authApiController: AuthApiController,
  ) {
    this.router = Router();
  }

  register() {
    this.router.use('/auth', this._authApiController.register());
    this.router.use('/articles', this._articlesApiController.register());
    this.router.use('/users', this._usersApiController.register());

    return this.router;
  }
}
