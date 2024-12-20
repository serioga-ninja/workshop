import { injectable } from 'tsyringe';
import type { Router } from 'express';
import ApiController from '../../../common/classes/api-controller';
import type { ConfirmEmailRequest, SignInUserRequest, SignUpUserRequest } from '../types';
import SignUp from '../services/sign-up';
import LoggerService from '../../../common/services/logger.service';
import SignIn from '../services/sign-in';
import ConfirmEmailService from '../services/confirm-email';

@injectable()
export default class AuthApiController extends ApiController {
  constructor(
    logger: LoggerService,
    private readonly _signUp: SignUp,
    private readonly _signIn: SignIn,
    private readonly _confirmEmailService: ConfirmEmailService,
  ) {
    super(logger);
  }

  override register(): Router {
    this.post('/sign-up', this.signUp);
    this.post('/sign-in', this.signIn);
    this.get('/confirm-email', this.confirmEmail);

    return super.register();
  }

  protected async signUp(req: SignUpUserRequest) {
    const user = await this._signUp.signUp(req.body);

    return this.toSuccessResponse(user, 'User signed up successfully');
  }

  protected async signIn(req: SignInUserRequest) {
    const user = await this._signIn.signIn(req.body);

    return this.toSuccessResponse(user, 'User signed in successfully');
  }

  protected async confirmEmail(req: ConfirmEmailRequest) {
    await this._confirmEmailService.confirmEmail(req.query.token, req.query.email);

    return this.toSuccessResponse({}, 'Email confirmed successfully');
  }
}
