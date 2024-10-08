import type { Application, Router } from 'express';
import type { PathParams } from 'express-serve-static-core';
import EntityController from 'src/common/classes/entity-controller';
import type { Articles } from 'src/db';
import type ArticlesCRUDService from '../services/articles-crud.service';

export default class ArticlesApiController extends EntityController<Articles> {
  protected override basePath: PathParams = '/articles';

  constructor(
    service: ArticlesCRUDService
  ) {
    super(service);
  }

  override register(app: Application | Router): void {
    this.router.get('/:id', this.apiMethod(this.getOne));

    super.register(app);
  }
}
