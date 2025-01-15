import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telegram: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  discord: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  twitter: string;
}
