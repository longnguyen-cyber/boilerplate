import { DECORATOR_KEY } from '@common/constants';
import { SetMetadata } from '@nestjs/common';

export const ResponseMessage = (message: string) =>
  SetMetadata(DECORATOR_KEY.RESPONSE_MESSAGE, message);
