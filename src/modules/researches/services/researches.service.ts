import { CsvService } from '@csv/csv.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PATHS } from '@utils/constants/paths.constants';
import { In, Repository } from 'typeorm';
import { CreateResearchDto } from '../dto/creates';
import { ResponseResearchDto } from '../dto/responses/response-research.dto';
import { Country, Research, ResearchCountry, StudyType } from '../entities';
import { ResearchInterface } from '../interfaces/researches.interface';
import { PhasesService, RecruitmentStatusesService, ResearchCountriesService, SourceRegistersService, StudyTypesService, TargetSizesService } from '.';
import to from 'await-to-js';
import { NotFoundException } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CovidInfoService } from '@covid-info/covid-info.service';
import { ResponseStatisticsDto, ResponseStatsByCountry } from '@researches/dto/responses';
import { CovidInfoDto } from '@covid-info/dto/covid-info.dto';
import globalStats from '../jsons/global-stats.json';
import { ResponseWorldStats } from '@researches/dto/responses/response-world-stats.dto';

@Injectable()
export class ResearchesService {
    constructor(
        private sourceRegistersService: SourceRegistersService,
        private recruitmentStatusesService: RecruitmentStatusesService,
        private studyTypesService: StudyTypesService,
        private csvService: CsvService,
        private phasesService: PhasesService,
        private targetSizesService: TargetSizesService,
        private researchCountriesService: ResearchCountriesService,
        private statisticsService: StatisticsService,
        private covidInfoService: CovidInfoService,
        @InjectRepository(Research)
        private researchRespository: Repository<Research>,
        @InjectRepository(Country)
        private countriesRepository: Repository<Country>,
        @InjectRepository(ResearchCountry)
        private researchCountriesRepository: Repository<ResearchCountry>,
    ) {}

    @Cron(CronExpression.EVERY_HOUR)
    async updateAll(): Promise<number> {
        console.log('update research database started');
        const results: ResearchInterface[] = await this.csvService.getResearchData(PATHS.ASSETS);
        for (const res of results) {
            await this.create(res, false);
        }
        console.log('update research database finished');
        return results.length;
    }

    async create(createResearchDto: CreateResearchDto, clean = true): Promise<Research> {
        const research = await this.researchRespository.save(
            clean ? await this.getCleanResearch(createResearchDto) : await this.getResearch(createResearchDto),
        );
        for (const target of createResearchDto.targetSize) {
            if (clean && target.group) target.group = this.csvService.getProcessedString(target.group).toLowerCase();
            await this.targetSizesService.create({
                researchId: research.id,
                count: target.count,
                targetSizeGroup: target.group,
            });
        }
        for (let country of createResearchDto.countries) {
            if (clean) country = this.csvService.getProcessedString(country).toLowerCase();
            await this.researchCountriesService.create({
                researchId: research.id,
                country: country,
            });
        }
        return research;
    }

    async findAll() {
        return await this.researchRespository.find();
    }

    async findOneById(id: string): Promise<Research> {
        if (await this.existsId(id)) {
            const research = await this.researchRespository.findOneBy({ id });
            if (!research) throw new NotFoundException(`Research with id ${id} not found`);
            return research;
        } else throw new NotFoundException('Research not found');
    }

    async findOne(id: string): Promise<ResponseResearchDto> | null {
        if (await this.existsId(id)) {
            const [err, research] = await to(
                this.researchRespository.findOne({
                    where: {
                        id,
                    },
                    relations: {
                        recruitmentStatus: true,
                        phase: true,
                        sourceRegister: true,
                        studyType: true,
                    },
                }),
            );
            const responseResearch: ResponseResearchDto = new ResponseResearchDto();
            for (const attr in research) {
                responseResearch[attr] = research[attr];
            }
            responseResearch.targetSizes = await this.targetSizesService.findByResearch(responseResearch.id);
            responseResearch.countries = await this.researchCountriesService.findByResearch(responseResearch.id);
            research.views++;
            this.researchRespository.save(research);
            return responseResearch;
        } else throw new NotFoundException('Research not found');
    }

