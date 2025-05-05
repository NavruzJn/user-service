import { ConsoleLogger } from '@nestjs/common';
import { Logger, format as winstonFormat, transports as winstonTransports, createLogger } from 'winston';
import * as pkg from '../../../package.json';

const defaultContext = `${pkg.name} = ${pkg.version}`;

interface Loggable {
    readonly source: string;
    readonly event: string;
    readonly data?: string;
    readonly correlationId: string;
}

export class LoggerService extends ConsoleLogger {
    private winston: Logger;

    constructor(context?: string) {
        super(context || defaultContext);

        const format = winstonFormat.combine(winstonFormat.printf(this.format), winstonFormat.json());

        const logLevel = 'info';
        const transports = [new winstonTransports.Console({ format })];
        const loggerOptions = { logLevel, transports };

        this.winston = createLogger(loggerOptions);
    }

    public error(message: Loggable | string, context?: string): void {
        this.winston.log('error', {
            message,
            context: context || this.context,
        });
    }

    public log(message: Loggable | string, context?: string): void {
        this.winston.log('info', {
            message,
            context: context || this.context,
        });
    }

    public info(message: Loggable | string, context?: string): void {
        this.winston.log('info', {
            message,
            context: context || this.context,
        });
    }

    public debug(message: Loggable | string, context?: string): void {
        this.winston.log('debug', {
            message,
            context: context || this.context,
        });
    }

    public warn(message: Loggable | string, context?: string): void {
        this.winston.log('warn', {
            message,
            context: context || this.context,
        });
    }

    private format(data: any): string {
        const logRecord = {
            level: data.level,
            appName: defaultContext,
            context: defaultContext,
            timestamp: new Date().toISOString(),
        };

        return JSON.stringify({
            ...logRecord,
            ...data,
        });
    }
}
