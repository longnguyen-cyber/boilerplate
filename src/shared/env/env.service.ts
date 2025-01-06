import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get NODE_ENV() {
    return this.configService.get<string>('NODE_ENV');
  }

  get PORT() {
    return this.configService.get<string>('PORT');
  }

  get DATABASE_CONNECTION() {
    return this.configService.get<string>('DATABASE_CONNECTION');
  }

  get DATABASE_PORT() {
    return this.configService.get<string>('DATABASE_PORT');
  }

  get DATABASE_USERNAME() {
    return this.configService.get<string>('DATABASE_USERNAME');
  }

  get DATABASE_PASSWORD() {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get DATABASE_NAME() {
    return this.configService.get<string>('DATABASE_NAME');
  }

  get DATABASE_URL() {
    return this.configService.get<string>('DATABASE_URL');
  }

  get ACCESS_TOKEN_SECRET() {
    return this.configService.get<string>('ACCESS_TOKEN_SECRET');
  }
}
