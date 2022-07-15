import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchCreateDto, SearchUpdateDto } from '@searches/dto';
import { Search } from '@searches/entities';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class SearchesService {
    constructor(
        @InjectRepository(Search)
        private searchesRepository: Repository<Search>,
    ) {}

    create(createSearchDto: SearchCreateDto): Promise<Search> {
        const search = this.searchesRepository.save(createSearchDto as Search);
        return search;
    }

    findAll(): Promise<Search[]> {
        const searches = this.searchesRepository.find();
        return searches;
    }

    findOne(id: number): Promise<Search> {
        const search = this.searchesRepository.findOneBy({ id });
        return search;
    }

    update(id: number, searchUpdateDto: SearchUpdateDto): Promise<Search> {
        const search = this.searchesRepository.save({ id, ...searchUpdateDto } as Search);
        return search;
    }

    async remove(id: number): Promise<DeleteResult> {
        const deleted = await this.searchesRepository.delete(id);
        return deleted;
    }
}
