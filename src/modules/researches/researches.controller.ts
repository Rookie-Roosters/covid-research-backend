import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResearchesService } from './researches.service';
import { CreateResearchDto } from './dto/create-research.dto';
import { ApiTags } from '@nestjs/swagger';
import { CsvService } from '../csv/csv.service';
import { join } from 'path';
import { ResearchInterface } from './interfaces/researches.interface';

@ApiTags('Researches')
@Controller('researches')
export class ResearchesController {
  constructor(
    private readonly researchesService: ResearchesService,
    private readonly csvService: CsvService,
  ) {}

  @Get('csv')
  async csv() {
    var data: ResearchInterface[] = await this.csvService.getData(
      join(__dirname, '..', 'src/modules/csv/assets/IctrpResults.csv'),
    );
    for (var d of data) {
      await this.researchesService.create(d, false);
    }
    return data[0];
  }

  @Post()
  async create(@Body() createResearchDto: CreateResearchDto) {
    return await this.researchesService.create(createResearchDto);
  }
}
