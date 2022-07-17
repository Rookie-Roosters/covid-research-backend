import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhaseDto } from '../dto/create-phase.dto';
import { Phase } from '../entities/phase.entity';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private phaseRepository: Repository<Phase>,
  ) {}

  async create(createPhaseDto: CreatePhaseDto) : Promise<Phase> {
    let phase: Phase = await this.findByValue(createPhaseDto.value);
    if(!phase) {
      createPhaseDto.value = createPhaseDto.value.toLowerCase();
      phase = await this.phaseRepository.save(createPhaseDto);
    }
    return phase;
  }

  async findAll(): Promise<Phase[]> {
    return await this.phaseRepository.find({
      order: {
        value: 'ASC',
      }
    });
  }

  async findOne(id: number) {
    return await this.phaseRepository.findOneBy({ id });
  }

  async findByValue(value: string): Promise<Phase> {
    return await this.phaseRepository
      .createQueryBuilder()
      .where('LOWER(value) = LOWER(:value)', { value })
      .getOne();
  }
}
