import type { Application, NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import type { PathParams } from 'express-serve-static-core';
import { EntityNotFoundError } from 'typeorm';
import { ErrorStatusCode } from '../constants';
import type LoggerService from '../services/logger.service';
import type { TAny } from '../types';
import type { ApiRequest } from '../types/api.types';
import { ApiError, ApiValidationError, NotFoundError } from './errors';

export type SuccessResponse<T extends (object | object[]) = object> = {
  data: T;
  status: 'success';
  message?: string;
  apiStatusCode: number;
};
type MiddlewareMethod = (req: ApiRequest<TAny, TAny, TAny>, res: Response, next: NextFunction) => Promise<void>;
type Method<T extends SuccessResponse | never = SuccessResponse> = (req: ApiRequest<TAny, TAny, TAny>, res: Response) => Promise<T>;
type ErrorResponse = {
  status: 'error';
  message: string;
  statusCode?: string;
  data: unknown;
  apiStatusCode: number;
};

export default abstract class ApiController {
  protected abstract basePath: PathParams;
  protected router: Router;
  protected logger: LoggerService;

  constructor(logger: LoggerService) {
    this.router = Router();
    this.logger = logger.createChild(this.constructor.name);
  }

  register(app: Application | Router): void {
    app.use(
      this.basePath,
      this.router as TAny,
    );
  }

  protected middleware(method: MiddlewareMethod) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await method.call(this, req as ApiRequest<TAny, TAny, TAny>, res, next);
      } catch (error) {
        this.logger.error(error.message, error);

        const { apiStatusCode, ...rest } = this.toErrorResponse(error);

        res.status(apiStatusCode).json(rest);
      }
    };
  }

  protected apiMethod(method: Method) {
    return async (req: Request, res: Response) => {
      try {
        const { apiStatusCode, ...result } = await method.call(
          this,
          req,
          res,
        );

        res.status(apiStatusCode).json(result);
      } catch (error) {
        this.logger.error(error.message, error);

        const { apiStatusCode, ...rest } = this.toErrorResponse(error);

        res.status(apiStatusCode).json(rest);
      }

      return this.router;
    };
  }

  protected toErrorResponse(error: unknown): ErrorResponse {
    if (!(error instanceof Error)) {
      return {
        status: 'error',
        message: 'Internal Server Error',
        statusCode: ErrorStatusCode.InternalServerError,
        apiStatusCode: 500,
        data: {},
      };
    }

    let message = 'Internal Server Error';
    let statusCode = ErrorStatusCode.InternalServerError;
    let apiStatusCode = 500;
    let data: unknown = {};

    switch (error.constructor) {
      case ApiValidationError:
        message = error.message;
        statusCode = ErrorStatusCode.ValidationError;
        apiStatusCode = 400;
        data = (error as ApiValidationError).data;
        break;
      case ApiError:
        message = error.message;
        statusCode = ErrorStatusCode.ApiError;
        apiStatusCode = 400;
        break;
      case EntityNotFoundError:
      case NotFoundError:
        message = 'Entity not found';
        statusCode = ErrorStatusCode.NotFound;
        apiStatusCode = 404;
        break;
    }

    return {
      status: 'error',
      message,
      statusCode,
      apiStatusCode,
      data,
    };
  }

  protected toSuccessResponse<T extends object>(data: T, message?: string): SuccessResponse<T> {
    return {
      data,
      status: 'success',
      message,
      apiStatusCode: 200,
    };
  }
}
