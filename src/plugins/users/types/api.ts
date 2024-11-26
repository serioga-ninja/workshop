import type { CreateOneRequest } from '../../../common/types/api.types';

export type CreateUserRequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type CreateUserRequest = CreateOneRequest<CreateUserRequestBody>;
