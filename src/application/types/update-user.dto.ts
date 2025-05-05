import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional()
    @IsEmail()
    public email?: string;

    @ApiPropertyOptional()
    @IsString()
    public password?: string;

    @ApiPropertyOptional()
    @IsString()
    public firstname?: string;

    @ApiPropertyOptional()
    @IsString()
    public lastname?: string;

    @ApiPropertyOptional()
    @IsDate()
    public birthdate?: Date;
}
