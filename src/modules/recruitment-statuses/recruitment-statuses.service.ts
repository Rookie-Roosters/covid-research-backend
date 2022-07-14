import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecruitmentStatusDto } from './dto/create-recruitment-status.dto';
import { UpdateRecruitmentStatusDto } from './dto/update-recruitment-status.dto';
import { RecruitmentStatus } from './entities/recruitment-status.entity';

@Injectable()
export class RecruitmentStatusesService {
  constructor(
    @InjectRepository(RecruitmentStatus)
    private recruitmentStatusRepository: Repository<RecruitmentStatus>,
  ) {}

  async create(
    createRecruitmentStatusDto: CreateRecruitmentStatusDto,
  ): Promise<RecruitmentStatus> {
    return await this.recruitmentStatusRepository.save(
      createRecruitmentStatusDto,
    );
  }

  async findAll(): Promise<RecruitmentStatus[]> {
    return await this.recruitmentStatusRepository.find();
  }

  async findOne(id: number) {
    return await this.recruitmentStatusRepository.findOneBy({ id });
  }

  async findByValue(value: string): Promise<RecruitmentStatus> {
    return await this.recruitmentStatusRepository
      .createQueryBuilder()
      .where('LOWER(value) = LOWER(:value)', { value })
      .getOne();
  }

  async update(
    id: number,
    updateRecruitmentStatusDto: UpdateRecruitmentStatusDto,
  ) {
    return await this.recruitmentStatusRepository.update(
      { id },
      updateRecruitmentStatusDto,
    );
  }

  async remove(id: number) {
    return await this.recruitmentStatusRepository.delete({ id });
  }
}
