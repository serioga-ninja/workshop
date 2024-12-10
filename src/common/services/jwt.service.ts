import { injectable } from 'tsyringe';
import * as jwt from 'jsonwebtoken';
import LoggerService from './logger.service';
import config from '../../config';
import { ServerError } from '../classes/errors';

const { JWT_SECRET } = config;

@injectable()
export default class JWTService {
  private readonly _logger: LoggerService;

  constructor(
    logger: LoggerService,
  ) {
    this._logger = logger.createChild('JWTService');
  }

  generateToken(data: object, expiresIn: string): string {
    if (!JWT_SECRET) {
      this._logger.error('JWT_SECRET is not defined in the environment variables');

      throw new ServerError('JWT_SECRET is not defined in the environment variables');
    }

    return jwt.sign(data, JWT_SECRET, { expiresIn });
  }

  verifyToken<T>(token: string): T | null {
    try {
      return jwt.verify(token, JWT_SECRET) as T;
    } catch (error) {
      this._logger.error('Error while verifying token', error);

      return null;
    }
  }
}
