import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FiltersDecorator } from '@researches/decorators/filters.decorator';
import { FiltersDto } from '@researches/dto';
import { CompactResponseResearchDto } from '@researches/dto/responses';
import { Research } from '@researches/entities';
import { SearchService } from '@researches/services';
import { API_ENDPOINTS, PATHS } from '@utils/constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Search')
@Controller(API_ENDPOINTS.SEARCH.BASE_PATH)
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @ApiOperation({summary: '[All] Search `Research`'})
    @ApiQuery({ name: 's', type: String, description: '`Search` query, if is blank will be return all the `Research`', required: false })
    @ApiQuery({ name: 'page', type: String, required: false, description: 'Pagination page, default is 1' })
    @ApiQuery({ name: 'limit', type: String, required: false, description: '`Research` per page, default is 10' })
    @ApiOkResponse({type: [CompactResponseResearchDto]})
    async search(
        @Query('s') s: string,
        @FiltersDecorator() filters: { filters: FiltersDto; url: string },
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<ICommonHttpResponse<Pagination<Research>>> {
        limit = limit > 100 ? 100 : limit;
        return {
            data: await this.searchService.search(
                {
                    page,
                    limit,
                    route: PATHS.SERVER + filters.url,
                },
                filters.url,
                s,
            ),
        };
    }
}
