import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { Request, Response } from 'express';
import { cloneDeep, isArray, isEmpty, isInteger, toInteger } from 'lodash';
import { TResponseData } from '@common/types';
import { getSuccessMessage } from '@shared/utils/helpers';
import { DECORATOR_KEY, PAGINATION } from '@common/constants';
import { classValidate } from '@shared/utils/validation';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseDataInteceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const isExcelResponse = req.url.includes('export');
    if (isExcelResponse) {
      return next.handle();
    }

    const message = this.reflector.get<string>(
      DECORATOR_KEY.RESPONSE_MESSAGE,
      context.getHandler(),
    );
    const statusCode = res.statusCode;

    return next.handle().pipe(
      map((data: any) => {
        const page = toInteger(req.query?.page || PAGINATION.DEFAULT_PAGE);
        const limit = toInteger(req.query?.limit || PAGINATION.DEFAULT_LIMIT);
        let total: number;

        // If the data came from findList method with pagination
        // then we need total of records
        if (
          isArray(data) &&
          data.length == 2 &&
          isArray(data[0]) &&
          isInteger(data[1])
        ) {
          total = data[1];
          data = cloneDeep(data[0]);
        }

        // If the data came from findAll method
        // then total is length
        if (total == undefined && isArray(data)) {
          total = data.length;
        }
        const _responseData: TResponseData = {
          ...(!isEmpty(data) ? { data } : null),
          message: message || getSuccessMessage(statusCode),
          status_code: statusCode,
          ...(page >= 0 && limit >= 0 && total >= 0
            ? {
                page,
                limit,
              }
            : null),
          ...(total >= 0 ? { total } : null),
        };

        const responseData = classValidate(TResponseData, _responseData);

        return responseData;
      }),
    );
  }
}
