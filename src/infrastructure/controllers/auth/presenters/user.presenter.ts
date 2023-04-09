import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
}
