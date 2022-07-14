import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { StudyTypesService } from './study-types.service';
import { CreateStudyTypeDto } from './dto/create-study-type.dto';
import { UpdateStudyTypeDto } from './dto/update-study-type.dto';

@Controller('study-types')
export class StudyTypesController {
  constructor(private readonly studyTypesService: StudyTypesService) {}

  @Post()
  create(@Body() createStudyTypeDto: CreateStudyTypeDto) {
    return this.studyTypesService.create(createStudyTypeDto);
  }

  @Get()
  findAll() {
    return this.studyTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyTypesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudyTypeDto: UpdateStudyTypeDto,
  ) {
    return this.studyTypesService.update(+id, updateStudyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyTypesService.remove(+id);
  }
}
