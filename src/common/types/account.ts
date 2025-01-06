import { user } from '@prisma/client';

export type TUserEntity = Partial<Omit<user, 'password'>>;
