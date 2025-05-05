import { ApiResponseProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class NotFoundResponse {
    @ApiResponseProperty({ type: 'string', example: 'Not Found' })
    public message: string;

    @ApiResponseProperty({ type: 'number', example: '404' })
    public statusCode = 404;
}
