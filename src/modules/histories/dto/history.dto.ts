import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUrl, MaxLength } from 'class-validator';

export class HistoryDto {
    @ApiProperty({ description: "Search record url", type: String })
    @IsString()
    @IsDefined()
    @IsUrl()
    @MaxLength(1024)
    url: string;
}
