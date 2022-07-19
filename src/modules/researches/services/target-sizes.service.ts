import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTargetSizeDto } from '@researches/dto';
import { Research, TargetSize, TargetSizeGroup } from '@researches/entities';
import { Repository } from 'typeorm';
import { TargetSizeGroupsService } from './target-size-groups.service';
import to from 'await-to-js';
import { ResearchesService } from '@researches/researches.service';
import { Inject } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class TargetSizesService {
    constructor(
        private targetSizeGroupsService: TargetSizeGroupsService,
        @InjectRepository(TargetSize)
        private targetSizeRepository: Repository<TargetSize>,
        @InjectRepository(Research)
        private researchesRepository: Repository<Research>,
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
            const research = await this.researchesRepository.findOneBy({ id: createTargetSizeDto.researchId });
            targetSize = await this.targetSizeRepository.save({
                count: createTargetSizeDto.count,
                research: research,
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
        const [err, res] = await to(
            this.targetSizeRepository.find({
                relations: {
                    research: true,
                },
                where: {
                    research: {
                        id: researchId,
                    },
                },
            }),
        );
        if (res) return res;
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
