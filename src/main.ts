/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { get } from 'env-var';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as pkg from '../package.json';

import { GlobalRequestInterceptor } from '@src/libs/global/global.request.interceptor';
import { LoggerService } from '@src/libs/logger/logger.service';
import { GlobalResponseInterceptor } from '@src/libs/global/global.response.interceptor';
import { GlobalExceptionInterceptor } from '@src/libs/global/global.exception.interceptor';
import { AppModule } from '@src/application/app.module';

async function bootstrap(): Promise<void> {
    const appPort = get('APP_PORT').required().asPortNumber();

    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
        cors: {
            allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization', 'X-Request-Id'],
        },
    });

    const logger = new LoggerService();
    app.useLogger(logger);

    app.useGlobalInterceptors(new GlobalRequestInterceptor());
    app.useGlobalInterceptors(new GlobalResponseInterceptor());
    app.useGlobalInterceptors(new GlobalExceptionInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            forbidNonWhitelisted: true,
        }),
    );

    app.enableShutdownHooks();

    // @ts-ignore
    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    // @ts-ignore
    app.use(bodyParser.json({ verify: rawBodyBuffer }));

    const config = new DocumentBuilder()
        .setTitle('API User Service')
        .setDescription('API description')
        .setVersion(pkg.version)
        .addTag('user-service')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(appPort);
    logger.info(`Application is running at: ${await app.getUrl()}`);
}

/* eslint-disable-next-line @typescript-eslint/no-floating-promises */
bootstrap();
