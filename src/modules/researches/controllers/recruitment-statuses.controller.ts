import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RecruitmentStatusesService } from '../services/recruitment-statuses.service';

@Controller('recruitment-statuses')
export class RecruitmentStatusesController {
  constructor(
    private readonly recruitmentStatusesService: RecruitmentStatusesService,
  ) {}

  @Get()
  findAll() {
    return this.recruitmentStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentStatusesService.findOne(+id);
  }
}
