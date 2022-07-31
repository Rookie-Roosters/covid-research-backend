import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@utils/constants';
import { Authenticated, CurrentUser } from '@authentication/decorators';
import { USER_ROLE } from '@authentication/constants';
import { ResponseHistoryDto } from './dto';
import { User } from '@users/entities';
import { ICommonHttpResponse } from '@utils/interfaces';
import { DeleteResult } from 'typeorm';

@ApiTags('Search Records')
@Controller(API_ENDPOINTS.HISTORIES.BASE_PATH)
export class HistoriesController {
    constructor(private readonly historiesService: HistoriesService) {}

    @Get(API_ENDPOINTS.HISTORIES.USER)
    @Authenticated(USER_ROLE.REGULAR)
    @ApiOperation({
        summary: '[Regular] Get all `Search record` of `User`',
        description: 'Get all `Search record` of the logged `User`',
    })
    @ApiOkResponse({ type: [ResponseHistoryDto], description: "The `User`'s Search record models" })
    async findByUser(@CurrentUser() currentUser: User): Promise<ICommonHttpResponse<ResponseHistoryDto[]>> {
        return {
            data: await this.historiesService.findByUser(currentUser),
        };
    }

    @Delete(API_ENDPOINTS.HISTORIES.BY_ID)
    @ApiOperation({ summary: '[Regular] Delete a single `Search record`', description: 'Delete a single `Search record` data based on the provide Id' })
    @Authenticated(USER_ROLE.REGULAR)
    @ApiParam({ name: 'id', type: Number, description: "The `Search record`'s Id" })
    @ApiOkResponse({ type: DeleteResult, description: 'Indicates the result of the deletion' })
    async removeOne(@Param('id') id: number, @CurrentUser() currentUser): Promise<ICommonHttpResponse<DeleteResult>> {
        return {
            data: await this.historiesService.removeOne(id, currentUser),
        };
    }
}
