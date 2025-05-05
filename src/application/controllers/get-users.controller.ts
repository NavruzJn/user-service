import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { GetUsersHandler } from '@src/application/handlers/get-users.handler';
import { GetUsersDto } from '@src/application/types/get-users.dto';
import { GetUsersResponse } from '@src/application/types/get-users.response';
import { ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from '@src/application/types/get-user.response';
import { ApiGlobalResponses } from '@src/application/decorators/api-global-responses';

@Controller('api/users')
@ApiGlobalResponses()
export class GetUsersController {
    constructor(private readonly handler: GetUsersHandler) {}

    @ApiResponse({
        status: 200,
        description: 'List of Users',
        type: GetUsersResponse,
    })
    @Get()
    public getUsers(@Query() query: GetUsersDto) {
        return this.handler.getUsers(query);
    }

    @ApiResponse({
        status: 200,
        description: 'User by id',
        type: GetUserResponse,
    })
    @Get(':id')
    public getUser(@Param() params: UserIdDto) {
        return this.handler.getUser(params);
    }
}
