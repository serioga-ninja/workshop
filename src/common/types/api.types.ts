import type { Request } from 'express';
import type { EmptyObject } from './index';

export type ApiRequest<
  P = EmptyObject,
  ReqBody = EmptyObject,
  ReqQuery = EmptyObject,
> = Request<P, EmptyObject, ReqBody, ReqQuery>;
export type GetOneApiRequest = ApiRequest<{ id: string }>;
