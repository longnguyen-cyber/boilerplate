import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseDataInteceptor } from '@common/interceptors';
// import { EnvService } from '@shared/env';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('CRM APIs')
    .setDescription('The CRM API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //const env = app.get(EnvService); unused variable
  const reflector = app.get(Reflector);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseDataInteceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 5000;
  const env = process.env.NODE_ENV || 'dev'; // Mặc định là 'dev' nếu không có biến ENV

  await app.listen(port);

  console.log(`Current Environment: ${env}`);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/docs`);
}
bootstrap();
