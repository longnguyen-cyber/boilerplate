import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';

import { ERROR_MESSAGE } from '@common/constants';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Age } from './custom-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Nguyen Van A' })
  @Length(6, 255, {
    message: 'name must be between 6 and 255 characters',
  })
  name: string;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{10}$/, {
    message: ERROR_MESSAGE.INCORRECT_PHONE_FORMAT,
  })
  @ApiPropertyOptional({ example: '0123456789' })
  phone: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: ERROR_MESSAGE.INCORRECT_EMAIL_FORMAT,
  })
  @ApiPropertyOptional({ example: 'kuga@gmail.com' })
  email: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 18 })
  @Validate(Age)
  age: number;
}
