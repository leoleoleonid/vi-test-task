import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ILOGGER_TOCKEN } from '../../domain/logger/logger.interface';

@Module({
  providers: [{ provide: ILOGGER_TOCKEN, useClass: LoggerService }],
  exports: [ILOGGER_TOCKEN],
})
export class LoggerModule {}
