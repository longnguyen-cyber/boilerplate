import { IsOptional, IsIn, IsInt, Min, Max, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string', example: 'sd' })
  keyword?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  @ApiPropertyOptional({ type: 'number', example: 1 })
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit: number = 20;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string', example: 'name' })
  orderBy: string = 'name';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiPropertyOptional({ type: 'string', example: 'asc' })
  sort: 'asc' | 'desc' = 'asc';
}
