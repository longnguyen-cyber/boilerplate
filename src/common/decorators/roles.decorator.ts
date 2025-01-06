import { DECORATOR_KEY } from '@common/constants';
import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: any[]) => SetMetadata(DECORATOR_KEY.ROLES, roles);
