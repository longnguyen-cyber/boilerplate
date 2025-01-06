import { ERROR_MESSAGE } from '@common/constants';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(e: any, user: any) {
    if (e || !user) {
      throw e || new BadRequestException(ERROR_MESSAGE.INVALID_CREDENTIAL);
    }

    delete user?.password;
    return user;
  }
}
