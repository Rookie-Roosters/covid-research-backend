import { ApiProperty } from '@nestjs/swagger';
import { TargetSizeGroupDto } from '../target-size-group.dto';

export class ResponseTargetSizeGroupDto extends TargetSizeGroupDto {
    @ApiProperty({ description: 'Target Size Group primary key' })
    id: number;
}
