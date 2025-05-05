import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@src/application/types/create-user.dto';
import { CreateUserHandler } from '@src/application/handlers/create-user.handler';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from '@src/application/types/get-user.response';
import { AuthGuard } from '@nestjs/passport';
import { ApiGlobalResponses } from '@src/application/decorators/api-global-responses';

@Controller('api/users')
@ApiGlobalResponses()
@ApiBearerAuth('JWT')
export class CreateUserCommand {
    constructor(private readonly handler: CreateUserHandler) {}

    @ApiResponse({
        status: 200,
        description: 'Create new user',
        type: GetUserResponse,
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public createUser(@Body() dto: CreateUserDto) {
        return this.handler.handle(dto);
    }
}
