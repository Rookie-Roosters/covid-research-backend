import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseStudyTypeDto } from '@researches/dto/responses';
import { Repository } from 'typeorm';
import { CreateStudyTypeDto } from '../dto/creates/create-study-type.dto';
import { StudyType } from '../entities/study-type.entity';

@Injectable()
export class StudyTypesService {
    constructor(
        @InjectRepository(StudyType)
        private studyTypeRepository: Repository<StudyType>,
    ) {}

    async create(createStudyTypeDto: CreateStudyTypeDto): Promise<ResponseStudyTypeDto> {
        let studyType: StudyType = await this.findByValue(createStudyTypeDto.value);
        if (!studyType) {
            createStudyTypeDto.value = createStudyTypeDto.value.toLowerCase();
            studyType = await this.studyTypeRepository.save(createStudyTypeDto);
        }
        return studyType;
    }

    async findAll(): Promise<ResponseStudyTypeDto[]> {
        return await this.studyTypeRepository.find({
            order: {
                value: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<ResponseStudyTypeDto> {
        return await this.studyTypeRepository.findOneBy({ id });
    }

    async findByValue(value: string): Promise<ResponseStudyTypeDto> {
        return await this.studyTypeRepository.createQueryBuilder().where('LOWER(value) = LOWER(:value)', { value }).getOne();
    }
}
