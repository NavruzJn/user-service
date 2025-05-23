/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestInterceptor, Logger, ExecutionContext, CallHandler, Injectable, ConflictException } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class GlobalExceptionInterceptor implements NestInterceptor {
    private readonly logger = new Logger();

    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                const http = context.switchToHttp();
                const request = http.getRequest();
                const handler = context.getHandler().name;
                const cls = context.getClass().name;
                error.class = context.getClass().name;
                error.handler = context.getHandler().name;
                this.logger.error({
                    context: {
                        handler,
                        cls,
                    },
                    error,
                    request: {
                        method: request.method,
                        path: request.path,
                        body: request.body,
                    },
                });

                if (error.code === '23505') {
                    throw new ConflictException('User already existis');
                }
                throw error;
            }),
        );
    }
}
