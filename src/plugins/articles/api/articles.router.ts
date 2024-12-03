import type { Application, Router } from 'express';
import { pick } from 'lodash';
import EntityController from 'src/common/classes/entity-controller';
import type { Articles } from 'src/db';
import { injectable } from 'tsyringe';
import type { SuccessResponse } from '../../../common/classes/api-controller';
import LoggerService from '../../../common/services/logger.service';
import ArticlesService from '../services/articles.service';
import type { CreateOneArticleRequest, CreateOneArticleRequestBody } from '../types';
import Middlewares from '../../../common/services/middlewares';
import { ArticlesListSchema } from '../schemas';

@injectable()
export default class ArticlesApiController extends EntityController<Articles> {
  protected override basePath = '/articles';
  declare protected service: ArticlesService;

  constructor(
    service: ArticlesService,
    logger: LoggerService,
    private readonly _middleware: Middlewares,
  ) {
    super(service, logger);
  }

  override register(app: Application | Router): void {
    this.router.get(
      '/',
      this.middleware(this._middleware.validateQuery(ArticlesListSchema)),
      this.apiMethod(this.getListPaged),
    );
    this.router.get('/:id', this.apiMethod(this.getOne));
    this.router.post('/', this.apiMethod(this.createOne));
    this.router.put('/:id', this.apiMethod(this.updateOne));
    this.router.delete('/:id', this.apiMethod(this.deleteOne));

    super.register(app);
  }

  protected override async createOne(request: CreateOneArticleRequest): Promise<SuccessResponse<Articles>> {
    const data = pick(
      request.body,
      ['title', 'content', 'createdById'] as (keyof CreateOneArticleRequestBody)[],
    );

    const entity = await this.service.createOne(data);

    return this.toSuccessResponse(entity, 'Article created');
  }
}
