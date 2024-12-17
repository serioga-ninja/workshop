import { Column, Entity } from 'typeorm';
import EntityBase from '../../common/classes/entity-base';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Author = 'author',
}

@Entity('users', { schema: 'public' })
export default class Users extends EntityBase {
  @Column('character varying', { name: 'first_name', length: 20 })
    firstName: string;

  @Column('character varying', { name: 'last_name', length: 20 })
    lastName: string;

  @Column('character varying')
    email: string;

  @Column('varchar', { name: 'password', length: 255, select: false })
    password: string;

  @Column('varchar', { select: false })
    salt: string;

  @Column('enum', { name: 'role', enum: UserRole, default: UserRole.User })
    role: UserRole;

  @Column('varchar', { name: 'email_confirmation_token', length: 30, select: false })
    emailConfirmationToken: string;

  @Column('timestamp', { name: 'email_confirmed_at', select: false })
    emailConfirmedAt: Date;
}
