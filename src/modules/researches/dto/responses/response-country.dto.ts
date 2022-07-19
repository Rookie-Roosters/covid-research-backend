import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { CovidInfoDto } from "src/modules/covid-info/dto/covid-info.dto";
import { CountryDto } from "../country.dto";

export class ResponseCountryDto extends CountryDto {
    @ApiProperty({description: "Country's primary key"})
    id: number;

    @ApiProperty({description: "Country's covid info"})
    covidInfo?: CovidInfoDto;
}