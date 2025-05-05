import { JwtStrategy } from '@src/application/auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { get } from 'env-var';
import { AuthService } from '@src/application/auth/auth.service';
import { LocalStrategy } from '@src/application/auth/strategies/local.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: get('JWT_SECRET').required().asString(),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
