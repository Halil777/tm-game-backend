import { IsEmail, IsNotEmpty } from 'class-validator';

export default class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
