import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateUserDto } from '@src/application/types/update-user.dto';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { UpdateUserHandler } from '@src/application/handlers/update-user.handler';
import { ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from '@src/application/types/get-user.response';

@Controller('api/users')
export class UpdateUserCommand {
    constructor(private readonly handler: UpdateUserHandler) {}

    @ApiResponse({
        status: 200,
        description: 'Update user',
        type: GetUserResponse,
    })
    @Put(':id')
    public updateUser(@Param() params: UserIdDto, @Body() body: UpdateUserDto) {
        return this.handler.handle(body, params);
    }
}
