import { IsEmail, IsString, MaxLength } from 'class-validator';
import type { CreateUserRequestBody } from '../types';

export default class CreateUserSchema implements CreateUserRequestBody {
  @IsString()
  @MaxLength(20)
    firstName: string;

  @IsString()
  @MaxLength(20)
    lastName: string;

  @IsEmail()
    email: string;

  @IsString({
    message: 'Password is required and must be a string',
  })
    password: string;

  constructor(data: CreateUserRequestBody) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
  }
}
