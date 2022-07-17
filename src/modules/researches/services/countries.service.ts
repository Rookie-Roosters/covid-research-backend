import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '@researches/entities';
import { CreateCountryDto } from '@researches/dto';
import { CovidInfoService } from 'src/modules/covid-info/covid-info.service';

@Injectable()
export class CountriesService {
    constructor(
        private covidInfoService: CovidInfoService,
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
    ) {}

    async create(createCountryDto: CreateCountryDto): Promise<Country> {
        let country = await this.findByValue(createCountryDto.value);
        if(!country) {
            const covidInfo = await this.covidInfoService.findOneByValue(createCountryDto.value);
            country = await this.countryRepository.save({
                covidInfo: covidInfo ? covidInfo.iso_code : undefined,
                value: createCountryDto.value
            });
        }
        return country;
    }

    async findAll(): Promise<Country[]> {
        return await this.countryRepository.find();
    }

    async findOne(id: number): Promise<Country> {
        return await this.countryRepository.findOneBy({ id });
    }

    private async findByValue(value: string) : Promise<Country> {
        return await this.countryRepository.findOneBy({
            value
        });
    }
}
