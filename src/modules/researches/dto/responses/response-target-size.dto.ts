import { ApiProperty } from '@nestjs/swagger';
import { TargetSizeDto } from '../target-size.dto';
import { ResponseTargetSizeGroupDto } from './response-target-size-group.dto';

export class ResponseTargetSizeDto extends TargetSizeDto {
    @ApiProperty({ description: 'Target Size primary key' })
    id: number;

    @ApiProperty({ description: 'Target Size Group' })
    targetSizeGroup?: ResponseTargetSizeGroupDto;
}
