import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';
import { BookmarkDto } from './bookmark.dto';

export class BookmarkUpdateDto extends BookmarkDto {}

export class BookmarkUpdateResearchDto {
    @ApiProperty({description: "Researh's primary key"})
    @IsString()
    @IsDefined()
    @MaxLength(64)
    researchId: string;
}