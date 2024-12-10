import { pick } from 'lodash';
import EntityController from 'src/common/classes/entity-controller';
import type { Articles } from 'src/db';
import { injectable } from 'tsyringe';
import type { SuccessResponse } from '../../../common/classes/api-controller';
import LoggerService from '../../../common/services/logger.service';
import Middlewares from '../../../common/services/middlewares';
import { ArticlesListSchema } from '../schemas';
import ArticlesService from '../services/articles.service';
import type { CreateOneArticleRequest, CreateOneArticleRequestBody } from '../types';

@injectable()
export default class ArticlesApiController extends EntityController<Articles> {
  declare protected service: ArticlesService;

  constructor(
    service: ArticlesService,
    logger: LoggerService,
    private readonly _middleware: Middlewares,
  ) {
    super(service, logger);
  }

  override register() {
    this.get(
      '/',
      this._middleware.validateQuery(ArticlesListSchema),
      this.getListPaged,
    );
    this.get('/:id', this.getOne);
    this.post('/', this.createOne);
    this.put('/:id', this.updateOne);
    this.delete('/:id', this.deleteOne);

    return super.register();
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
