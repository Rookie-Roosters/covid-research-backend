import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseSourceRegisterDto } from '@researches/dto/responses';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { SourceRegistersService } from '../services/source-registers.service';

@ApiTags('Researches')
@Controller(API_ENDPOINTS.RESEARCHES.SOURCE_REGISTERS.BASE_PATH)
export class SourceRegistersController {
    constructor(private readonly sourceRegistersService: SourceRegistersService) {}

    @Get()
    @ApiOperation({ summary: '[All] Find `Source registers`', description: 'Find all the `Source registers` in the database' })
    @ApiOkResponse({ type: [ResponseSourceRegisterDto], description: 'A collection of every registered `Source registers` sorted by value' })
    async findAll(): Promise<ICommonHttpResponse<ResponseSourceRegisterDto[]>> {
        const result = await this.sourceRegistersService.findAll();
        return {
            data: result,
        };
    }
}
