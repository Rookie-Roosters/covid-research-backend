import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TargetSizeGroupsService } from '../services/target-size-groups.service';

@Controller('target-size-groups')
export class TargetSizeGroupsController {
  constructor(
    private readonly targetSizeGroupsService: TargetSizeGroupsService,
  ) {}

  @Get()
  findAll() {
    return this.targetSizeGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.targetSizeGroupsService.findOne(+id);
  }
}
