import { Module } from '@nestjs/common';
import { TargetSizeGroupsService } from './target-size-groups.service';
import { TargetSizeGroupsController } from './target-size-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetSizeGroup } from './entities/target-size-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TargetSizeGroup])],
  controllers: [TargetSizeGroupsController],
  providers: [TargetSizeGroupsService],
})
export class TargetSizeGroupsModule {}
