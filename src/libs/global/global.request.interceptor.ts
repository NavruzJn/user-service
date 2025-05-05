/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
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
            info: 'Api Gateway Request',
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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                brand: request.hostname.split('.')[1],
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        request.brand = request.hostname.split('.')[1] || 'local';

        return next.handle();
    }
}
