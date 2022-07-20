import { ApiProperty } from '@nestjs/swagger';
import { StudyTypeDto } from '../study-type.dto';

export class ResponseStudyTypeDto extends StudyTypeDto {
    @ApiProperty({ description: 'Study Type primary key' })
    id: number;
}
