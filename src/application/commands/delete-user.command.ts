import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUserHandler } from '@src/application/handlers/delete-user.handler';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { ApiGlobalResponses } from '@src/application/decorators/api-global-responses';
import { ApiResponse } from '@nestjs/swagger';
import { DeleteUserResponse } from '@src/application/types/delete-user.response';

@Controller('api/users')
@ApiGlobalResponses()
export class DeleteUserCommand {
    constructor(private readonly handler: DeleteUserHandler) {}

    @ApiResponse({
        status: 200,
        description: 'Delete user by id',
        type: DeleteUserResponse,
    })
    @Delete(':id')
    public deleteUser(@Param() params: UserIdDto) {
        return this.handler.handle(params);
    }
}
