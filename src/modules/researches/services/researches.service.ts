import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResearchCreateDto, ResearchUpdateDto } from '@researches/dto';
import { Research } from '@researches/entities';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ResearchesService {
    constructor(
        @InjectRepository(Research)
        private researchesRepository: Repository<Research>,
    ) {}

    create(researchCreateDto: ResearchCreateDto): Promise<Research> {
        const research = this.researchesRepository.save(researchCreateDto as Research);
        return research;
    }

    findAll(): Promise<Research[]> {
        const researches = this.researchesRepository.find();
        return researches;
    }

    findOne(id: number): Promise<Research> {
        const research = this.researchesRepository.findOneBy({ id });
        return research;
    }

    update(id: number, researchUpdateDto: ResearchUpdateDto): Promise<Research> {
        const research = this.researchesRepository.save({ id, ...researchUpdateDto } as Research);
        return research;
    }

    async remove(id: number): Promise<DeleteResult> {
        const deleted = await this.researchesRepository.delete(id);
        return deleted;
    }
}
