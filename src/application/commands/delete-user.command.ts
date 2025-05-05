import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { DeleteUserHandler } from '@src/application/handlers/delete-user.handler';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { ApiGlobalResponses } from '@src/application/decorators/api-global-responses';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DeleteUserResponse } from '@src/application/types/delete-user.response';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
@ApiGlobalResponses()
@ApiBearerAuth('JWT')
export class DeleteUserCommand {
    constructor(private readonly handler: DeleteUserHandler) {}

    @ApiResponse({
        status: 200,
        description: 'Delete user by id',
        type: DeleteUserResponse,
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    public deleteUser(@Param() params: UserIdDto) {
        return this.handler.handle(params);
    }
}
