import { NODE_ENV } from '@common/constants';
import { TResponseError } from '@common/types';
import { LoggerService } from '@core/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { EnvService } from '@shared/env';
import { classValidate } from '@shared/utils/validation';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly env: EnvService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest<Request>();
    const res = context.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.message;

    const detail = (exception.getResponse() as any)?.message;
    const stack = exception.stack;

    const { method, originalUrl: url } = req;
    const log = `Method: ${method} | URI: ${url} | Status: ${status} | Message: ${message} | Detail: ${detail}`;
    this.logger.error(log);

    const _responseError: TResponseError = {
      message,
      status_code: status,
      detail: log,
      ...(this.env.NODE_ENV == NODE_ENV.DEVELOPMENT ? { stack } : null),
    };

    const responseError = classValidate(TResponseError, _responseError);

    res.status(status).send(responseError);
  }
}
