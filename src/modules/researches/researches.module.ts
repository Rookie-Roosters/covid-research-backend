import { CsvModule } from '@csv/csv.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CountriesController,
    PhasesController,
    RecruitmentStatusesController,
    ResearchCountriesController,
    SourceRegistersController,
    StudyTypesController,
    TargetSizeGroupsController,
    TargetSizesController,
} from './controllers';
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
    ],
    controllers: [
        ResearchesController,
        PhasesController,
        RecruitmentStatusesController,
        SourceRegistersController,
        StudyTypesController,
        TargetSizesController,
        TargetSizeGroupsController,
        CountriesController,
        ResearchCountriesController,
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
})
export class ResearchesModule {}
