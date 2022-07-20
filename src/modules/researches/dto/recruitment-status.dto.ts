import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class RecruitmentStatusDto {
    @ApiProperty({description: "Recruiment Status value"})
    @IsDefined()
    @IsString()
    @MaxLength(32)
    value: string;
}
