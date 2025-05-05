import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsString()
    public password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public firstname?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public lastname?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    public birthdate?: Date;
}
