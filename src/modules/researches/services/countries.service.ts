import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '@researches/entities';
import { CreateCountryDto } from '@researches/dto';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
    ) {}

    async create(createCountryDto: CreateCountryDto): Promise<Country> {
        return new Country();
    }

    async findAll(): Promise<Country[]> {
        return await this.countryRepository.find();
    }

    async findOne(id: number): Promise<Country> {
        return await this.countryRepository.findOneBy({ id });
    }
}
