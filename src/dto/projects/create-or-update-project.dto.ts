import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrUpdateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  alias: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  token: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  network: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  adminId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoFileId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bannerFileId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  overview?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  majorContributor?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  preferredExperience?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  totalAllocation?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telegram?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  discord?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  twitter?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  github?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  siteUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
