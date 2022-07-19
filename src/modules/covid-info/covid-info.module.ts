import { Module } from '@nestjs/common';
import { CovidInfoService } from './covid-info.service';
import { CovidInfoController } from './covid-info.controller';
import { CovidInfo } from './entities/covid-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from '../csv/csv.module';

@Module({
  imports: [TypeOrmModule.forFeature([CovidInfo]), CsvModule],
  controllers: [CovidInfoController],
  providers: [CovidInfoService],
  exports: [CovidInfoService]
})
export class CovidInfoModule {}
