import EntityController from 'src/common/classes/entity-controller';
import type { Articles } from 'src/db';
import ArticlesService from '../services/articles.service';
import type { Application, Router } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export default class ArticlesApiController extends EntityController<Articles> {
  protected override basePath = '/articles';

  constructor(service: ArticlesService) {
    super(service);
  }

  override register(app: Application | Router): void {
    this.router.get(
      '/:id',
      this.apiMethod(this.getOne)
    );
    this.router.post(
      '/',
      this.apiMethod(this.createOne)
    );
    this.router.put(
      '/:id',
      this.apiMethod(this.updateOne)
    );
    this.router.delete(
      '/:id',
      this.apiMethod(this.deleteOne)
    );

    super.register(app);
  }
}
