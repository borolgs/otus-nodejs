/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Error, UniqueConstraintError } from 'sequelize';

@Catch(Error)
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof UniqueConstraintError) {
      const message = exception.errors
        .map(({ message }) => `${message}`)
        .join(', ');
      response.status(400).json({ error: exception.name, message });
      return;
    }

    response.status(500).json({
      error: exception.name,
    });
  }
}
