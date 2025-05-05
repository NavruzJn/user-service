/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestInterceptor, Logger, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import { Response } from 'express';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
    private readonly logger = new Logger();

    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = context.getHandler().name;
        const cls = context.getClass().name;
        const response: Response = context.switchToHttp().getResponse();
        let requestId = response.getHeader('x-request-id');
        if (!requestId) {
            requestId = uuidV4();
            response.setHeader('x-request-id', requestId);
        }

        return next.handle().pipe(
            tap({
                next: (res) => {
                    this.logger.log({
                        requestId,
                        info: 'gateway_response',
                        context: {
                            handler,
                            cls,
                        },
                        response: {
                            body: res,
                        },
                    });
                },
            }),
        );
    }
}
