import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthUsecases } from '../../../usecases/auth.usecases';
import { User } from '../../../domain/model/user';
import { UserPresenter } from './presenters/user.presenter';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUsecases: AuthUsecases) {}

  @Post('login')
  @ApiOkResponse({ type: UserPresenter, isArray: true })
  async login(@Body() body: LoginDTO): Promise<User> {
    return this.authUsecases.login(body.username);
  }

  @Get('getUserById/:userId')
  @ApiOkResponse({ type: UserPresenter, isArray: true })
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return this.authUsecases.getUserById(userId);
  }
}
