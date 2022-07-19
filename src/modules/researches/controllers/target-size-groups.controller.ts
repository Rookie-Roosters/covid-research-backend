import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseTargetSizeGroupDto } from '@researches/dto/responses';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { TargetSizeGroupsService } from '../services/target-size-groups.service';

@ApiTags('Target size groups')
@Controller(API_ENDPOINTS.RESEARCHES.TARGET_SIZE_GROUPS.BASE_PATH)
export class TargetSizeGroupsController {
    constructor(private readonly targetSizeGroupsService: TargetSizeGroupsService) {}

    @Get()
    @ApiOperation({ summary: '[All] Find `Target size groups`', description: 'Find all the `Target size groups` in the database' })
    @ApiOkResponse({ type: [ResponseTargetSizeGroupDto], description: 'A collection of every registered `Target size groups` sorted by value' })
    async findAll(): Promise<ICommonHttpResponse<ResponseTargetSizeGroupDto[]>> {
        const result = await this.targetSizeGroupsService.findAll();
        return {
            data: result,
        };
    }
}
