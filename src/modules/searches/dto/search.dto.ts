import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class SearchDto {
    @ApiProperty({ description: "Search's primary key" })
    @IsInt()
    @IsPositive()
    id: number;
}
