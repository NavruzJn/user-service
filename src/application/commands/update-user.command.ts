import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from '@src/application/types/update-user.dto';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { UpdateUserHandler } from '@src/application/handlers/update-user.handler';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from '@src/application/types/get-user.response';
import { AuthGuard } from '@nestjs/passport';
import { ApiGlobalResponses } from '@src/application/decorators/api-global-responses';

@Controller('api/users')
@ApiGlobalResponses()
@ApiBearerAuth('JWT')
export class UpdateUserCommand {
    constructor(private readonly handler: UpdateUserHandler) {}

    @ApiResponse({
        status: 200,
        description: 'Update user',
        type: GetUserResponse,
    })
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    public updateUser(@Param() params: UserIdDto, @Body() body: UpdateUserDto) {
        return this.handler.handle(body, params);
    }
}
