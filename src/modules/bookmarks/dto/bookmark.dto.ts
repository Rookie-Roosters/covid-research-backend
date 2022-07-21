import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsPositive, IsString, MaxLength } from 'class-validator';

export class BookmarkDto {
    @ApiProperty({description: "Bookmark's name"})
    @IsString()
    @IsDefined()
    @MaxLength(64)
    name: string;
}
