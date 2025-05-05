import { ApiResponseProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class BadRequestResponse {
    @ApiResponseProperty({ type: 'string' })
    public message: string;

    @ApiResponseProperty({ type: 'number', example: '400' })
    public statusCode = 400;

    @ApiResponseProperty({ type: 'string' })
    public error = 'Bad Request';
}
