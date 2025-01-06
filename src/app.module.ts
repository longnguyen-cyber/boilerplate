import { HttpExceptionFilter } from '@common/filters';
import { LoggerMiddleware } from '@common/middlewares';
import { AuthModule } from '@core/authentication/auth.module';
import { LoggerModule } from '@core/logger/logger.module';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';

import { PrismaModule } from '@core/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { HttpModule } from '@nestjs/axios';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EnvModule } from '@shared/env';

import configurations from '@core/configs';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from '@app.controller';

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];

const modules = [
  AuthModule,
  EnvModule,
  PrismaModule,
  UserModule,
  LoggerModule,
  HttpModule,
];

@Module({
  imports: [
    ...modules,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: configurations,
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
    }),

    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',

        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [...providers],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
