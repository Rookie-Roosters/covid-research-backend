import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class ResearchDto {
    @ApiProperty({ description: "Research's primary key" })
    @IsInt()
    @IsPositive()
    id: number;
}
