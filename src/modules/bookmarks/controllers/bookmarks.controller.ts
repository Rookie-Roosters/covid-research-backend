import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BookmarkCreateDto, BookmarkUpdateDto, BookmarkUpdateResearchDto } from '@bookmarks/dto';
import { BookmarksService } from '@bookmarks/services';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { DeleteResult } from 'typeorm';
import { BookmarkResponseDto } from '@bookmarks/dto/bookmark-response.dto';
import { Authenticated, CurrentUser } from '@authentication/decorators';
import { USER_ROLE } from '@authentication/constants';
import { User } from '@users/entities';
import { ICommonHttpResponse } from '@utils/interfaces';

@ApiTags('Bookmarks')
@Controller(API_ENDPOINTS.BOOKMARKS.BASE_PATH)
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) {}

    @Post()
    @Authenticated(USER_ROLE.REGULAR)
    @ApiOperation({ summary: '[Regular] Create a `Bookmark`', description: 'Create a new `Bookmark`' })
    @ApiBody({ type: BookmarkCreateDto, description: 'The new `Bookmark` name' })
    @ApiOkResponse({ type: BookmarkResponseDto, description: 'The newly created `Bookmark` model' })
    async create(@Body() bookmarkCreateDto: BookmarkCreateDto, @CurrentUser() currentUser: User): Promise<ICommonHttpResponse<BookmarkResponseDto>> {
        return {
            data: await this.bookmarksService.create(bookmarkCreateDto, currentUser),
        };
    }

    @Get(API_ENDPOINTS.BOOKMARKS.USER)
    @Authenticated(USER_ROLE.REGULAR)
    @ApiOperation({
        summary: '[Regular] Get all `Bookmark` of `User`',
        description: 'Get all `Bookmark` of the logged `User`',
    })
    @ApiOkResponse({ type: [BookmarkResponseDto], description: "The `User`'s bookmark models" })
    async findByUser(@CurrentUser() currentUser: User): Promise<ICommonHttpResponse<BookmarkResponseDto[]>> {
        return {
            data: await this.bookmarksService.findByUser(currentUser),
        };
    }

    @Get(API_ENDPOINTS.BOOKMARKS.BY_ID)
    @Authenticated(USER_ROLE.REGULAR)
    @ApiOperation({ summary: '[Regular] Get a single `Bookmark`', description: 'Get a single `Bookmark` data based on the provide Id' })
    @ApiParam({ name: 'id', type: Number, description: "The `Bookmark`'s Id" })
    @ApiOkResponse({ type: BookmarkResponseDto, description: 'The matching `Bookmark` model' })
    async findOne(@Param('id') id: number, @CurrentUser() currentUser: User): Promise<ICommonHttpResponse<BookmarkResponseDto>> {
        return {
            data: await this.bookmarksService.findOne(id, currentUser),
        };
    }

    @Patch(API_ENDPOINTS.BOOKMARKS.BY_ID)
    @Authenticated(USER_ROLE.REGULAR)
    @ApiOperation({ summary: '[Regular] Update a single `Bookmark` name', description: 'Update a single `Bookmark` name based on the provide Id' })
    @ApiParam({ name: 'id', type: Number, description: "The `Bookmark`'s Id" })
    @ApiBody({ type: BookmarkUpdateDto, description: 'The updated `Bookmark` name' })
    @ApiOkResponse({ type: BookmarkResponseDto, description: 'The updated `Bookmark` model' })
    async updateOne(
        @Param('id') id: number,
        @Body() bookmarkUpdateDto: BookmarkUpdateDto,
        @CurrentUser() currentUser: User,
    ): Promise<ICommonHttpResponse<BookmarkResponseDto>> {
        return {
            data: await this.bookmarksService.updateOne(id, bookmarkUpdateDto, currentUser),
        };
    }

    @Delete(API_ENDPOINTS.BOOKMARKS.BY_ID)
    @ApiOperation({ summary: '[Regular] Delete a single `Bookmark`', description: 'Delete a single `Bookmark` data based on the provide Id' })
    @Authenticated(USER_ROLE.REGULAR)
    @ApiParam({ name: 'id', type: Number, description: "The `Bookmark`' Id" })
    @ApiOkResponse({ type: DeleteResult, description: 'Indicates the result of the deletion' })
    async removeOne(@Param('id') id: number, @CurrentUser() currentUser): Promise<ICommonHttpResponse<DeleteResult>> {
        return {
            data: await this.bookmarksService.removeOne(id, currentUser),
        };
    }

    @Post(API_ENDPOINTS.BOOKMARKS.RESEARCH_BY_ID)
    @Authenticated(USER_ROLE.REGULAR)
    @ApiOperation({
        summary: '[Regular] Add a single `Research` in the `Bookmark`',
        description: 'Add a single `Research` in the `Bookmark` based on the provide Id and the Research Id',
    })
    @ApiParam({ name: 'id', type: Number, description: "The `Bookmark`'s Id" })
    @ApiBody({ type: BookmarkUpdateResearchDto, description: "The `Research`'s Id" })
    @ApiOkResponse({ type: BookmarkResponseDto, description: 'The updated `Bookmark` model' })
    async addResearch(
        @Param('id') id: number,
        @Body() bookmarkUpdateResearchDto: BookmarkUpdateResearchDto,
        @CurrentUser() currentUser: User,
    ): Promise<ICommonHttpResponse<BookmarkResponseDto>> {
        return {
            data: await this.bookmarksService.addResearch(id, bookmarkUpdateResearchDto, currentUser),
        };
    }

    @Delete(API_ENDPOINTS.BOOKMARKS.RESEARCH_BY_ID)
    @Authenticated(USER_ROLE.REGULAR)
    @ApiOperation({
        summary: '[Regular] Remove a single `Research` in the `Bookmark`',
        description: 'Remove a single `Research` in the `Bookmark` based on the provide Id and the Research Id',
    })
    @ApiParam({ name: 'id', type: Number, description: "The `Bookmark`'s Id" })
    @ApiBody({ type: BookmarkUpdateResearchDto, description: "The `Research`'s Id" })
    @ApiOkResponse({ type: BookmarkResponseDto, description: 'The updated `Bookmark` model' })
    async removeResearch(
        @Param('id') id: number,
        @Body() bookmarkUpdateResearchDto: BookmarkUpdateResearchDto,
        @CurrentUser() currentUser: User,
    ): Promise<ICommonHttpResponse<BookmarkResponseDto>> {
        return {
            data: await this.bookmarksService.removeResearch(id, bookmarkUpdateResearchDto, currentUser),
        };
    }
}
