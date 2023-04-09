import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsString()
  @ApiProperty({ required: true })
  username?: string;
}
