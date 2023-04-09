import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  UserRepositoryInterface,
} from '../../../domain/repositories/user.repository.interface';
import {
  I_EXCEPTION_TOKEN,
  IException,
} from '../../../domain/exceptions/exceptions.interface';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(I_EXCEPTION_TOKEN)
    private readonly exceptionService: IException,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId: number = req.headers['user-id'];
    if (!userId) {
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.userRepository.findById(userId);
    if (!user) {
      this.exceptionService.UnauthorizedException();
    }
    return true;
  }
}
