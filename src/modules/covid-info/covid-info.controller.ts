import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CovidInfoService } from './covid-info.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CovidInfo } from './entities/covid-info.entity'

@ApiTags('CovidInfo')
@Controller('covid-info')
export class CovidInfoController {
  constructor(private readonly covidInfoService: CovidInfoService) {}

  @Patch()
  @ApiResponse({ type: CovidInfo })
  findAll(): Promise<CovidInfo[]> {
    return this.covidInfoService.findAll();
  }

  @Get(':iso_code')
  @ApiBody({ type: String })
  @ApiResponse({ type: CovidInfo })
  findOne(@Param('iso_code') iso_code: string): Promise<CovidInfo> {
    return this.covidInfoService.findOne(iso_code);
  }

  @Get('csv')
  updateAll() {
    return this.covidInfoService.updateAll();
  }
}
