import { injectable } from 'tsyringe';
import LoggerService from '../../../common/services/logger.service';
import UsersRepository from '../../users/repositories/users.repository';
import { ApiError } from '../../../common/classes/errors';
import PasswordService from '../../users/services/password.service';
import JWTService from '../../../common/services/jwt.service';

type SignInData = {
  email: string;
  password: string;
};

@injectable()
export default class SignIn {
  private readonly _logger: LoggerService;

  constructor(
    logger: LoggerService,
    private readonly _usersRepository: UsersRepository,
    private readonly _passwordService: PasswordService,
    private readonly _JWTService: JWTService,
  ) {
    this._logger = logger.createChild('SignIn');
  }

  async signIn(data: SignInData) {
    this._logger.info(`Signing in user with email: ${data.email}`);

    const user = await this._usersRepository.getUserForSignIn(data.email);

    if (!user) {
      this._logger.error(`User with email: ${data.email} not found`);

      throw new ApiError('User with provided email or password not found');
    }

    if (!this._passwordService.comparePasswords(data.password, user.salt, user.password)) {
      this._logger.error(`Incorrect password for user with email: ${data.email}`);

      throw new ApiError('User with provided email or password not found');
    }

    this._logger.info(`User with email: ${data.email} successfully signed in`);

    const token = this._JWTService.generateToken({ id: user.id }, '360d');

    return {
      token,
    };
  }
}
