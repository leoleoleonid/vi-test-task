import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}
  getDatabaseHost(): string {
    return this.configService.get<string>('POSTGRES_HOST') || 'localhost';
  }
  getDatabasePort(): number {
    return this.configService.get<number>('POSTGRES_PORT');
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('POSTGRES_USER');
  }
  getDatabasePassword(): string {
    return this.configService.get<string>('POSTGRES_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('POSTGRES_DB');
  }
  getDatabaseSchema(): string {
    return this.configService.get<string>('POSTGRES_SCHEMA');
  }
  getDatabaseSync(): boolean {
    return this.configService.get<string>('NODE_ENV') !== 'production';
  }
}
