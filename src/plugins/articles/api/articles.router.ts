import type { Application, Router } from 'express';
import EntityController from 'src/common/classes/entity-controller';
import type { Articles } from 'src/db';
import { injectable } from 'tsyringe';
import LoggerService from '../../../common/services/logger.service';
import ArticlesService from '../services/articles.service';

@injectable()
export default class ArticlesApiController extends EntityController<Articles> {
  protected override basePath = '/articles';

  constructor(
    service: ArticlesService,
    logger: LoggerService,
  ) {
    super(service, logger);
  }

  override register(app: Application | Router): void {
    this.router.get(
      '/:id',
      this.apiMethod(this.getOne),
    );
    this.router.post(
      '/',
      this.apiMethod(this.createOne),
    );
    this.router.put(
      '/:id',
      this.apiMethod(this.updateOne),
    );
    this.router.delete(
      '/:id',
      this.apiMethod(this.deleteOne),
    );

    super.register(app);
  }
}
