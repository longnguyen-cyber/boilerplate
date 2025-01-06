import { ERROR_MESSAGE } from '@common/constants';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsOptional()
  oldPassword?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?[A-Za-z\d!@#$%^&*]{8,}$/, {
    message: ERROR_MESSAGE.INCORRECT_PASSWORD_FORMAT,
  })
  newPassword: string;
}
