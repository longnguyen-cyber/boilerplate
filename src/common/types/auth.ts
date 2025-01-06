import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TAccessTokenPayload {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsOptional()
  iat?: number;

  @IsNumber()
  @IsOptional()
  exp?: number;
}
