import type { UserRole } from '../../../db/entities/Users';

export type AuthUserCache = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};
