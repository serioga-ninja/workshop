import { singleton } from 'tsyringe';
import CacheService from '../../../common/services/cache.service';
import LoggerService from '../../../common/services/logger.service';
import type { Observer } from '../../../common/types/observer';
import config from '../../../config';
import UsersRepository from '../../users/repositories/users.repository';
import type { AuthUserCache } from '../types';
import SignIn, { type UserSignedInData } from './sign-in';

const { AUTH_SESSION_EXPIRATION_SECONDS } = config;

@singleton()
export default class UserCacheService implements Observer {
  private readonly _logger: LoggerService;

  constructor(
    _logger: LoggerService,
    private readonly _cacheService: CacheService,
    private readonly _signIn: SignIn,
    private readonly _usersRepository: UsersRepository,
  ) {
    this._logger = _logger.createChild('UserCacheService');
  }

  public load() {
    this._signIn.on(SignIn.EVENT_USER_SIGNED_IN, this.resetAuthUserCache.bind(this));
  }

  public unload() {
    this._signIn.off(SignIn.EVENT_USER_SIGNED_IN, this.resetAuthUserCache.bind(this));
  }

  /**
   * Reset auth user cache
   */
  async resetAuthUserCache(data: UserSignedInData) {
    this._logger.info(`Caching user with id: ${data.userId}`);

    const user = await this._usersRepository.getUserForCache(data.userId);

    this._cacheService.setJSON(this._buildCacheKey(data.userId), user, AUTH_SESSION_EXPIRATION_SECONDS);

    this._logger.info(`User with id: ${data.userId} cached successfully`);

    return user;
  }

  /**
   * Get auth user cache
   */
  async getAuthUserCache(userId: string): Promise<AuthUserCache> {
    return await this._cacheService.getJSON<AuthUserCache>(this._buildCacheKey(userId));
  }

  private _buildCacheKey(userId: string) {
    return `user:${userId}`;
  }
}
