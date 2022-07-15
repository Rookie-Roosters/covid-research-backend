import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserCreateDto, UserUpdateDto } from '@users/dto';
import { User } from '@users/entities';
import { UsersService } from '@users/services';
import { API_ENDPOINTS } from '@utils/constants/api-routes.constants';
import { ICommonHttpResponse } from '@utils/interfaces';
import { DeleteResult } from 'typeorm';

@ApiTags('Users')
@Controller(API_ENDPOINTS.USERS.BASE_PATH)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '[Admin] Create an `User`', description: 'Create a new `User`' })
    @ApiBody({ type: UserCreateDto, description: 'The new `User` data' })
    @ApiOkResponse({ type: User, description: 'The newly created `User` model' })
    async create(@Body() userCreateDto: UserCreateDto): Promise<ICommonHttpResponse<User>> {
        const result = await this.usersService.create(userCreateDto);
        return { data: result };
    }

    @Get()
    @ApiOperation({ summary: '[Admin] Find `Users`', description: 'Find all the `Users` in the database' })
    @ApiOkResponse({ type: [User], description: 'A collection of every registered `User`' })
    async findAll(): Promise<ICommonHttpResponse<User[]>> {
        const result = await this.usersService.findAll();
        return { data: result };
    }

    @Get(API_ENDPOINTS.USERS.BY_ID)
    @ApiOperation({ summary: '[Admin/Me] Get a single `User`', description: 'Get the `User` data based on the provided ID' })
    @ApiParam({ name: 'id', description: "The `User`'s ID" })
    @ApiOkResponse({ type: User, description: 'The matching `User` data' })
    async findOne(@Param('id') id: number): Promise<ICommonHttpResponse<User>> {
        const result = await this.usersService.findOne(id);
        return { data: result };
    }

    @Patch(API_ENDPOINTS.USERS.BY_ID)
    @ApiOperation({ summary: '[Admin/Me] Update a single `User`', description: 'Update a single `User` based on its ID' })
    @ApiParam({ name: 'id', description: "The `User`'s ID" })
    @ApiBody({ type: UserUpdateDto, description: 'The fields to update for this `User`' })
    @ApiOkResponse({ type: User, description: 'The updated `User` model' })
    async update(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto): Promise<ICommonHttpResponse<User>> {
        const result = await this.usersService.update(id, userUpdateDto);
        return { data: result };
    }

    @Delete(API_ENDPOINTS.USERS.BY_ID)
    @ApiOperation({ summary: '[Admin/Me] Delete a single `User`', description: 'Delete a given `User` based on its ID' })
    @ApiParam({ name: 'id', description: "The `User`'s ID" })
    @ApiOkResponse({ type: DeleteResult, description: 'Indicates the result of the deletion' })
    async remove(@Param('id') id: number): Promise<ICommonHttpResponse> {
        const result = await this.usersService.remove(id);
        return { data: result };
    }
}
