import type { Users } from '../../../db';

export * from './api';

export type AuthorizedUser = Pick<Users, 'id' | 'email' | 'role' | 'firstName' | 'lastName'>;
