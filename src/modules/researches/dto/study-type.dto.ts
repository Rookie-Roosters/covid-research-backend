import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class StudyTypeDto {
    @ApiProperty({ description: 'Study Type value' })
    @IsDefined()
    @IsString()
    @MaxLength(64)
    value: string;
}
