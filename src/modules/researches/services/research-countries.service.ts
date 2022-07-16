import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateResearchCountryDto } from "@researches/dto";
import { ResearchCountry } from "@researches/entities";
import { Repository } from "typeorm";
import { CountriesService } from "./countries.service";

@Injectable()
export class ResearchCountriesService {
    constructor(
        private countriesService: CountriesService,
        @InjectRepository(ResearchCountry)
        private researchCountryRepository: Repository<ResearchCountry>
    ) {}

    async create(createResearchCountryDto: CreateResearchCountryDto) : Promise<ResearchCountry> {
        const countrie = await this.countriesService.create({value: createResearchCountryDto.country});
        return new ResearchCountry();
    }

    async findAll(): Promise<ResearchCountry[]> {
        return await this.researchCountryRepository.find();
    }

    async findOne(id: number): Promise<ResearchCountry> {
        return await this.researchCountryRepository.findOneBy({ id });
    }
}