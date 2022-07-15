import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TargetSizeGroupsService } from './target-size-groups.service';
import { CreateTargetSizeGroupDto } from './dto/create-target-size-group.dto';
import { UpdateTargetSizeGroupDto } from './dto/update-target-size-group.dto';

@Controller('target-size-groups')
export class TargetSizeGroupsController {
  constructor(
    private readonly targetSizeGroupsService: TargetSizeGroupsService,
  ) {}

  @Post()
  create(@Body() createTargetSizeGroupDto: CreateTargetSizeGroupDto) {
    return this.targetSizeGroupsService.create(createTargetSizeGroupDto);
  }

  @Get()
  findAll() {
    return this.targetSizeGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.targetSizeGroupsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTargetSizeGroupDto: UpdateTargetSizeGroupDto,
  ) {
    return this.targetSizeGroupsService.update(+id, updateTargetSizeGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.targetSizeGroupsService.remove(+id);
  }
}
