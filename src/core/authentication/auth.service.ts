import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { PrismaService } from '@core/prisma/prisma.service';
import { CreateUserDto } from './dtos/register-user.dto';
import { ERROR_MESSAGE } from '@common/constants';
import { user as AccountEntity, TypeUser } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1d',
    });
  }

  async signIn(user: LoginDto) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);
    if (!userExists) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_EXIST);
    }

    return this.generateJwt({
      id: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: CreateUserDto) {
    try {
      const userExists = await this.findUserByEmail(user.email);
      if (userExists) {
        throw new BadRequestException(ERROR_MESSAGE.USER_EXISTED);
      }

      let hashPassword: string;
      let type: TypeUser = TypeUser.normal;
      if (user.password) {
        hashPassword = await hash(user.password, 10);
      } else {
        hashPassword = await hash('google', 10);
        type = TypeUser.google;
      }
      const newUser = await this.prismaService.user.create({
        data: {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          password: hashPassword,
          type,
        },
      });

      return this.generateJwt({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async validateGoogleUser(profile: any) {
    const user = await this.findUserByEmail(profile.email);

    if (!user) {
      return await this.registerUser(profile);
    }

    return user;
  }

  async validateCredential(
    email: string,
    password: string,
  ): Promise<AccountEntity> {
    const incorrect = new BadRequestException(
      ERROR_MESSAGE.INCORRECT_EMAIL_PASSWORD,
    );
    if (!email || !password) {
      throw incorrect;
    }

    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (isEmpty(user)) {
        throw incorrect;
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        throw incorrect;
      }

      return user;
    } catch (e) {
      throw e;
    }
  }
}
