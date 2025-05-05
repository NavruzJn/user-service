import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { GetUsersHandler } from '@src/application/handlers/get-users.handler';
import { GetUsersDto } from '@src/application/types/get-users.dto';
import { GetUsersResponse } from '@src/application/types/get-users.response';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from '@src/application/types/get-user.response';
import { ApiGlobalResponses } from '@src/application/decorators/api-global-responses';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
@ApiGlobalResponses()
@ApiBearerAuth('JWT')
export class GetUsersController {
    constructor(private readonly handler: GetUsersHandler) {}

    @ApiResponse({
        status: 200,
        description: 'List of Users',
        type: GetUsersResponse,
    })
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public getUsers(@Query() query: GetUsersDto) {
        return this.handler.getUsers(query);
    }

    @ApiResponse({
        status: 200,
        description: 'User by id',
        type: GetUserResponse,
    })
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    public getUser(@Param() params: UserIdDto) {
        return this.handler.getUser(params);
    }
}
