import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from '@researches/services';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Get()
    findAll() {
        return this.countriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.countriesService.findOne(+id);
    }
}
