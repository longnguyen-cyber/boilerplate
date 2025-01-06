import { SUCCESS_CODE } from '@common/constants';
import { LoggerService } from '@core/logger/logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: (error?: any) => void) {
    const start = new Date().getTime();
    const { method, originalUrl: url } = req;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const end = new Date().getTime();

      if (Object.values(SUCCESS_CODE).includes(statusCode)) {
        this.logger.log(
          `Method: ${method} | URI: ${url} | Status: ${statusCode} | Message: ${statusMessage} | Time: ${end - start}ms`,
        );
      }
    });

    next();
  }
}
