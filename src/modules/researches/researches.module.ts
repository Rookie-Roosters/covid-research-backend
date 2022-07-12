import { Module } from '@nestjs/common';
import { ResearchesService } from './researches.service';
import { ResearchesController } from './researches.controller';

@Module({
  controllers: [ResearchesController],
  providers: [ResearchesService]
})
export class ResearchesModule {}
