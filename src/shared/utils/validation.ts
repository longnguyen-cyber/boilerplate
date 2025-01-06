import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const classValidate = <T = unknown>(
  validationClass: ClassConstructor<T>,
  config: Record<string, any>,
  isEnv = false,
): T => {
  const object = plainToInstance(validationClass, config, {
    enableImplicitConversion: true,
  }) as object;

  const errors = validateSync(object, {
    skipMissingProperties: false,
    ...(isEnv
      ? null
      : {
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
  });
  if (errors.length) {
    if (isEnv) {
      throw new Error(errors.map((error) => error.toString()).join('\n'));
    }

    const details = [];
    for (let i = 0; i < errors.length; i++) {
      const error = errors[i];
      details.push(...Object.values(error.constraints));
    }
    throw new BadRequestException(details);
  }

  return object as T;
};
