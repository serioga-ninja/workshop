import type { Application, Router } from 'express';
import { pick } from 'lodash';
import { injectable } from 'tsyringe';
import type { SuccessResponse } from '../../../common/classes/api-controller';
import EntityController from '../../../common/classes/entity-controller';
import LoggerService from '../../../common/services/logger.service';
import type { Users } from '../../../db';
import UsersApiService from '../services/users-api.service';
import type { CreateUserRequest, CreateUserRequestBody } from '../types';

@injectable()
export default class UsersApiController extends EntityController<Users> {
  protected override basePath = '/users';
  declare protected service: UsersApiService;

  constructor(
    service: UsersApiService,
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

  protected override async createOne(request: CreateUserRequest): Promise<SuccessResponse<Users>> {
    const data = pick(
      request.body,
      ['email', 'password', 'firstName', 'lastName'] as (keyof CreateUserRequestBody)[],
    );
    const user = await this.service.createOne(data);

    return this.toSuccessResponse(user, 'Entity created');
  }
}
