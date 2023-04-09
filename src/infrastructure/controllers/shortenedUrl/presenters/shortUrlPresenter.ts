import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlPresenter {
  @ApiProperty()
  shortUrl: string;
}
