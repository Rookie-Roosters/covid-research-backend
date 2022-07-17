import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { GLOBAL_PROVIDERS } from '@shared/global/constants';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(GLOBAL_PROVIDERS.IS_PRODUCTION_ENV) private readonly isProductionEnv: boolean) {}

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
            ...(!this.isProductionEnv && { stack: exception.stack }),
        });
    }
}
