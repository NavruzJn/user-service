// auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { ITokenPayload } from '@src/application/auth/interfaces/token-payload';
import { get } from 'env-var';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: get('JWT_SECRET').required().asString(),
        });
    }

    async validate(payload: ITokenPayload) {
        const user = await this.userRepository.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException('Token is not verified');
        }
        return user;
    }
}
