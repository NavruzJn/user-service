import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { SortOrderEnum } from '@src/application/constants/enums';

const userSortKeys = ['email', 'birthdate'];

export class GetUsersDto {
    @ApiProperty()
    @IsNumber()
    @Min(0)
    public page: number;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(50)
    public pageSize: number;

    @ApiPropertyOptional({ enum: userSortKeys })
    @IsIn(userSortKeys)
    @IsOptional()
    public sortBy: string;

    @ApiPropertyOptional({ enum: SortOrderEnum })
    @IsEnum(SortOrderEnum)
    @IsOptional()
    public sortOrder: SortOrderEnum;
}
