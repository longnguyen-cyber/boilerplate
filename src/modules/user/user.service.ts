import { ERROR_MESSAGE } from '@common/constants';
import { USER_ORDER_BY } from '@common/constants/order';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, user as UserEntity } from '@prisma/client';
import { EnvService } from '@shared/env';
import { PrismaService } from '@core/prisma/prisma.service';
import { toNonAccentVietnamese } from '@shared/utils/helpers';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly envService: EnvService,
  ) {}

  update = async (params: {
    select?: Prisma.userSelect;
    data: Prisma.userUncheckedUpdateInput;
    where: Prisma.userWhereUniqueInput;
  }): Promise<UserEntity> => {
    const { select, data, where } = params;
    try {
      const _user = await this.prismaService.user.findUnique({
        where,
      });

      if (!_user) throw new NotFoundException(ERROR_MESSAGE.USER_NOT_EXIST);

      const user = await this.prismaService.user.update({
        select,
        where,
        data: {
          ...data,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  findAll = async (params: {
    keyword?: string;
    page?: number;
    limit?: number;
    orderBy?: string;
    sort?: 'asc' | 'desc';
  }): Promise<[UserEntity[], number]> => {
    const { keyword, page, limit, orderBy, sort } = params;
    const where: Prisma.userWhereInput = {};

    if (keyword) {
      const _keyword = toNonAccentVietnamese(keyword).toLowerCase();
      where.OR = [
        {
          name: {
            contains: keyword,
          },
        },
        {
          email: {
            contains: _keyword,
          },
        },
      ];
    }
    let orderByObject = {};
    switch (orderBy) {
      case USER_ORDER_BY.NAME:
        orderByObject = {
          name: sort,
        };
        break;
      case USER_ORDER_BY.EMAIL:
        orderByObject = {
          email: sort,
        };
        break;
      default:
        orderByObject = {
          [orderBy]: sort,
        };
    }
    try {
      const users = await this.prismaService.user.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: orderByObject,
      });
      const count = await this.prismaService.user.count({
        where,
      });
      return [users, count];
    } catch (error) {
      throw new HttpException('Error finding all Users', 400);
    }
  };

  findOne = async (params: {
    where: Prisma.userWhereUniqueInput;
  }): Promise<UserEntity> => {
    const { where } = params;
    try {
      const user = await this.prismaService.user.findUnique({
        where,
      });
      if (!user) throw new NotFoundException(ERROR_MESSAGE.USER_NOT_EXIST);
      return user;
    } catch (error) {
      throw error;
    }
  };
}
