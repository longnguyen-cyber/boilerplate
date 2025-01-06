import { ERROR_MESSAGE } from '@common/constants';
import {
  ExecutionContext,
  MethodNotAllowedException,
  createParamDecorator,
} from '@nestjs/common';
import { user as UserEntity } from '@prisma/client';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() != 'http') {
      throw new MethodNotAllowedException(ERROR_MESSAGE.METHOD_NOT_ALLOWED);
    }

    const req = context.switchToHttp().getRequest<Request>();
    if (req?.user?.hasOwnProperty('password')) {
      delete (req.user as UserEntity).password;
    }
    return req.user;
  },
);
