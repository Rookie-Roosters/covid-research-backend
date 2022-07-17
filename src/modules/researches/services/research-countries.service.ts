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
        const country = await this.countriesService.create({value: createResearchCountryDto.country});
        const researchCountry = await this.findOneByValue(country.id, createResearchCountryDto.researchId);
        return await this.researchCountryRepository.save({
           id: researchCountry ? researchCountry.id : undefined,
           country: country.id,
           research: createResearchCountryDto.researchId 
        });
    }

    async findAll(): Promise<ResearchCountry[]> {
        return await this.researchCountryRepository.find();
    }

    async findOne(id: number): Promise<ResearchCountry> {
        return await this.researchCountryRepository.findOneBy({ id });
    }

    private async findOneByValue(countryId: number, researchId: string) : Promise<ResearchCountry> {
        return await this.researchCountryRepository.createQueryBuilder()
        .where('researchId = :reseach and countryId = :country', {
            reseach: researchId,
            country: countryId
        })
        .getOne();
    }
}