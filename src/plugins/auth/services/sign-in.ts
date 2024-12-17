import { EventEmitter } from 'events';
import { singleton } from 'tsyringe';
import { ApiError } from '../../../common/classes/errors';
import JWTService from '../../../common/services/jwt.service';
import LoggerService from '../../../common/services/logger.service';
import UsersRepository from '../../users/repositories/users.repository';
import PasswordService from '../../users/services/password.service';

type SignInData = {
  email: string;
  password: string;
};

export type UserSignedInData = {
  userId: string;
};

@singleton()
export default class SignIn extends EventEmitter {
  public static readonly EVENT_USER_SIGNED_IN = 'userSignedIn';

  private readonly _logger: LoggerService;

  constructor(
    logger: LoggerService,
    private readonly _usersRepository: UsersRepository,
    private readonly _passwordService: PasswordService,
    private readonly _JWTService: JWTService,
  ) {
    super();

    this._logger = logger.createChild('SignIn');
  }

  async signIn(data: SignInData) {
    this._logger.info(`Signing in user with email: ${data.email}`);

    const user = await this._usersRepository.getUserForSignIn(data.email);

    if (!user) {
      this._logger.error(`User with email: ${data.email} not found`);

      throw new ApiError('User with provided email or password not found');
    }

    if (!user.emailConfirmedAt) {
      throw new ApiError(`User with email: ${data.email} not confirmed`);
    }

    if (!this._passwordService.comparePasswords(data.password, user.salt, user.password)) {
      this._logger.error(`Incorrect password for user with email: ${data.email}`);

      throw new ApiError('User with provided email or password not found');
    }

    this._logger.info(`User with email: ${data.email} successfully signed in`);

    const token = this._JWTService.generateToken({ id: user.id }, '360d');

    this.emit(SignIn.EVENT_USER_SIGNED_IN, {
      userId: user.id,
    } as UserSignedInData);

    return {
      token,
    };
  }
}
