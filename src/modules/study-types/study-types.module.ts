import { Module } from '@nestjs/common';
import { StudyTypesService } from './study-types.service';
import { StudyTypesController } from './study-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyType } from './entities/study-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyType])],
  controllers: [StudyTypesController],
  providers: [StudyTypesService],
})
export class StudyTypesModule {}
