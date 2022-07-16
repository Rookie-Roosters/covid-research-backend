import { IsDefined, IsString, MaxLength } from "class-validator";

export class CreateResearchCountryDto {
    @IsDefined()
    @IsString()
    @MaxLength(64)
    researchTrialID: string;

    @IsDefined()
    @IsString()
    @MaxLength(64)
    country: string;
}