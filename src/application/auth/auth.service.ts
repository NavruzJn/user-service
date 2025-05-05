import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { ITokenPayload } from '@src/application/auth/interfaces/token-payload';
import { UserInterface } from '@src/domain/interfaces/user.interface';
import { get } from 'env-var';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<UserInterface> {
        const user = await this.userRepository.findBy({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            return { ...user };
        }
        throw new UnauthorizedException('Wrong Credentials');
    }

    async validateRefreshToken(refreshToken: string): Promise<UserInterface> {
        const { sub } = this.jwtService.verify(refreshToken, {
            secret: get('JWT_REFRESH_SECRET').required().asString(),
            audience: get('JWT_AUDIENCE').required().asString(), // set from PROJECT base
            issuer: get('JWT_ISSUER').required().asString(),
        });

        const user = await this.userRepository.findById(sub);

        if (!user) {
            throw new UnauthorizedException('Refresh token not verified');
        }

        return {
            ...user,
        };
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
            secret: get('JWT_SECRET').required().asString(),
            algorithm: 'HS256',
            audience: get('JWT_AUDIENCE').required().asString(), // set from PROJECT base
            issuer: get('JWT_ISSUER').required().asString(),
        });
    }

    private signRefreshToken(payload: ITokenPayload): string {
        return this.jwtService.sign(payload, {
            secret: get('JWT_REFRESH_SECRET').required().asString(),
            expiresIn: '1d',
            algorithm: 'HS256',
            audience: get('JWT_AUDIENCE').required().asString(),
            issuer: get('JWT_ISSUER').required().asString(),
        });
    }
}
