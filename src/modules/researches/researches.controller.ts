import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { ResponseResearchDto } from './dto/response-research.dto';
import { Research } from './entities';
import { ResearchesService } from './researches.service';

@ApiTags('Researches')
@Controller(API_ENDPOINTS.RESEARCHES.BASE_PATH)
export class ResearchesController {
    constructor(private researchesService: ResearchesService) {}

    @Get(API_ENDPOINTS.RESEARCHES.UPDATE_DB)
    @ApiOperation({
        summary: '[All] Update `Research` in the database',
        description: 'Download the data of the page https://trialsearch.who.int/ and update the database with the data\ntakes around 30 minutes',
    })
    async updateDB(): Promise<void> {
        await this.researchesService.updateAll();
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
