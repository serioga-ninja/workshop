import { Application, Request, Response, Router } from 'express';
import { PathParams } from 'express-serve-static-core';
import { TAny } from '../types';
import { ApiRequest } from '../types/api.types';

export type SuccessResponse<T extends (object | object[]) = object> = {
  data: T;
  status: 'success';
  message?: string;
}
type Method<T extends SuccessResponse | never = SuccessResponse> = (req: ApiRequest<TAny, TAny, TAny>, res: Response) => Promise<T>;
type ErrorResponse = {
  status: 'error';
  message: string;
  statusCode?: string;
}

export default abstract class ApiController {
  protected abstract basePath: PathParams;
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  register(app: Application | Router): void {
    app.use(this.basePath, this.router as TAny);
  }

  protected apiMethod(method: Method) {
    return async (req: Request, res: Response) => {
      try {
        const result = await method.call(this, req, res);

        res.status(400).json(result);
      } catch (error) {
        console.error(error);

        res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
          statusCode: 'INTERNAL_SERVER_ERROR',
        } as ErrorResponse);
      }

      return this.router;
    }
  }

  protected toSuccessResponse<T extends object>(data: T, message?: string): SuccessResponse<T> {
    return {
      data,
      status: 'success',
      message,
    }
  }
}
