import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class TargetSizeGroupDto {
    @ApiProperty({ description: 'Target Size Group value' })
    @IsDefined()
    @IsString()
    @MaxLength(256)
    value: string;
}
