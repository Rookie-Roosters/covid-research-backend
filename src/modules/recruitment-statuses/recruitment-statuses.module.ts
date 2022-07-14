import { Module } from '@nestjs/common';
import { RecruitmentStatusesService } from './recruitment-statuses.service';
import { RecruitmentStatusesController } from './recruitment-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentStatus } from './entities/recruitment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecruitmentStatus])],
  controllers: [RecruitmentStatusesController],
  providers: [RecruitmentStatusesService],
})
export class RecruitmentStatusesModule {}
