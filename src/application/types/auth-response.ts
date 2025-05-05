import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty()
    public accessToken: string;

    @ApiProperty()
    public refreshToken: string;
}
