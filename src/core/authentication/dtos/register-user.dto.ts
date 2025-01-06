import { ERROR_MESSAGE } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'kuga@gmail.com',
    description: 'The name of the user',
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: ERROR_MESSAGE.INCORRECT_EMAIL_FORMAT,
  })
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

  @ApiProperty({
    example: 'Kugacter',
    description: 'The name of the user',
  })
  @IsString()
  @IsOptional()
  @Length(6, 255, {
    message: 'name must be between 6 and 255 characters',
  })
  name: string;

  @ApiProperty({
    example: 'https://avatar.iran.liara.run/public',
    description: 'The avatar of the user',
  })
  @IsString()
  @IsOptional()
  avatar: string;
}
