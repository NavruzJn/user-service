import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserInterface } from '@src/domain/interfaces/user.interface';

export class UserResponse implements UserInterface {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public password: string;

    @ApiPropertyOptional()
    public firstname?: string;

    @ApiPropertyOptional()
    public lastname?: string;

    @ApiPropertyOptional()
    public birthdate?: Date;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public updatedAt: Date;
}
