import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '@src/application/types/user.response';

export class GetUsersResponse {
    @ApiProperty({ type: () => [UserResponse] })
    public users: UserResponse[];

    @ApiProperty()
    public hasNextPage: boolean;
}
