import {
    IsDefined,
    IsString,
    MaxLength
} from  'class-validator';

export class CreateCountryDto {
    @IsDefined()
    @IsString()
    @MaxLength(64)
    value: string;
}