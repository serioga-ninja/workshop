import { injectable } from 'tsyringe';
import type { Router } from 'express';
import ApiController from '../../../common/classes/api-controller';
import type { SignUpUserRequest } from '../types';
import SignUp from '../services/sign-up';
import LoggerService from '../../../common/services/logger.service';

@injectable()
export default class AuthApiController extends ApiController {
  constructor(
    logger: LoggerService,
    private readonly _signUp: SignUp,
  ) {
    super(logger);
  }

  override register(): Router {
    this.post('/sign-up', this.signUp);

    return super.register();
  }

  protected async signUp(req: SignUpUserRequest) {
    const user = await this._signUp.signUp(req.body);

    return this.toSuccessResponse(user, 'User signed up successfully');
  }
}
