import { ERROR_MESSAGE } from '@common/constants';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(e: any, user: any) {
    if (e || !user) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_UNAUTHORIZED);
    }
    return user;
  }
}
