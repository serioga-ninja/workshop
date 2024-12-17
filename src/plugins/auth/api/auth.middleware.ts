import type { NextFunction, Response } from 'express';
import { injectable } from 'tsyringe';
import type { MiddlewareMethod } from '../../../common/classes/api-controller';
import { ApiError } from '../../../common/classes/errors';
import JWTService from '../../../common/services/jwt.service';
import type { ApiRequest } from '../../../common/types/api.types';
import UserCacheService from '../services/user-cache';

@injectable()
export default class AuthMiddleware {
  constructor(
    private readonly _jwtService: JWTService,
    private readonly _userCacheService: UserCacheService,
  ) {

  }

  requireAuth(): MiddlewareMethod {
    return async (req: ApiRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError('Token is required');
      }

      const jwtToken = token.split(' ')[1];
      const data = this._jwtService.verifyToken<{ id: string; }>(jwtToken);

      if (!data) {
        throw new ApiError('Invalid token');
      }

      const user = await this._userCacheService.getAuthUserCache(data.id);

      if (!user) {
        throw new ApiError('User not found');
      }

      req.user = user;

      next();
    };
  }
}
