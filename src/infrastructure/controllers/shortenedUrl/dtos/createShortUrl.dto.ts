import { IsUrl, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createShortUrlDto {
  @IsString()
  @IsUrl()
  @ApiProperty({ required: true })
  url: string;
}
