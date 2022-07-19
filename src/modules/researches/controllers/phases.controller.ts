import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponsePhaseDto } from '@researches/dto/responses';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { PhasesService } from '../services/phases.service';

@ApiTags('Phases')
@Controller(API_ENDPOINTS.RESEARCHES.PHASES.BASE_PATH)
export class PhasesController {
    constructor(private readonly phasesService: PhasesService) {}

    @Get()
    @ApiOperation({ summary: '[All] Find `Phases`', description: 'Find all the `Phases` in the database' })
    @ApiOkResponse({ type: [ResponsePhaseDto], description: 'A collection of every registered `Phase` sorted by value' })
    async findAll(): Promise<ICommonHttpResponse<ResponsePhaseDto[]>> {
        const result = await this.phasesService.findAll();
        return {
            data: result,
        };
    }
}
