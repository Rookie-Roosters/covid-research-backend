import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTargetSizeDto } from '@researches/dto';
import { Research, TargetSize, TargetSizeGroup } from '@researches/entities';
import { Repository } from 'typeorm';
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
        let targetSize = await this.findByValues(createTargetSizeDto.researchId, targetSizeGroup ? targetSizeGroup.id : undefined);
        if (targetSize) {
            targetSize = await this.targetSizeRepository.save({
                id: targetSize.id,
                count: createTargetSizeDto.count,
            });
        } else {
            targetSize = await this.targetSizeRepository.save({
                count: createTargetSizeDto.count,
                research: createTargetSizeDto.researchId,
                targetSizeGroup: targetSizeGroup ? targetSizeGroup.id : undefined,
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

    async findByResearch(researchId: string): Promise<TargetSize[]> {
        return await this.targetSizeRepository.find({
            where: {
                research: researchId,
            }
        });
    }

    private async findByValues(researchId: string, targetSizeGroup?: number): Promise<TargetSize> {
        return await this.targetSizeRepository
            .createQueryBuilder()
            .where('researchId = :reseach and targetSizeGroupId = :group', {
                reseach: researchId,
                group: targetSizeGroup,
            })
            .getOne();
    }
}
