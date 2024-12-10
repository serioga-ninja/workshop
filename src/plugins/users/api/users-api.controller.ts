import { injectable } from 'tsyringe';
import type { SuccessResponse } from '../../../common/classes/api-controller';
import EntityController from '../../../common/classes/entity-controller';
import { IdSchema } from '../../../common/schemas';
import LoggerService from '../../../common/services/logger.service';
import Middlewares from '../../../common/services/middlewares';
import type { Users } from '../../../db';
import { CreateUserSchema } from '../schemas';
import UsersApiService from '../services/users-api.service';
import type { CreateUserRequest } from '../types';

@injectable()
export default class UsersApiController extends EntityController<Users> {
  declare protected service: UsersApiService;

  constructor(
    service: UsersApiService,
    logger: LoggerService,
    private readonly _middlewares: Middlewares,
  ) {
    super(service, logger);
  }

  override register() {
    this.get(
      '/:id',
      this._middlewares.validateParams(IdSchema),
      this.getOne,
    );
    this.post(
      '/',
      this._middlewares.validateBody(CreateUserSchema),
      this.createOne,
    );
    this.put(
      '/:id',
      this.updateOne,
    );
    this.delete(
      '/:id',
      this.deleteOne,
    );

    return super.register();
  }

  protected override async createOne(request: CreateUserRequest): Promise<SuccessResponse<Users>> {
    const user = await this.service.createOne(request.body);

    return this.toSuccessResponse(user, 'Entity created');
  }
}
