import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { SearchCreateDto, SearchUpdateDto } from '@searches/dto';
import { Search } from '@searches/entities';
import { SearchesService } from '@searches/services';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { DeleteResult } from 'typeorm';

@ApiTags('Searches')
@Controller(API_ENDPOINTS.SEARCHES.BASE_PATH)
export class SearchesController {
    constructor(private readonly searchesService: SearchesService) {}

    @Post()
    @ApiBody({ type: SearchCreateDto })
    @ApiOkResponse({ type: Search })
    create(@Body() searchCreateDto: SearchCreateDto): Promise<Search> {
        return this.searchesService.create(searchCreateDto);
    }

    @Get()
    @ApiOkResponse({ type: [Search] })
    findAll(): Promise<Search[]> {
        return this.searchesService.findAll();
    }

    @Get(API_ENDPOINTS.SEARCHES.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: Search })
    findOne(@Param('id') id: number): Promise<Search> {
        return this.searchesService.findOne(id);
    }

    @Patch(API_ENDPOINTS.SEARCHES.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: SearchUpdateDto })
    @ApiOkResponse({ type: Search })
    update(@Param('id') id: number, @Body() searchUpdateDto: SearchUpdateDto): Promise<Search> {
        return this.searchesService.update(id, searchUpdateDto);
    }

    @Delete(API_ENDPOINTS.SEARCHES.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: DeleteResult })
    remove(@Param('id') id: number): Promise<DeleteResult> {
        return this.searchesService.remove(id);
    }
}
