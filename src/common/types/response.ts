import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TResponseData<T = unknown> {
  @IsOptional()
  data?: T;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  status_code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  total?: number;
}

export class TResponseError {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  status_code: number;

  @IsString()
  @IsOptional()
  detail?: string;

  @IsString()
  @IsOptional()
  stack?: string;
}
