import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as https from 'https';
import { InjectRepository } from '@nestjs/typeorm';
import { CovidInfo } from './entities/covid-info.entity';
import { CsvService } from '../csv/csv.service';
import { join } from 'path';

@Injectable()
export class CovidInfoService {
    constructor(private csvService: CsvService, @InjectRepository(CovidInfo) private covidInfoRepository: Repository<CovidInfo>) {}

    findAll(): Promise<CovidInfo[]> {
        return this.covidInfoRepository.find();
    }

    findOne(iso_code: string): Promise<CovidInfo> {
        try {
            const covidInfo = this.covidInfoRepository.findOneOrFail({
                where: { iso_code: iso_code },
            });
            return covidInfo;
        } catch (err) {}
    }

    async updateAll() {
        const results = await this.csvService.getCovidInfoData(join(__dirname, '..', 'src/modules/csv/assets/covid-data.txt'));
        for (let res of results) {
            await this.covidInfoRepository.save(res);
        }
    }
}
