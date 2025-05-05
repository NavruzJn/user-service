import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/application/types/create-user.dto';
import { CreateUserHandler } from '@src/application/handlers/create-user.handler';
import { ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from '@src/application/types/get-user.response';

@Controller('api/users')
export class CreateUserCommand {
    constructor(private readonly handler: CreateUserHandler) {}

    @ApiResponse({
        status: 200,
        description: 'Create new user',
        type: GetUserResponse,
    })
    @Post()
    public createUser(@Body() dto: CreateUserDto) {
        return this.handler.handle(dto);
    }
}
