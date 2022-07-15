import { Module } from '@nestjs/common';
import { ResearchesService } from './researches.service';
import { ResearchesController } from './researches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Research } from './entities/research.entity';
import { SourceRegister } from './entities/source-register.entity';
import { RecruitmentStatus } from './entities/recruitment-status.entity';
import { TargetSize } from './entities/target-size.entity';
import { TargetSizeGroup } from './entities/target-size-group.entity';
import { StudyType } from './entities/study-type.entity';
import { Phase } from './entities/phase.entity';
import { CsvModule } from '../csv/csv.module';
import { PhasesService } from './services/phases.service';
import { RecruitmentStatusesService } from './services/recruitment-statuses.service';
import { PhasesController } from './controllers/phases.controller';
import { RecruitmentStatusesController } from './controllers/recruitment-statuses.controller';
import { SourceRegistersController } from './controllers/source-registers.controller';
import { SourceRegistersService } from './services/source-registers.service';
import { StudyTypesController } from './controllers/study-types.controller';
import { StudyTypesService } from './services/study-types.service';
import { TargetSizesController } from './controllers/target-sizes.controller';
import { TargetSizesService } from './services/target-sizes.service';
import { TargetSizeGroupsController } from './controllers/target-size-groups.controller';
import { TargetSizeGroupsService } from './services/target-size-groups.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Research,
      SourceRegister,
      RecruitmentStatus,
      TargetSize,
      TargetSizeGroup,
      StudyType,
      Phase,
    ]),
    CsvModule,
  ],
  controllers: [
    ResearchesController,
    PhasesController,
    RecruitmentStatusesController,
    SourceRegistersController,
    StudyTypesController,
    TargetSizesController,
    TargetSizeGroupsController
  ],
  providers: [
    ResearchesService,
    PhasesService,
    RecruitmentStatusesService,
    SourceRegistersService,
    StudyTypesService,
    TargetSizesService,
    TargetSizeGroupsService
  ],
})
export class ResearchesModule {}
