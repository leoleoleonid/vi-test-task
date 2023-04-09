import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LoggerModule } from '../logger/logger.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ShortenedUrlUsecases } from '../../usecases/shortenedUrl.usecases';
import { AuthUsecases } from '../../usecases/auth.usecases';
import { AuthController } from './auth/auth.controller';
import { ShortenedUrlController } from './shortenedUrl/shortenedUrl.controller';

@Module({
  imports: [LoggerModule, ExceptionsModule, RepositoriesModule],
  controllers: [AuthController, ShortenedUrlController],
  providers: [ShortenedUrlUsecases, AuthUsecases],
})
export class ControllersModule {}