    private async getCleanResearch(createResearchDto: CreateResearchDto): Promise<Research> {
        const research: Research = {
            id: this.csvService.getProcessedString(createResearchDto.id),
            lastRefreshedOn: createResearchDto.lastRefreshedOn,
            publicTitle: this.csvService.getProcessedString(createResearchDto.publicTitle),
            scientificTitle: this.csvService.getProcessedStringNull(createResearchDto.scientificTitle),
            acronym: this.csvService.getProcessedStringNull(createResearchDto.acronym),
            primarySponsor: this.csvService.getProcessedStringNull(createResearchDto.primarySponsor),
            dateRegistration: createResearchDto.dateRegistration,
            webAddress: this.csvService.getProcessedString(createResearchDto.webAddress),
            otherRecords: createResearchDto.otherRecords,
            inclusionAgeMin: createResearchDto.inclusionAgeMin,
            inclusionAgeMinType: createResearchDto.inclusionAgeMinType,
            inclusionAgeMax: createResearchDto.inclusionAgeMax,
            inclusionAgeMaxType: createResearchDto.inclusionAgeMaxType,
            inclusionGender: createResearchDto.inclusionGender,
            dateEnrollement: createResearchDto.dateEnrollement,
            studyDesign: this.csvService.getProcessedStringNull(createResearchDto.studyDesign),
            contactFirstname: this.csvService.getProcessedStringNull(createResearchDto.contactFirstname),
            contactLastname: this.csvService.getProcessedStringNull(createResearchDto.contactLastname),
            contactAddress: this.csvService.getProcessedStringNull(createResearchDto.contactAddress),
            contactEmail: this.csvService.getProcessedStringNull(createResearchDto.contactEmail),
            contactTel: this.csvService.getProcessedStringNull(createResearchDto.contactTel),
            contactAffiliation: this.csvService.getProcessedStringNull(createResearchDto.contactAffiliation),
            inclusionCriteria: this.csvService.getProcessedStringNull(createResearchDto.inclusionCriteria),
            exclusionCriteria: this.csvService.getProcessedStringNull(createResearchDto.exclusionCriteria),
            condition: this.csvService.getProcessedStringNull(createResearchDto.condition),
            intervention: this.csvService.getProcessedStringNull(createResearchDto.intervention),
            primaryOutcome: this.csvService.getProcessedStringNull(createResearchDto.primaryOutcome),
            secondaryOutcome: this.csvService.getProcessedStringNull(createResearchDto.secondaryOutcome),
            resultsDatePosted: createResearchDto.resultsDatePosted,
            resultsDateCompleted: createResearchDto.resultsDateCompleted,
            resultsUrlLink: this.csvService.getProcessedStringNull(createResearchDto.resultsUrlLink),
            retrospectiveFlag: createResearchDto.retrospectiveFlag,
            bridgingFlag: createResearchDto.bridgingFlag,
            bridgedType: createResearchDto.bridgedType,
            results: createResearchDto.results,
            studyType: new StudyType(),
        };

        if (createResearchDto.sourceRegister) {
            research.sourceRegister = await this.sourceRegistersService.create({
                value: this.csvService.getProcessedString(createResearchDto.sourceRegister),
            });
        }
        if (createResearchDto.recruitmentStatus) {
            research.recruitmentStatus = await this.recruitmentStatusesService.create({
                value: this.csvService.getProcessedString(createResearchDto.recruitmentStatus),
            });
        }
        research.studyType = await this.studyTypesService.create({
            value: this.csvService.getStudyType(createResearchDto.studyType),
        });
        if (createResearchDto.phase) {
            research.phase = await this.phasesService.create({
                value: this.csvService.transformPhaseNull(createResearchDto.phase),
            });
        }
        return research;
    }

    private async getResearch(createResearchDto: CreateResearchDto): Promise<Research> {
        const research = new Research();
        for (const attr in createResearchDto) {
            if (attr == 'sourceRegister') {
                if (createResearchDto.sourceRegister) {
                    research.sourceRegister = await this.sourceRegistersService.create({
                        value: createResearchDto.sourceRegister,
                    });
                }
            } else if (attr == 'recruitmentStatus') {
                if (createResearchDto.recruitmentStatus) {
                    research.recruitmentStatus = await this.recruitmentStatusesService.create({
                        value: createResearchDto.recruitmentStatus,
                    });
                }
            } else if (attr == 'studyType') {
                research.studyType = await this.studyTypesService.create({
                    value: createResearchDto.studyType,
                });
            } else if (attr == 'phase') {
                if (createResearchDto.phase) {
                    research.phase = await this.phasesService.create({
                        value: createResearchDto.phase,
                    });
                }
            } else {
                research[attr] = createResearchDto[attr];
            }
        }
        return research;
    }

    async existsId(id: string): Promise<boolean> {
        const count = await this.researchRespository.count({
            where: {
                id,
            },
        });
        if (count == 0) return false;
        return true;
    }

    async statsByCountry(countriesIsoCodes: string[]): Promise<ResponseStatsByCountry[]> {
        if (!countriesIsoCodes) {
            let countryStatistics: { isoCode: string; covidInfo: CovidInfoDto; statistics: ResponseStatisticsDto }[] = [];
            countryStatistics.push({
                covidInfo: null,
                isoCode: '',
                statistics: globalStats,
            });
            return countryStatistics;
        } else {
            let countryStatistics: { isoCode: string; covidInfo: CovidInfoDto; statistics: ResponseStatisticsDto }[] = await Promise.all(
                countriesIsoCodes.map(async (countryIsoCode) => {
                    const covidInfo = await this.covidInfoService.findOne(countryIsoCode);
                    if (covidInfo) {
                        const country = await this.countriesRepository.findOne({
                            where: {
                                covidInfo: {
                                    iso_code: covidInfo.iso_code,
                                },
                            },
                        });
                        let statistics: ResponseStatisticsDto = undefined;
                        if (country) {
                            const researches = (
                                await this.researchCountriesRepository.find({
                                    select: {
                                        research: {
                                            id: true,
                                        },
                                    },
                                    where: {
                                        country: {
                                            id: country.id,
                                        },
                                    },
                                    relations: {
                                        research: true,
                                    },
                                })
                            ).map((researchCountry) => researchCountry.research.id);
                            if (researches.length > 0) statistics = await this.statisticsService.statistics(researches);
                        }
                        return {
                            isoCode: covidInfo.iso_code,
                            covidInfo: covidInfo,
                            statistics,
                        };
                    }
                }),
            );
            while (countryStatistics.findIndex((value) => value == undefined) != -1) {
                countryStatistics.splice(
                    countryStatistics.findIndex((value) => value == undefined),
                    1,
                );
            }
            return countryStatistics;
        }
    }

    async worldStats() : Promise<ResponseWorldStats[]> {
        return this.statisticsService.worldCovidData();
    }
}
