import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecruitmentStatusDto } from '@researches/dto/creates';
import { ResponseRecruitmentStatusDto } from '@researches/dto/responses';
import { RecruitmentStatus } from '@researches/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RecruitmentStatusesService {
    constructor(
        @InjectRepository(RecruitmentStatus)
        private recruitmentStatusRepository: Repository<RecruitmentStatus>,
    ) {}

    async create(createRecruitmentStatusDto: CreateRecruitmentStatusDto): Promise<ResponseRecruitmentStatusDto> {
        let recruitmentStatus: RecruitmentStatus = await this.findByValue(createRecruitmentStatusDto.value);
        if (!recruitmentStatus) {
            createRecruitmentStatusDto.value = createRecruitmentStatusDto.value.toLowerCase();
            recruitmentStatus = await this.recruitmentStatusRepository.save(createRecruitmentStatusDto);
        }
        return recruitmentStatus;
    }

    async findAll(): Promise<ResponseRecruitmentStatusDto[]> {
        return await this.recruitmentStatusRepository.find({
            order: {
                value: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<ResponseRecruitmentStatusDto> {
        return await this.recruitmentStatusRepository.findOneBy({ id });
    }

    async findByValue(value: string): Promise<ResponseRecruitmentStatusDto> {
        return await this.recruitmentStatusRepository.createQueryBuilder().where('LOWER(value) = LOWER(:value)', { value }).getOne();
    }
}
