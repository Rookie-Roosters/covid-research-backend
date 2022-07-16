import { Controller, Get, Param } from '@nestjs/common';
import { ResearchCountriesService } from '@researches/services';

@Controller('research-countries')
export class ResearchCountriesController {
    constructor(private readonly researchCountriesService: ResearchCountriesService) {}

    @Get()
    findAll() {
        return this.researchCountriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.researchCountriesService.findOne(+id);
    }
}
