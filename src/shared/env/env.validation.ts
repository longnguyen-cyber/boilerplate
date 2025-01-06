import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class EnvValidation {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_CONNECTION: string;

  @Type(() => Number)
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;
}
