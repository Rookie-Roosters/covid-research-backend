import { Module } from '@nestjs/common';
import { TargetSizesService } from './target-sizes.service';
import { TargetSizesController } from './target-sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetSize } from './entities/target-size.entity';
import { Research } from '../researches/entities/research.entity';
import { TargetSizeGroup } from '../target-size-groups/entities/target-size-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TargetSize, Research, TargetSizeGroup])],
  controllers: [TargetSizesController],
  providers: [TargetSizesService],
})
export class TargetSizesModule {}
