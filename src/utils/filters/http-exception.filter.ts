import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { SHARED_PROVIDERS } from '@shared/constants';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(SHARED_PROVIDERS.IS_PRODUCTION) private readonly isProduction: boolean) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse();
        const messages = exceptionResponse['message'];
        const error = exceptionResponse['error'];

        response.status(status).json({
            statusCode: status,
            name: exception.name,
            error,
            messages: messages,
            timestamp: new Date().toISOString(),
            path: request.url,
            ...(!this.isProduction && { stack: exception.stack }),
        });
    }
}
