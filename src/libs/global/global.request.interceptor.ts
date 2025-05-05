/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestInterceptor, ExecutionContext, CallHandler, Logger, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalRequestInterceptor implements NestInterceptor {
    private readonly logger = new Logger('Request Logs');

    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const handler = context.getHandler().name;
        const cls = context.getClass().name;
        this.logger.log({
            info: 'gateway_request',
            context: {
                handler,
                cls,
            },
            request: {
                method: request.method,
                path: request.path,
                body: request.body,
                headers: request.headers,
                params: request.params,
                query: request.query,
                 
                brand: request.hostname.split('.')[1],
            },
        });

         
        request.brand = request.hostname.split('.')[1] || 'local';

        return next.handle();
    }
}
