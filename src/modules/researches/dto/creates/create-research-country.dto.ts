import { IsDefined, IsString, MaxLength } from 'class-validator';
import { ResearchCountryDto } from '../research-country.dto';

export class CreateResearchCountryDto extends ResearchCountryDto {
    @IsDefined()
    @IsString()
    @MaxLength(64)
    researchId: string;

    @IsDefined()
    @IsString()
    @MaxLength(64)
    country: string;
}
