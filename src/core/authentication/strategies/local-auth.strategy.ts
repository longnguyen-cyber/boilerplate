import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { classValidate } from '@shared/utils/validation';
import { user as AccountEntity } from '@prisma/client';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<AccountEntity> {
    try {
      classValidate(LoginDto, req.body);
      const user = await this.authService.validateCredential(
        username,
        password,
      );

      delete user?.password;
      return user;
    } catch (e) {
      throw e;
    }
  }
}
