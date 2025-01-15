import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReferralCode } from '@prisma/client';

export class ReferralCodeModel implements ReferralCode {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiPropertyOptional()
  userId: string | null;

  @ApiProperty()
  createdAt: Date;
}
