import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { BookmarkCreateDto, BookmarkUpdateDto } from '@bookmarks/dto';
import { Bookmark } from '@bookmarks/entities';
import { BookmarksService } from '@bookmarks/services';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { DeleteResult } from 'typeorm';

@ApiTags('Bookmarks')
@Controller(API_ENDPOINTS.BOOKMARKS.BASE_PATH)
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) {}

    @Post()
    @ApiBody({ type: BookmarkCreateDto })
    @ApiOkResponse({ type: Bookmark })
    create(@Body() bookmarkCreateDto: BookmarkCreateDto): Promise<Bookmark> {
        return this.bookmarksService.create(bookmarkCreateDto);
    }

    @Get()
    @ApiOkResponse({ type: [Bookmark] })
    findAll(): Promise<Bookmark[]> {
        return this.bookmarksService.findAll();
    }

    @Get(API_ENDPOINTS.BOOKMARKS.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: Bookmark })
    findOne(@Param('id') id: number): Promise<Bookmark> {
        return this.bookmarksService.findOne(id);
    }

    @Patch(API_ENDPOINTS.BOOKMARKS.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: BookmarkUpdateDto })
    @ApiOkResponse({ type: Bookmark })
    update(@Param('id') id: number, @Body() bookmarkUpdateDto: BookmarkUpdateDto): Promise<Bookmark> {
        return this.bookmarksService.update(id, bookmarkUpdateDto);
    }

    @Delete(API_ENDPOINTS.BOOKMARKS.BY_ID)
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: DeleteResult })
    remove(@Param('id') id: number): Promise<DeleteResult> {
        return this.bookmarksService.remove(id);
    }
}
