import { singleton } from 'tsyringe';
import AuthEmails from './services/auth-emails';
import type { Observer } from '../../common/types/observer';

@singleton()
export default class AuthModule {
  private readonly _observers: Observer[];

  constructor(
    _authEmails: AuthEmails,
  ) {
    this._observers = [_authEmails];
  }

  load() {
    this._observers.forEach(observer => observer.load());
  }

  unload() {
    this._observers.forEach(observer => observer.unload());
  }
}
