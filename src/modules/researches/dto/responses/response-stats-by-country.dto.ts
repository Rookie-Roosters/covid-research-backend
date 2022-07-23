import { CovidInfoDto } from "@covid-info/dto/covid-info.dto";
import { ResponseStatisticsDto } from "./response-statistic.dto";

export class ResponseStatsByCountry {
    isoCode: string;
    covidInfo: CovidInfoDto;
    statistics: ResponseStatisticsDto;
}