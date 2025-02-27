import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SetAdminByEmail {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
