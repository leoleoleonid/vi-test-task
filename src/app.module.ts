import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      // TODO add config validation
      // validationSchema: Joi.object({ ... }),
    }),
    TypeOrmConfigModule,
    ControllersModule,
    CommandModule,
    LoggerModule,
    ExceptionsModule,
  ],
})
export class AppModule {}
