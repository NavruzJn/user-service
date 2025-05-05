import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from '@src/application/types/get-user.response';
import { AuthHandler } from '@src/application/handlers/auth.handler';
import { RefreshRequestDto } from '@src/application/types/refresh-request.dto';
import { LoginRequestDto } from '@src/application/types/login-request.dto';

@Controller('api/auth')
export class AuthCommand {
    constructor(private readonly handler: AuthHandler) {}

    @ApiResponse({
        status: 200,
        description: 'Authorize',
        type: GetUserResponse,
    })
    @Post('login')
    public login(@Body() dto: LoginRequestDto) {
        return this.handler.login(dto);
    }

    @ApiResponse({
        status: 200,
        description: 'Authorize',
        type: GetUserResponse,
    })
    @Post('refresh')
    public refresh(@Body() dto: RefreshRequestDto) {
        return this.handler.refresh(dto);
    }
}
