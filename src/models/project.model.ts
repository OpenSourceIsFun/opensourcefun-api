import { Project } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectModel implements Partial<Project> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  alias: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  network: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  address: string;

  @ApiPropertyOptional()
  logoFileId: string;

  @ApiPropertyOptional()
  bannerFileId: string;

  @ApiPropertyOptional()
  overview: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  majorContributor: string;

  @ApiPropertyOptional()
  preferredExperience: string;

  @ApiPropertyOptional()
  totalAllocation: string;

  @ApiPropertyOptional()
  telegram: string;

  @ApiPropertyOptional()
  discord: string;

  @ApiPropertyOptional()
  twitter: string;

  @ApiPropertyOptional()
  siteUrl: string;

  @ApiProperty()
  createdAt: Date;
}
