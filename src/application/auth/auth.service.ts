import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { ITokenPayload } from '@src/application/auth/interfaces/token-payload';
import { UserInterface } from '@src/domain/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findBy({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async getTokens(user: UserInterface): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.signToken(payload),
            refreshToken: this.signRefreshToken(payload),
        };
    }

    private signToken(payload: ITokenPayload): string {
        return this.jwtService.sign(payload, {
            secret: 'secret',
            expiresIn: '5m',
            algorithm: 'HS256',
            audience: 'user-service.audience', // set from PROJECT base
            issuer: 'issues',
        });
    }

    private signRefreshToken(payload: ITokenPayload): string {
        return this.jwtService.sign(payload, {
            secret: 'secret',
            expiresIn: '1d',
            algorithm: 'HS256',
            audience: 'user-service.audience', // set from PROJECT base
            issuer: 'issuer',
        });
    }
}
