import { KycStatusTypes, UserRoleTypes, User } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserModel implements User {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: UserRoleTypes })
  role: UserRoleTypes;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  kycId: string;

  @ApiProperty({ enum: KycStatusTypes })
  kycStatus: KycStatusTypes;

  @ApiPropertyOptional()
  telegram: string;

  @ApiPropertyOptional()
  discord: string;

  @ApiPropertyOptional()
  twitter: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  myReferralCode: any | null;

  @ApiPropertyOptional()
  inviteReferralCode: string | null;
}
