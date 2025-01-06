import { LoggerModule } from '@core/logger/logger.module';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';

@Global()
@Module({
  imports: [JwtModule, LoggerModule],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
