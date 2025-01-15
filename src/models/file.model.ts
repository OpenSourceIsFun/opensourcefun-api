import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { File } from '@prisma/client';

export class FileModel implements Partial<File> {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  name: string | null;

  @ApiPropertyOptional()
  folder: string | null;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  createdAt: Date;
}
