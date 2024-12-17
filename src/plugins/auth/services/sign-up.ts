import { EventEmitter } from 'events';
import { singleton } from 'tsyringe';
import { EntityStatus } from '../../../common/constants';
import { generateRandomString } from '../../../common/helpers/string';
import LoggerService from '../../../common/services/logger.service';
import type Users from '../../../db/entities/Users';
import { UserRole } from '../../../db/entities/Users';
import UsersRepository from '../../users/repositories/users.repository';
import PasswordService from '../../users/services/password.service';

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignUpEventData = {
  user: Users;
};

@singleton()
export default class SignUp extends EventEmitter {
  public static readonly EVENT_USER_SIGNED_UP = 'user-signed-up';

  private readonly _logger: LoggerService;

  constructor(
    logger: LoggerService,
    private readonly _usersRepository: UsersRepository,
    private readonly _passwordService: PasswordService,
  ) {
    super();
    this._logger = logger.createChild('SignUp');
  }

  async signUp(data: SignUpData) {
    this._logger.info(`Signing up user with email: ${data.email}`);

    const { salt, hashedPassword } = this._passwordService.generatePassword(data.password);

    const user = await this._usersRepository.createOne({
      ...data,
      emailConfirmationToken: generateRandomString(30),
      password: hashedPassword,
      salt,
      role: UserRole.User,
      entityStatus: EntityStatus.Active,
    });

    this._logger.info(`User with email: ${data.email} signed up successfully`);

    this.emit(SignUp.EVENT_USER_SIGNED_UP, { user } as SignUpEventData);

    return user;
  }
}
