import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class PhaseDto {
    @ApiProperty({ description: "Phase's value" })
    @IsDefined()
    @IsString()
    @MaxLength(64)
    value: string;
}
