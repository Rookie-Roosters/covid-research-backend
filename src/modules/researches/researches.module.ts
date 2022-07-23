import { CsvModule } from '@csv/csv.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CovidInfoModule } from '../covid-info/covid-info.module';
import {
    PhasesController,
    RecruitmentStatusesController,
    SearchController,
    SourceRegistersController,
    StudyTypesController,
    TargetSizeGroupsController,
} from './controllers';
import { Country, Phase, RecruitmentStatus, Research, ResearchCountry, SourceRegister, StudyType, TargetSize, TargetSizeGroup } from './entities';
import { ResearchesController } from './controllers/researches.controller';
import { ResearchesService } from './services/researches.service';
import {
    CountriesService,
    PhasesService,
    RecruitmentStatusesService,
    ResearchCountriesService,
    SearchService,
    SourceRegistersService,
    StudyTypesService,
    TargetSizeGroupsService,
    TargetSizesService,
} from './services';
import { StatisticsService } from './services/statistics.service';
import { CovidInfo } from '@covid-info/entities/covid-info.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Research, SourceRegister, RecruitmentStatus, TargetSize, TargetSizeGroup, StudyType, Phase, Country, ResearchCountry, CovidInfo]),
        CsvModule,
        CovidInfoModule,
    ],
    controllers: [
        ResearchesController,
        PhasesController,
        RecruitmentStatusesController,
        SourceRegistersController,
        StudyTypesController,
        TargetSizeGroupsController,
        SearchController,
    ],
    providers: [
        ResearchesService,
        PhasesService,
        RecruitmentStatusesService,
        SourceRegistersService,
        StudyTypesService,
        TargetSizesService,
        TargetSizeGroupsService,
        CountriesService,
        ResearchCountriesService,
        SearchService,
        StatisticsService,
    ],
    exports: [ResearchesService],
})
export class ResearchesModule {}
