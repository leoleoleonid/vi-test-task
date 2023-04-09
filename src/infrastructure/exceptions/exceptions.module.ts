import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';
import { I_EXCEPTION_TOKEN } from '../../domain/exceptions/exceptions.interface';

@Module({
  providers: [{ provide: I_EXCEPTION_TOKEN, useClass: ExceptionsService }],
  exports: [I_EXCEPTION_TOKEN],
})
export class ExceptionsModule {}
