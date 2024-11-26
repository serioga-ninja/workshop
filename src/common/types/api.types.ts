import type { Request } from 'express';
import type { EmptyObject } from './index';

export type ResponseStatus = 'success' | 'error';
export type ApiRequest<
  P = EmptyObject,
  ReqBody = EmptyObject,
  ReqQuery = EmptyObject,
> = Request<P, EmptyObject, ReqBody, ReqQuery>;
export type GetOneRequest = ApiRequest<{ id: string; }>;
export type CreateOneRequest<T> = ApiRequest<EmptyObject, T>;
export type UpdateOneRequest<T> = ApiRequest<{ id: string; }, T>;
export type DeleteOneRequest = ApiRequest<{ id: string; }>;
export type GetListPagedRequest<T> = ApiRequest<EmptyObject, EmptyObject, T>;
