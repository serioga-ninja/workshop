import { IsEmail, IsString, MaxLength } from 'class-validator';
import type { SignUpUserRequestBody } from '../types';

export default class SignUpSchema implements SignUpUserRequestBody {
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

  constructor(data: SignUpUserRequestBody) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
  }
}
