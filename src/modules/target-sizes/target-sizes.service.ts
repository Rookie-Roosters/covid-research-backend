import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Research } from '../researches/entities/research.entity';
import { TargetSizeGroup } from '../target-size-groups/entities/target-size-group.entity';
import { CreateTargetSizeDto } from './dto/create-target-size.dto';
import { UpdateTargetSizeDto } from './dto/update-target-size.dto';
import { TargetSize } from './entities/target-size.entity';

@Injectable()
export class TargetSizesService {
  constructor(
    @InjectRepository(TargetSize)
    private targetSizeRepository: Repository<TargetSize>,
    @InjectRepository(Research)
    private researchRepository: Repository<Research>,
    @InjectRepository(TargetSizeGroup)
    private targetSizeGroupRepository: Repository<TargetSizeGroup>,
  ) {}

  async create(createTargetSizeDto: CreateTargetSizeDto) {
    // const research = await this.researchRepository.findOneBy({
    //   trialID: createTargetSizeDto.researchTrialID,
    // });
    // if (research) {
    //   let targetSizeGroup = undefined;
    //   if (createTargetSizeDto.targetSizeGroup) {
    //     targetSizeGroup = await this.targetSizeGroupRepository
    //       .createQueryBuilder()
    //       .where('LOWER(value) = LOWER(:value)', {
    //         value: createTargetSizeDto.targetSizeGroup,
    //       })
    //       .getOne();
    //     if (targetSizeGroup == null) {
    //       targetSizeGroup = await this.targetSizeGroupRepository.save({
    //         value: createTargetSizeDto.targetSizeGroup.toLowerCase(),
    //       });
    //     }
    //     targetSizeGroup = targetSizeGroup.id;
    //   }
    //   return await this.targetSizeRepository.save({
    //     count: createTargetSizeDto.count,
    //     targetSizeGroup: targetSizeGroup,
    //     trialID: research.trialID
    //   });
    // } else {
    //   throw 'target-sizes.services.ts - reseaches.trialID does not exis in the data base.';
    // }
  }

  // findAll() {
  //   return `This action returns all targetSizes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} targetSize`;
  // }

  // update(id: number, updateTargetSizeDto: UpdateTargetSizeDto) {
  //   return `This action updates a #${id} targetSize`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} targetSize`;
  // }
}
