import { CsvModule } from '@csv/csv.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CovidInfoModule } from '../covid-info/covid-info.module';
import { PhasesController, RecruitmentStatusesController, SourceRegistersController, StudyTypesController, TargetSizeGroupsController } from './controllers';
import { Country, Phase, RecruitmentStatus, Research, ResearchCountry, SourceRegister, StudyType, TargetSize, TargetSizeGroup } from './entities';
import { ResearchesController } from './researches.controller';
import { ResearchesService } from './researches.service';
import {
    CountriesService,
    PhasesService,
    RecruitmentStatusesService,
    ResearchCountriesService,
    SourceRegistersService,
    StudyTypesService,
    TargetSizeGroupsService,
    TargetSizesService,
} from './services';

@Module({
    imports: [
        TypeOrmModule.forFeature([Research, SourceRegister, RecruitmentStatus, TargetSize, TargetSizeGroup, StudyType, Phase, Country, ResearchCountry]),
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
    ],
    exports: [
        ResearchesService,
    ]
})
export class ResearchesModule {}
