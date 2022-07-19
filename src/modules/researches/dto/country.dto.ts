import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CountryDto {
    @ApiProperty({ description: "Country's value" })
    @IsDefined()
    @IsString()
    @MaxLength(64)
    value: string;
}
