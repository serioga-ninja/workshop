import { injectable } from 'tsyringe';
import { omit } from 'lodash';
import RepositoryEntity from '../../../common/classes/entity-repository';
import { Users } from '../../../db';

@injectable()
export default class UsersRepository extends RepositoryEntity<Users> {
  override model = Users;
  override alias = 'users';

  override async createOne(data: Partial<Users>): Promise<Users> {
    const user = await super.createOne(data);

    return omit(user, ['password', 'salt'] as (keyof Users)[]) as Users;
  }

  /**
   * Get user for sign in
   */
  getUserForSignIn(email: string) {
    return this.getRepository().findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        salt: true,
      },
    });
  }
}
