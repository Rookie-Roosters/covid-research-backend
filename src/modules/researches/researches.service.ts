import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResearchDto } from './dto/create-research.dto';
import { UpdateResearchDto } from './dto/update-research.dto';
import { Research } from './entities/research.entity';

@Injectable()
export class ResearchesService {
  constructor(
    @InjectRepository(Research)
    private researchRespository: Repository<Research>,
  ) {}

  async create(createResearchDto: CreateResearchDto) {
    return await this.researchRespository.save(createResearchDto);
  }

  async findAll() {
    return await this.researchRespository.find();
  }

  async findOne(trialID: string) {
    return await this.researchRespository.findOneBy({ trialID });
  }

  async update(trialID: string, updateResearchDto: UpdateResearchDto) {
    return await this.researchRespository.update(
      { trialID },
      updateResearchDto,
    );
  }

  async remove(trialID: string) {
    return await this.researchRespository.delete({ trialID });
  }
}
