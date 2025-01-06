import { Global, Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import { EnvValidation } from './env.validation';
import { ENV_FILE_PATH } from '@common/constants';
import { classValidate } from '@shared/utils/validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV_FILE_PATH,
      validate: (config: Record<string, any>) => {
        return classValidate(EnvValidation, config, true);
      },
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
