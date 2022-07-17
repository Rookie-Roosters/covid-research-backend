import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTargetSizeGroupDto } from '../dto/create-target-size-group.dto';
import { TargetSizeGroup } from '../entities/target-size-group.entity';

@Injectable()
export class TargetSizeGroupsService {
    constructor(
        @InjectRepository(TargetSizeGroup)
        private targetSizeGroupRespository: Repository<TargetSizeGroup>,
    ) {}

    async create(createTargetSizeGroupDto: CreateTargetSizeGroupDto): Promise<TargetSizeGroup> {
        let targetSizeGroup = await this.findByValue(createTargetSizeGroupDto.value);
        if (!targetSizeGroup) {
            targetSizeGroup = await this.targetSizeGroupRespository.save(createTargetSizeGroupDto);
        }
        return targetSizeGroup;
    }

    async findAll(): Promise<TargetSizeGroup[]> {
        return await this.targetSizeGroupRespository.find({
            order: {
                value: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<TargetSizeGroup> {
        return await this.targetSizeGroupRespository.findOneBy({ id });
    }

    async findByValue(value: string): Promise<TargetSizeGroup> {
        return await this.targetSizeGroupRespository.createQueryBuilder().where('LOWER(value) = LOWER(:value)', { value }).getOne();
    }
}
