import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../entities/user.entity';
import { ShortenedUrlEntity } from '../entities/shortenedUrl.entity';
import { ShortenedUrlRepository } from './shortenedUrl.repository';
import { SHORTENED_URL_REPOSITORY_TOKEN } from '../../domain/repositories/shortenedUrl.repository.interface';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY_TOKEN } from '../../domain/repositories/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ShortenedUrlEntity])],
  providers: [
    {
      provide: SHORTENED_URL_REPOSITORY_TOKEN,
      useClass: ShortenedUrlRepository,
    },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
  ],
  exports: [
    SHORTENED_URL_REPOSITORY_TOKEN,
    USER_REPOSITORY_TOKEN,
    TypeOrmModule,
  ],
})
export class RepositoriesModule {}
