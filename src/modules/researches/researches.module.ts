import { Module } from '@nestjs/common';
import { ResearchesService } from './researches.service';
import { ResearchesController } from './researches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Research } from './entities/research.entity';
import { SourceRegistersService } from '../source-registers/source-registers.service';
import { CsvService } from '../csv/csv.service';
import { SourceRegister } from '../source-registers/entities/source-register.entity';
import { RecruitmentStatus } from '../recruitment-statuses/entities/recruitment-status.entity';
import { RecruitmentStatusesService } from '../recruitment-statuses/recruitment-statuses.service';
import { TargetSize } from '../target-sizes/entities/target-size.entity';
import { TargetSizesService } from '../target-sizes/target-sizes.service';
import { TargetSizeGroup } from '../target-size-groups/entities/target-size-group.entity';
import { StudyType } from '../study-types/entities/study-type.entity';
import { StudyTypesService } from '../study-types/study-types.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Research,
      SourceRegister,
      RecruitmentStatus,
      TargetSize,
      TargetSizeGroup,
      StudyType,
    ]),
  ],
  controllers: [ResearchesController],
  providers: [
    ResearchesService,
    CsvService,
    SourceRegistersService,
    RecruitmentStatusesService,
    TargetSizesService,
    StudyTypesService,
  ],
})
export class ResearchesModule {}
