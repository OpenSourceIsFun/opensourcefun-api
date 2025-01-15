import { KycStatusTypes, UserRoleTypes } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUserContext } from 'abstractions/interfaces';

export class UserContextModel implements IUserContext {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: KycStatusTypes })
  kycStatus: KycStatusTypes;

  @ApiProperty({ enum: UserRoleTypes })
  role: UserRoleTypes;

  @ApiPropertyOptional()
  telegram: string;

  @ApiPropertyOptional()
  discord: string;

  @ApiPropertyOptional()
  twitter: string;
}
