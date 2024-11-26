import { injectable } from 'tsyringe';
import EntityService from '../../../common/classes/entity-service';
import type { Users } from '../../../db';
import UsersRepository from '../repositories/users.repository';
import { UserRole } from '../../../db/entities/Users';
import type { CreateOneUserData } from '../types/users-api.service';
import PasswordService from './password.service';
import { EntityStatus } from '../../../common/constants';

@injectable()
export default class UsersApiService extends EntityService<Users> {
  declare repository: UsersRepository;

  constructor(
    repo: UsersRepository,
    private readonly _passwordService: PasswordService,
  ) {
    super(repo);
  }

  override createOne(data: CreateOneUserData): Promise<Users> {
    const { salt, hashedPassword } = this._passwordService.generatePassword(data.password);

    return super.createOne({
      ...data,
      password: hashedPassword,
      salt,
      role: UserRole.User,
      entityStatus: EntityStatus.Active,
    });
  }
}
