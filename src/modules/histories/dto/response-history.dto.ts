import { ApiProperty } from '@nestjs/swagger';
import { HistoryDto } from './history.dto';

export class ResponseHistoryDto extends HistoryDto {
    @ApiProperty({ description: "History's primary key" })
    id: number;
}
