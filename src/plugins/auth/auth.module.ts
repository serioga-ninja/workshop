import { singleton } from 'tsyringe';
import AuthEmails from './services/auth-emails';
import type { Observer } from '../../common/types/observer';
import UserCacheService from './services/user-cache';

@singleton()
export default class AuthModule {
  private readonly _observers: Observer[];

  constructor(
    _authEmails: AuthEmails,
    _userCacheService: UserCacheService,
  ) {
    this._observers = [
      _authEmails,
      _userCacheService,
    ];
  }

  load() {
    this._observers.forEach(observer => observer.load());
  }

  unload() {
    this._observers.forEach(observer => observer.unload());
  }
}
