import { ILogger, ILOGGER_TOCKEN } from '../domain/logger/logger.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  UserRepositoryInterface,
} from '../domain/repositories/user.repository.interface';
import { User } from '../domain/model/user';
import {
  I_EXCEPTION_TOKEN,
  IException,
} from '../domain/exceptions/exceptions.interface';

@Injectable()
export class AuthUsecases {
  constructor(
    @Inject(ILOGGER_TOCKEN)
    private readonly logger: ILogger,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(I_EXCEPTION_TOKEN)
    private readonly exceptionService: IException,
  ) {}

  async login(username: string): Promise<User> {
    let user: User = await this.userRepository.findByName(username);
    if (!user) {
      this.logger.log('Create new user', `Username : ${username}`);
      await this.userRepository.insert(username);
      user = await this.userRepository.findByName(username);
    }
    this.logger.log('Auth login', `Username : ${username}`);
    return user;
  }

  async getUserById(userId: number): Promise<User> {
    let user: User = await this.userRepository.findById(userId);
    if (!user) {
      this.logger.error('No such user', `userId : ${userId}`);
      this.exceptionService.UnauthorizedException();
    }
    this.logger.log('Authenticated', `userId : ${userId}`);
    return user;
  }
}
