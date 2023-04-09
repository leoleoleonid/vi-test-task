import { ApiProperty } from '@nestjs/swagger';

export class UrlStatsPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  prefix: string;
  @ApiProperty()
  originalUrl: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  accessCounter: number;
  @ApiProperty()
  shortenCounter: number;
}
