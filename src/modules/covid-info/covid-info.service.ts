import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CovidInfo } from './entities/covid-info.entity';
import { CsvService } from '../csv/csv.service';
import { join } from 'path';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PATHS } from '@utils/constants/paths.constants';

@Injectable()
export class CovidInfoService {
    constructor(private csvService: CsvService, @InjectRepository(CovidInfo) private covidInfoRepository: Repository<CovidInfo>) {}

    findAll(): Promise<CovidInfo[]> {
        return this.covidInfoRepository.find();
    }

    findOne(iso_code: string): Promise<CovidInfo> {
        const covidInfo = this.covidInfoRepository.findOne({
            where: { iso_code: iso_code },
        });
        return covidInfo;
    }

    @Cron(CronExpression.EVERY_HOUR)
    async updateAll() {
        console.log('update covid info started');
        const results = await this.csvService.getCovidInfoData(PATHS.ASSETS);
        for (let res of results) {
            await this.covidInfoRepository.save(res);
        }
        console.log('update covid info finished');
    }

    async findOneByValue(value: string): Promise<CovidInfo> {
        return await this.covidInfoRepository.findOneBy({
            location: value,
        });
    }
}
