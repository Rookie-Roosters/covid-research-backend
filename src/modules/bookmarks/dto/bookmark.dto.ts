import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class BookmarkDto {
    @ApiProperty({ description: "Bookmark's primary key" })
    @IsInt()
    @IsPositive()
    id: number;
}
