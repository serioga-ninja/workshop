import type { CreateOneRequest } from '../../../common/types/api.types';
import type { CreateUserSchema } from '../schemas';

export type CreateUserRequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type CreateUserRequest = CreateOneRequest<CreateUserSchema>;
