import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnTypeUndefinedError, Repository } from 'typeorm';
import { CreateTargetSizeDto } from '../dto/create-target-size.dto';
import { TargetSizeGroup } from '../entities/target-size-group.entity';
import { TargetSize } from '../entities/target-size.entity';
import { ResearchesService } from '../researches.service';
import { TargetSizeGroupsService } from './target-size-groups.service';

@Injectable()
export class TargetSizesService {
  constructor(
    private targetSizeGroupsService: TargetSizeGroupsService,
    @InjectRepository(TargetSize)
    private targetSizeRepository: Repository<TargetSize>,
  ) {}

  async create(createTargetSizeDto: CreateTargetSizeDto): Promise<TargetSize> {
    let targetSizeGroup: TargetSizeGroup | undefined;
    if (createTargetSizeDto.targetSizeGroup) {
      targetSizeGroup = await this.targetSizeGroupsService.create({
        value: createTargetSizeDto.targetSizeGroup,
      });
    }
    let targetSize = await this.findByValues(
      createTargetSizeDto.researchTrialID,
      targetSizeGroup ? targetSizeGroup.id : undefined,
    );
    if(targetSize) {
      targetSize = await this.targetSizeRepository.save({
        id: targetSize.id,
        count: createTargetSizeDto.count
      });
    } else {
      targetSize = await this.targetSizeRepository.save({
        count: createTargetSizeDto.count,
        research: createTargetSizeDto.researchTrialID,
        targetSizeGroup: targetSizeGroup ? targetSizeGroup.id : undefined
      });
    }
    return targetSize;
  }

  async findAll(): Promise<TargetSize[]> {
    return await this.targetSizeRepository.find();
  }

  async findOne(id: number): Promise<TargetSize> {
    return await this.targetSizeRepository.findOneBy({ id });
  }

  private async findByValues(
    researchTrialID: string,
    targetSizeGroup?: number,
  ): Promise<TargetSize> {
    return await this.targetSizeRepository
      .createQueryBuilder()
      .where('researchTrialID = :reseach and targetSizeGroupId = :group', {
        reseach: researchTrialID,
        group: targetSizeGroup,
      })
      .getOne();
  }
}
