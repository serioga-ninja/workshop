import { injectable } from 'tsyringe';
import { EntityStatus } from '../../../common/constants';
import LoggerService from '../../../common/services/logger.service';
import { UserRole } from '../../../db/entities/Users';
import UsersRepository from '../../users/repositories/users.repository';
import PasswordService from '../../users/services/password.service';

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

@injectable()
export default class SignUp {
  private readonly _logger: LoggerService;

  constructor(
    logger: LoggerService,
    private readonly _usersRepository: UsersRepository,
    private readonly _passwordService: PasswordService,
  ) {
    this._logger = logger.createChild('SignUp');
  }

  async signUp(data: SignUpData) {
    this._logger.info(`Signing up user with email: ${data.email}`);

    const { salt, hashedPassword } = this._passwordService.generatePassword(data.password);

    const user = await this._usersRepository.createOne({
      ...data,
      password: hashedPassword,
      salt,
      role: UserRole.User,
      entityStatus: EntityStatus.Active,
    });

    this._logger.info(`User with email: ${data.email} signed up successfully`);

    return user;
  }
}
