import { ERROR_MESSAGE } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'kuga@gmail.com',
    description: 'The name of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Khongcopass@1',
    description: 'The password of the user',
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?[A-Za-z\d!@#$%^&*]{8,}$/, {
    message: ERROR_MESSAGE.INCORRECT_PASSWORD_FORMAT,
  })
  @IsString()
  password: string;
}
