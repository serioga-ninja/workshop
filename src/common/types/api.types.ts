import type { Request } from 'express';
import type { EmptyObject } from './index';
import type { AuthorizedUser } from '../../plugins/auth/types';

export type ResponseStatus = 'success' | 'error';
export type ApiRequest<
  P = EmptyObject,
  ReqBody = EmptyObject,
  ReqQuery = EmptyObject,
> = Request<P, EmptyObject, ReqBody, ReqQuery> & { user?: AuthorizedUser; };
export type AuthRequest<
  P = EmptyObject,
  ReqBody = EmptyObject,
  ReqQuery = EmptyObject,
> = ApiRequest<P, ReqBody, ReqQuery> & { user: AuthorizedUser; };
export type GetOneRequest = ApiRequest<{ id: string; }>;
export type CreateOneRequest<T> = ApiRequest<EmptyObject, T>;
export type UpdateOneRequest<T> = ApiRequest<{ id: string; }, T>;
export type DeleteOneRequest = ApiRequest<{ id: string; }>;
export type GetListPagedRequest<T> = AuthRequest<EmptyObject, EmptyObject, T>;
