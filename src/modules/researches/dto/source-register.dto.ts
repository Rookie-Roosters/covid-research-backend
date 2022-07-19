import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class SourceRegisterDto {
    @ApiProperty({ description: 'Source Register value' })
    @IsDefined()
    @IsString()
    @MaxLength(64)
    value: string;
}
