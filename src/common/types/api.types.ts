import { Request } from 'express';
import { EmptyObject } from './index';

export type ApiRequest<
  P = EmptyObject,
  ReqBody = EmptyObject,
  ReqQuery = EmptyObject,
> = Request<P, EmptyObject, ReqBody, ReqQuery>;
export type GetOneApiRequest = ApiRequest<{ id: string }>;
