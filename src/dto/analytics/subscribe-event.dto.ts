import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SubscribeEventDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
