import type { EmptyObject } from '../../../common/types';
import type { ApiRequest } from '../../../common/types/api.types';

export type SignUpUserRequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type SignUpUserRequest = ApiRequest<EmptyObject, SignUpUserRequestBody>;
