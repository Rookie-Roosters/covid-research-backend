import { ApiProperty } from '@nestjs/swagger';
import { ResearchCountryDto } from '../research-country.dto';
import { ResponseCountryDto } from './response-country.dto';

export class ResponseResearchCountryDto extends ResearchCountryDto {
    @ApiProperty({ description: 'Research Country primary key' })
    id: number;

    @ApiProperty({ description: 'Research Country country' })
    country: ResponseCountryDto;
}
