import { Injectable } from '@nestjs/common';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { LoginRequestDto } from '@src/application/types/login-request.dto';
import { AuthResponse } from '@src/application/types/auth-response';
import { AuthService } from '@src/application/auth/auth.service';
import { RefreshRequestDto } from '@src/application/types/refresh-request.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

@Injectable()
export class AuthHandler {
    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository,
    ) {}

    public async login(dto: LoginRequestDto): Promise<AuthResponse> {
        const user = await this.authService.validateUser(dto.email, dto.password);
        return this.authService.getTokens(user);
    }

    public async refresh(dto: RefreshRequestDto): Promise<AuthResponse> {
        const user = await this.authService.validateRefreshToken(dto.refreshToken);
        return this.authService.getTokens(user);
    }
}
