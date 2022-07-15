import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudyTypeDto } from './dto/create-study-type.dto';
import { UpdateStudyTypeDto } from './dto/update-study-type.dto';
import { StudyType } from './entities/study-type.entity';

@Injectable()
export class StudyTypesService {
  constructor(
    @InjectRepository(StudyType)
    private studyTypeRepository: Repository<StudyType>,
  ) {}

  async create(CreateStudyTypeDto: CreateStudyTypeDto): Promise<StudyType> {
    return await this.studyTypeRepository.save(CreateStudyTypeDto);
  }

  async findAll(): Promise<StudyType[]> {
    return await this.studyTypeRepository.find();
  }

  async findOne(id: number): Promise<StudyType> {
    return await this.studyTypeRepository.findOneBy({ id });
  }

  async findByValue(value: string): Promise<StudyType> {
    return await this.studyTypeRepository
      .createQueryBuilder()
      .where('LOWER(value) = LOWER(:value)', { value })
      .getOne();
  }

  async update(id: number, updateStudyTypeDto: UpdateStudyTypeDto) {
    return await this.studyTypeRepository.update({ id }, updateStudyTypeDto);
  }

  async remove(id: number) {
    return await this.studyTypeRepository.delete({ id });
  }
}
