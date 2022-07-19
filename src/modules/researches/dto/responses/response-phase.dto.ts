import { ApiProperty } from '@nestjs/swagger';
import { PhaseDto } from '../phase.dto';

export class ResponsePhaseDto extends PhaseDto {
    @ApiProperty({ description: "Phas's primary key" })
    id: number;
}
