import { Module } from '@nestjs/common';
import { CovidInfoService } from './covid-info.service';
import { CovidInfoController } from './covid-info.controller';
import { CovidInfo } from './entities/covid-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CovidInfo])],
  controllers: [CovidInfoController],
  providers: [CovidInfoService]
})
export class CovidInfoModule {}
