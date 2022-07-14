import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecruitmentStatusesService } from '../recruitment-statuses/recruitment-statuses.service';
import { SourceRegistersService } from '../source-registers/source-registers.service';
import { StudyTypesService } from '../study-types/study-types.service';
import { TargetSizeGroupsService } from '../target-size-groups/target-size-groups.service';
import { TargetSizesService } from '../target-sizes/target-sizes.service';
import { CreateResearchDto } from './dto/create-research.dto';
import { Research } from './entities/research.entity';

@Injectable()
export class ResearchesService {
  constructor(
    private readonly sourceRegistersService: SourceRegistersService,
    private readonly recruitmentStatusesService: RecruitmentStatusesService,
    private readonly targetSizesService: TargetSizesService,
    private readonly studyTypesService: StudyTypesService,
    @InjectRepository(Research)
    private researchRespository: Repository<Research>,
  ) {}

  async create(createResearchDto: CreateResearchDto) {
    let research = new Research();
    for (var k in createResearchDto) {
      if (k == 'sourceRegister') {
        if (createResearchDto.sourceRegister) {
          let sourceRegister = await this.sourceRegistersService.findByValue(
            createResearchDto.sourceRegister,
          );
          if (sourceRegister == null) {
            sourceRegister = await this.sourceRegistersService.create({
              value: createResearchDto.sourceRegister,
            });
          }
          research.sourceRegister = sourceRegister.id;
        } else {
          research.sourceRegister = undefined;
        }
      } else if (k == 'recruitmentStatus') {
        if (createResearchDto.recruitmentStatus) {
          let recruitmentStatus =
            await this.recruitmentStatusesService.findByValue(
              createResearchDto.recruitmentStatus,
            );
          if (recruitmentStatus == null) {
            recruitmentStatus = await this.recruitmentStatusesService.create({
              value: createResearchDto.recruitmentStatus.toLowerCase(),
            });
          }
          research.recruitmentStatus = recruitmentStatus.id;
        } else {
          research.recruitmentStatus = undefined;
        }
      } else if (k == 'studyType') {
        // if (createResearchDto.studyType) {
        //   let studyType =
        //     await this.studyTypesService.findByValue(
        //       createResearchDto.studyType,
        //     );
        //   if (studyType == null) {
        //     studyType = await this.studyTypesService.create({
        //       value: createResearchDto.studyType,
        //     });
        //   }
        //   research.studyType = studyType.id;
        // } else {
        //   research.studyType = undefined;
        // }
      } else {
        research[k] = createResearchDto[k];
      }
    }
    research = await this.researchRespository.save(research);
    for (let targetSize of createResearchDto.targetSize) {
      await this.targetSizesService.create({
        researchTrialID: research.trialID,
        count: targetSize.count,
        targetSizeGroup: targetSize.group,
      });
    }
    return research;
  }

  // async findAll() {
  //   return await this.researchRespository.find();
  // }

  async findOne(trialID: string) {
    return await this.researchRespository.findOneBy({ trialID });
  }

  // async update(trialID: string, updateResearchDto: UpdateResearchDto) {
  //   return await this.researchRespository.update(
  //     { trialID },
  //     updateResearchDto,
  //   );
  // }

  // async remove(trialID: string) {
  //   return await this.researchRespository.delete({ trialID });
  // }
}
