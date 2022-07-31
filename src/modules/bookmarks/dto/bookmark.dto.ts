import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsHexColor, IsInt, IsPositive, IsString, MaxLength } from 'class-validator';

export class BookmarkDto {
    @ApiProperty({ description: "Bookmark's name" })
    @IsString()
    @IsDefined()
    @MaxLength(64)
    name: string;

    @ApiProperty({ description: "Bookmark's color" })
    @IsString()
    @IsDefined()
    @IsHexColor()
    color: string;
}
