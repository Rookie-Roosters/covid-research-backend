import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateResearchCountryDto } from "@researches/dto/creates";
import { ResponseResearchCountryDto } from "@researches/dto/responses";
import { Research, ResearchCountry } from "@researches/entities";
import { ResearchesService } from "@researches/researches.service";
import to from "await-to-js";
import { Repository } from "typeorm";
import { CountriesService } from "./countries.service";

@Injectable()
export class ResearchCountriesService {
    constructor(
        private countriesService: CountriesService,
        @InjectRepository(Research)
        private researchRepository: Repository<Research>,
        @InjectRepository(ResearchCountry)
        private researchCountryRepository: Repository<ResearchCountry>
    ) {}

    async create(createResearchCountryDto: CreateResearchCountryDto) : Promise<ResearchCountry> {
        const country = await this.countriesService.create({value: createResearchCountryDto.country});
        const researchCountry = await this.findOneByValue(country.id, createResearchCountryDto.researchId);
        const research = await this.researchRepository.findOneBy({id: createResearchCountryDto.researchId});
        return await this.researchCountryRepository.save({
            id: researchCountry ? researchCountry.id : undefined,
            country: country,
            research: research
        });
    }

    async findAll(): Promise<ResearchCountry[]> {
        return await this.researchCountryRepository.find();
    }

    async findOne(id: number): Promise<ResearchCountry> {
        return await this.researchCountryRepository.findOneBy({ id });
    }

    async findByResearch(researchId: string ) : Promise<ResponseResearchCountryDto[]> {
        const [err, res] = await to(
            this.researchCountryRepository.find({
                where: {
                    research: {
                        id: researchId,
                    },
                },
                relations: ['country', 'country.covidInfo']
            })
        );
        if(res) return res as unknown as ResponseResearchCountryDto[];
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