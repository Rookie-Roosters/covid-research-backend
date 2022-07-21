import { ApiProperty } from "@nestjs/swagger";
import { CompactResponseResearchDto } from "@researches/dto/responses";
import { BookmarkDto } from "./bookmark.dto";



export class BookmarkResponseDto extends BookmarkDto {
    @ApiProperty({description: "Bookmark's primary key"})
    id: number;

    @ApiProperty({description: "Bookmar's researches", type: [CompactResponseResearchDto]})
    researches: CompactResponseResearchDto[];
}