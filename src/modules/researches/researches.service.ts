import { CsvService } from '@csv/csv.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PATHS } from '@utils/constants/paths.constants';
import { Repository } from 'typeorm';
import { CreateResearchDto } from './dto';
import { ResponseResearchDto, TargetSizeType } from './dto/response-research.dto';
import { Research } from './entities';
import { ResearchInterface } from './interfaces/researches.interface';
import { PhasesService, RecruitmentStatusesService, ResearchCountriesService, SourceRegistersService, StudyTypesService, TargetSizesService } from './services';
import to from 'await-to-js';
import { NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';

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
        @InjectRepository(Research)
        private researchRespository: Repository<Research>,
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
        const research = await this.researchRespository.findOneBy({ id });
        if (!research) throw new NotFoundException(`Research with id ${id} not found`);
        return research;
    }

    async findOne(id: string): Promise<ResponseResearchDto> | null {
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
        if (research) {
            const responseResearch: ResponseResearchDto = new ResponseResearchDto();
            for (const attr in research) {
                responseResearch[attr] = research[attr];
            }
            const targetSizes = await this.targetSizesService.findByResearch(responseResearch.id);
            const sizes: TargetSizeType[] = [];
            for (const targetSize of targetSizes)
                sizes.push({
                    count: targetSize.count,
                    group: targetSize.targetSizeGroup,
                });
            responseResearch.targetSizes = sizes;
            return responseResearch;
        }
        return null;
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
            studyType: 0,
        };

        if (createResearchDto.sourceRegister) {
            research.sourceRegister = (
                await this.sourceRegistersService.create({
                    value: this.csvService.getProcessedString(createResearchDto.sourceRegister),
                })
            ).id;
        }
        if (createResearchDto.recruitmentStatus) {
            research.recruitmentStatus = (
                await this.recruitmentStatusesService.create({
                    value: this.csvService.getProcessedString(createResearchDto.recruitmentStatus),
                })
            ).id;
        }
        research.studyType = (
            await this.studyTypesService.create({
                value: this.csvService.getStudyType(createResearchDto.studyType),
            })
        ).id;
        if (createResearchDto.phase) {
            research.phase = (
                await this.phasesService.create({
                    value: this.csvService.transformPhaseNull(createResearchDto.phase),
                })
            ).id;
        }
        return research;
    }

    private async getResearch(createResearchDto: CreateResearchDto): Promise<Research> {
        const research = new Research();
        for (const attr in createResearchDto) {
            if (attr == 'sourceRegister') {
                if (createResearchDto.sourceRegister) {
                    research.sourceRegister = (
                        await this.sourceRegistersService.create({
                            value: createResearchDto.sourceRegister,
                        })
                    ).id;
                }
            } else if (attr == 'recruitmentStatus') {
                if (createResearchDto.recruitmentStatus) {
                    research.recruitmentStatus = (
                        await this.recruitmentStatusesService.create({
                            value: createResearchDto.recruitmentStatus,
                        })
                    ).id;
                }
            } else if (attr == 'studyType') {
                research.studyType = (
                    await this.studyTypesService.create({
                        value: createResearchDto.studyType,
                    })
                ).id;
            } else if (attr == 'phase') {
                if (createResearchDto.phase) {
                    research.phase = (
                        await this.phasesService.create({
                            value: createResearchDto.phase,
                        })
                    ).id;
                }
            } else {
                research[attr] = createResearchDto[attr];
            }
        }
        return research;
    }
}
