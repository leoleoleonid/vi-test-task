import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/model/user';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async insert(username: string): Promise<void> {
    const userE = new UserEntity();
    userE.username = username;
    await this.userEntityRepository.insert(userE);
  }

  async findById(id: number): Promise<User> {
    const userE = await this.userEntityRepository.findOneBy({ id });
    return userE ? this.toUser(userE) : null;
  }
  async findByName(username: string): Promise<User> {
    const userE = await this.userEntityRepository.findOneBy({ username });
    return userE ? this.toUser(userE) : null;
  }

  private toUser(userEntity: UserEntity): User {
    const user = new User();
    user.id = userEntity.id;
    user.username = userEntity.username;
    return user;
  }
}
