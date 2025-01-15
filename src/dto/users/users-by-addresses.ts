import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UsersByAddresses {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  addresses: string[];
}
