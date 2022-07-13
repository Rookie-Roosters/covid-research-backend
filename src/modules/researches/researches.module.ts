import { Module } from '@nestjs/common';
import { ResearchesService } from './researches.service';
import { ResearchesController } from './researches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Research } from './entities/research.entity';
import { CsvService } from '../csv/csv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Research])],
  controllers: [ResearchesController],
  providers: [ResearchesService, CsvService],
})
export class ResearchesModule {}
