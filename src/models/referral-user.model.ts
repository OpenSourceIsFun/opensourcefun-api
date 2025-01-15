import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReferralUserModel {
  @ApiPropertyOptional()
  wallet: string | null;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  reward: number;

  @ApiProperty()
  createdAt: Date;
}
