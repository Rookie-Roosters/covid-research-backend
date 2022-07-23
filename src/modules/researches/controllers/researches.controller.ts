import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseStatsByCountry, ResponseWorldStats } from '@researches/dto/responses';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { ResponseResearchDto } from '../dto/responses/response-research.dto';
import { ResearchesService } from '../services/researches.service';

@ApiTags('Researches')
@Controller(API_ENDPOINTS.RESEARCHES.BASE_PATH)
export class ResearchesController {
    constructor(private researchesService: ResearchesService) {}

    @Get(API_ENDPOINTS.RESEARCHES.UPDATE_DB)
    @ApiOperation({
        summary: '[All] Update `Research` in the database',
        description: 'Download the data of the page https://trialsearch.who.int/ and update the database with the data, takes around 30 minutes',
    })
    async updateDB(): Promise<void> {
        await this.researchesService.updateAll();
    }

    @Get(API_ENDPOINTS.RESEARCHES.STATS_BY_COUNTRY)
    @ApiOperation({
        summary: '[All] Get counts of the information in `Research` of the `Countries` Iso codes',
        description: 'Get counts of the information in `Research` based on the provide `Country` ISO codes, if Query is blank will select all researches',
    })
    @ApiQuery({ name: 'countryIsoCodes', description: 'Country ISO codes', type: [String], required: false })
    @ApiResponse({ type: [ResponseStatsByCountry] })
    async statsByCountry(@Query('countryIsoCodes') countriesIsoCodes: string[]) : Promise<ICommonHttpResponse<ResponseStatsByCountry[]>> {
        return {
            data: await this.researchesService.statsByCountry(countriesIsoCodes),
        }
    }

    @Get(API_ENDPOINTS.RESEARCHES.WORLD_STATS)
    @ApiOperation({
        summary: '[All] Get counts of the all `Countries`',
        description: 'Get counts of the all information about `Covid Info` and `Researches`',
    })
    @ApiResponse({type: [ResponseWorldStats]})
    async worldStats() : Promise<ICommonHttpResponse<ResponseWorldStats[]>> {
        return {
            data: await this.researchesService.worldStats(),
        }
    }

    @Get(API_ENDPOINTS.USERS.BY_ID)
    @ApiOperation({ summary: '[All] Get a single `Research`', description: 'Get the `Research` data based on the provided Id' })
    @ApiParam({ name: 'id', description: "The `Research`'s Id" })
    @ApiOkResponse({ type: ResponseResearchDto, description: 'The matching `Research` data' })
    async findOne(@Param('id') id: string): Promise<ICommonHttpResponse<ResponseResearchDto>> {
        const result = await this.researchesService.findOne(id);
        return { data: result };
    }
}
