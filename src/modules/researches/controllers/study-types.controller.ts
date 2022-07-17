import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudyType } from '@researches/entities';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { StudyTypesService } from '../services/study-types.service';

@ApiTags('Study types')
@Controller(API_ENDPOINTS.RESEARCHES.STUDY_TYPES.BASE_PATH)
export class StudyTypesController {
    constructor(private readonly studyTypesService: StudyTypesService) {}

    @Get()
    @ApiOperation({ summary: '[All] Find `Study types`', description: 'Find all the `Study types` in the database' })
    @ApiOkResponse({ type: [StudyType], description: 'A collection of every registered `Study types` sorted by value' })
    async findAll(): Promise<ICommonHttpResponse<StudyType[]>> {
        const result = await this.studyTypesService.findAll();
        return {
            data: result,
        };
    }
}
