import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecruitmentStatus } from '@researches/entities';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { RecruitmentStatusesService } from '../services/recruitment-statuses.service';

@ApiTags('Recruitment statuses')
@Controller(API_ENDPOINTS.RESEARCHES.RECRUITMENT_STATUSES.BASE_PATH)
export class RecruitmentStatusesController {
    constructor(private readonly recruitmentStatusesService: RecruitmentStatusesService) {}

    @Get()
    @ApiOperation({ summary: '[All] Find `Recruitment statuses`', description: 'Find all the `Recruitment statuses` in the database' })
    @ApiOkResponse({ type: [RecruitmentStatus], description: 'A collection of every registered `Recruitment statuses` sorted by value' })
    async findAll(): Promise<ICommonHttpResponse<RecruitmentStatus[]>> {
        const result = await this.recruitmentStatusesService.findAll();
        return {
            data: result,
        };
    }
}
