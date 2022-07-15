import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { StudyTypesService } from '../services/study-types.service';

@Controller('study-types')
export class StudyTypesController {
  constructor(private readonly studyTypesService: StudyTypesService) {}
  @Get()
  findAll() {
    return this.studyTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyTypesService.findOne(+id);
  }
}
