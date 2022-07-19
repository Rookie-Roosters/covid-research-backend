import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TargetSize, TargetSizeGroup } from '@researches/entities';
import { TargetSizesService } from '@researches/services';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';

@ApiTags('Target sizes')
@Controller(API_ENDPOINTS.RESEARCHES.TARGET_SIZES.BASE_PATH)
export class TargetSizesController {
    constructor(private readonly targetSizesService: TargetSizesService) {}

    @Get()
    @ApiOperation({ summary: '[All] Find `Target sizes`', description: 'Find all the `Target size` in the database' })
    @ApiOkResponse({ type: [TargetSizeGroup], description: 'A collection of every registered `Target size` sorted by value' })
    async findAll(): Promise<ICommonHttpResponse<TargetSize[]>> {
        const result = await this.targetSizesService.findAll();
        return {
            data: result,
        };
    }
}
