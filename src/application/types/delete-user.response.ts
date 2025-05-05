import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponse {
    @ApiProperty()
    public result: boolean;
}
