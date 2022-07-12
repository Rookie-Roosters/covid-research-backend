import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResearchesService } from './researches.service';
import { CreateResearchDto } from './dto/create-research.dto';
import { UpdateResearchDto } from './dto/update-research.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Researches')
@Controller('researches')
export class ResearchesController {
  constructor(private readonly researchesService: ResearchesService) {}

  @Post()
  create(@Body() createResearchDto: CreateResearchDto) {
    return this.researchesService.create(createResearchDto);
  }

  @Get()
  findAll() {
    return this.researchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResearchDto: UpdateResearchDto,
  ) {
    return this.researchesService.update(+id, updateResearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchesService.remove(+id);
  }
}
