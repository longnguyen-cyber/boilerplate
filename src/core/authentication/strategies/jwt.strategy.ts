import { ERROR_MESSAGE } from '@common/constants';
import { TAccessTokenPayload } from '@common/types';
import { TUserEntity } from '@common/types/account';
import { PrismaService } from '@core/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EnvService } from '@shared/env';
import { classValidate } from '@shared/utils/validation';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly env: EnvService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: TAccessTokenPayload,
  ): Promise<TUserEntity> {
    const unauthorized = new UnauthorizedException(
      ERROR_MESSAGE.USER_UNAUTHORIZED,
    );
    try {
      classValidate(TAccessTokenPayload, payload);

      const user = await this.prismaService.user.findFirst({
        where: { id: payload.id },
      });

      delete user?.password;
      return user;
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw unauthorized;
      }
      throw e;
    }
  }
}
