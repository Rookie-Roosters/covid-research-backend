import { Controller, Get } from '@nestjs/common';
import { ResearchesService } from './researches.service';

@Controller('researches')
export class ResearchesController {
    constructor(
        private researchesService: ResearchesService,
    ) {}

    @Get('csv')
    async getCsv() {
        return await this.researchesService.updateAll();
    }
}
