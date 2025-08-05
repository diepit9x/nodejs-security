import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  email: string = '';

  @MinLength(6)
  password: string = '';

  @IsNotEmpty()
  name: string = '';
}
