import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseTargetSizeGroupDto } from '@researches/dto/responses';
import { Repository } from 'typeorm';
import { CreateTargetSizeGroupDto } from '../dto/creates/create-target-size-group.dto';
import { TargetSizeGroup } from '../entities/target-size-group.entity';

@Injectable()
export class TargetSizeGroupsService {
    constructor(
        @InjectRepository(TargetSizeGroup)
        private targetSizeGroupRespository: Repository<TargetSizeGroup>,
    ) {}

    async create(createTargetSizeGroupDto: CreateTargetSizeGroupDto): Promise<ResponseTargetSizeGroupDto> {
        let targetSizeGroup = await this.findByValue(createTargetSizeGroupDto.value);
        if (!targetSizeGroup) {
            targetSizeGroup = await this.targetSizeGroupRespository.save(createTargetSizeGroupDto);
        }
        return targetSizeGroup;
    }

    async findAll(): Promise<ResponseTargetSizeGroupDto[]> {
        return await this.targetSizeGroupRespository.find({
            order: {
                value: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<ResponseTargetSizeGroupDto> {
        return await this.targetSizeGroupRespository.findOneBy({ id });
    }

    async findByValue(value: string): Promise<ResponseTargetSizeGroupDto> {
        return await this.targetSizeGroupRespository.createQueryBuilder().where('LOWER(value) = LOWER(:value)', { value }).getOne();
    }
}
