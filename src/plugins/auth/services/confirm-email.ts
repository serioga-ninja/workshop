import { injectable } from 'tsyringe';
import UsersRepository from '../../users/repositories/users.repository';

@injectable()
export default class ConfirmEmailService {
  constructor(
    private readonly _usersRepository: UsersRepository,
  ) {

  }

  async confirmEmail(token: string, email: string) {
    const user = await this._usersRepository.findOneBy({ email, emailConfirmationToken: token });

    if (!user) {
      throw new Error('Invalid token');
    }

    await this._usersRepository.updateOneBy({ id: user.id }, {
      emailConfirmedAt: new Date(),
    });
  }
}
