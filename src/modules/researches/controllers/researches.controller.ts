import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResearchCreateDto, ResearchUpdateDto } from '@researches/dto';
import { Research } from '@researches/entities';
import { ResearchesService } from '@researches/services';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { DeleteResult } from 'typeorm';

@ApiTags('Researches')
@Controller(API_ENDPOINTS.RESEARCHES.BASE_PATH)
export class ResearchesController {
    constructor(private readonly researchesService: ResearchesService) {}

    @Post()
    @ApiBody({ type: ResearchCreateDto })
    @ApiOkResponse({ type: Research })
    create(@Body() researchCreateDto: ResearchCreateDto): Promise<Research> {
        return this.researchesService.create(researchCreateDto);
    }

    @Get()
    @ApiOkResponse({ type: [Research] })
    findAll(): Promise<Research[]> {
        return this.researchesService.findAll();
    }

    @Get(API_ENDPOINTS.RESEARCHES.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: Research })
    findOne(@Param('id') id: number): Promise<Research> {
        return this.researchesService.findOne(id);
    }

    @Patch(API_ENDPOINTS.RESEARCHES.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: ResearchUpdateDto })
    @ApiOkResponse({ type: Research })
    update(@Param('id') id: number, @Body() researchUpdateDto: ResearchUpdateDto): Promise<Research> {
        return this.researchesService.update(id, researchUpdateDto);
    }

    @Delete(API_ENDPOINTS.RESEARCHES.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: DeleteResult })
    remove(@Param('id') id: number): Promise<DeleteResult> {
        return this.researchesService.remove(id);
    }
}
