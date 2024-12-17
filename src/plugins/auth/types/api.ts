import type { EmptyObject } from '../../../common/types';
import type { ApiRequest } from '../../../common/types/api.types';

export type SignUpUserRequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type SignInUserRequestBody = {
  email: string;
  password: string;
};

export type SignUpUserRequest = ApiRequest<EmptyObject, SignUpUserRequestBody>;
export type SignInUserRequest = ApiRequest<EmptyObject, SignInUserRequestBody>;
export type ConfirmEmailRequest = ApiRequest<EmptyObject, EmptyObject, { token: string; email: string; }>;
