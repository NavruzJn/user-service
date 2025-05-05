import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '@src/application/types/user.response';

export class GetUserResponse {
    @ApiProperty({ type: () => UserResponse })
    public user: UserResponse;
}
