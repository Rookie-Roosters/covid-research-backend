import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class TargetSizeDto {
    @ApiProperty({ description: 'Target Size count' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    count?: number;
}
