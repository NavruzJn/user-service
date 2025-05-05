import { ApiResponseProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class InternalServerErrorResponse {
    @ApiResponseProperty({ type: 'string', example: 'Internal error' })
    public message: string;

    @ApiResponseProperty({ type: 'number', example: '500' })
    public statusCode = 500;
}
