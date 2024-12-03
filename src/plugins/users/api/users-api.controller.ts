import type { Application, Router } from 'express';
import { injectable } from 'tsyringe';
import type { SuccessResponse } from '../../../common/classes/api-controller';
import EntityController from '../../../common/classes/entity-controller';
import LoggerService from '../../../common/services/logger.service';
import Middlewares from '../../../common/services/middlewares';
import type { Users } from '../../../db';
import { CreateUserSchema } from '../schemas';
import UsersApiService from '../services/users-api.service';
import type { CreateUserRequest } from '../types';
import { IdSchema } from '../../../common/schemas';

@injectable()
export default class UsersApiController extends EntityController<Users> {
  protected override basePath = '/users';
  declare protected service: UsersApiService;

  constructor(
    service: UsersApiService,
    logger: LoggerService,
    private readonly _middlewares: Middlewares,
  ) {
    super(service, logger);
  }

  override register(app: Application | Router): void {
    this.router.get(
      '/:id',
      this.middleware(this._middlewares.validateParams(IdSchema)),
      this.apiMethod(this.getOne),
    );
    this.router.post(
      '/',
      this.middleware(this._middlewares.validateBody(CreateUserSchema)),
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

  protected override async createOne(request: CreateUserRequest): Promise<SuccessResponse<Users>> {
    const user = await this.service.createOne(request.body);

    return this.toSuccessResponse(user, 'Entity created');
  }
}
