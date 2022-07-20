import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseRecruitmentStatusDto } from '@researches/dto/responses';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { RecruitmentStatusesService } from '../services/recruitment-statuses.service';

@ApiTags('Researches')
@Controller(API_ENDPOINTS.RESEARCHES.RECRUITMENT_STATUSES.BASE_PATH)
export class RecruitmentStatusesController {
    constructor(private readonly recruitmentStatusesService: RecruitmentStatusesService) {}

    @Get()
    @ApiOperation({ summary: '[All] Find `Recruitment statuses`', description: 'Find all the `Recruitment statuses` in the database' })
    @ApiOkResponse({ type: [ResponseRecruitmentStatusDto], description: 'A collection of every registered `Recruitment statuses` sorted by value' })
    async findAll(): Promise<ICommonHttpResponse<ResponseRecruitmentStatusDto[]>> {
        const result = await this.recruitmentStatusesService.findAll();
        return {
            data: result,
        };
    }
}
