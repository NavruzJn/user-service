import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiInternalServerErrorResponse,
    ApiForbiddenResponse,
} from '@nestjs/swagger';

export function ApiGlobalResponses() {
    return applyDecorators(
        ApiBadRequestResponse({ description: 'Bad Request' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiForbiddenResponse({ description: 'Forbidden' }),
        ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
    );
}
