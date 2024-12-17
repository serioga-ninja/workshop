import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';

import '../../libs/winston';
import type { TAny } from '../types';

@injectable()
export default class LoggerService {
  constructor(
    @inject(Logger) private _logger: Logger,
  ) {
  }

  info(message: string, ...meta: TAny[]): void {
    this._logger.info(message, ...meta);
  }

  error(message: string, ...meta: TAny[]): void {
    this._logger.error(
      message,
      ...meta,
    );
  }

  warn(message: string, ...meta: TAny[]): void {
    this._logger.warn(
      message,
      ...meta,
    );
  }

  debug(message: string, ...meta: TAny[]): void {
    this._logger.debug(
      message,
      ...meta,
    );
  }

  logError(error: unknown): void {
    if (error instanceof Error) {
      this._logger.error(error.message, error);
    } else {
      this._logger.error(error);
    }
  }

  createChild(module: string): LoggerService {
    return new LoggerService(this._logger.child({ module }));
  }
}
