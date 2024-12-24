import { injectable } from 'tsyringe';
import type { UploadedFile } from 'express-fileupload';
import type { SuccessResponse } from '../../../common/classes/api-controller';
import EntityController from '../../../common/classes/entity-controller';
import { IdSchema } from '../../../common/schemas';
import LoggerService from '../../../common/services/logger.service';
import Middlewares from '../../../common/services/middlewares';
import type { Users } from '../../../db';
import { CreateUserSchema } from '../schemas';
import UsersApiService from '../services/users-api.service';
import type { CreateUserRequest, UploadAvatarRequest } from '../types';
import UserAvatarService from '../services/user-avatar.service';

@injectable()
export default class UsersApiController extends EntityController<Users> {
  declare protected service: UsersApiService;

  constructor(
    service: UsersApiService,
    logger: LoggerService,
    private readonly _middlewares: Middlewares,
    private readonly _userAvatar: UserAvatarService,
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
    this.post(
      '/:id/avatar',
      this.uploadAvatar,
    );

    return super.register();
  }

  protected async uploadAvatar(req: UploadAvatarRequest) {
    await this._userAvatar.uploadUserAvatar(req.params.id, req.files?.file as UploadedFile);

    return this.toSuccessResponse({}, 'Avatar uploaded');
  }

  protected override async createOne(request: CreateUserRequest): Promise<SuccessResponse<Users>> {
    const user = await this.service.createOne(request.body);

    return this.toSuccessResponse(user, 'Entity created');
  }
}
