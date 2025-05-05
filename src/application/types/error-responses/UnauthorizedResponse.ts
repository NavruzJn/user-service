import { ApiResponseProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UnauthorizedResponse {
    @ApiResponseProperty({ example: 'Unauthorized' })
    public message: string;

    @ApiResponseProperty({ type: 'number', example: '401' })
    public statusCode = 401;
}
