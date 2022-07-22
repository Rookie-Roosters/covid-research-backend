import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country, Phase, RecruitmentStatus, Research, ResearchCountry, SourceRegister, StudyType, TargetSize, TargetSizeGroup } from '@researches/entities';
import { DriverPackageNotInstalledError, In, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CompactResponseResearchDto } from '@researches/dto/responses';
import { FiltersDto } from '@researches/dto';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Research) private researchesRepository: Repository<Research>,
        @InjectRepository(Phase) private phasesRepository: Repository<Phase>,
        @InjectRepository(RecruitmentStatus) private recruitmentStatusesRepository: Repository<RecruitmentStatus>,
        @InjectRepository(SourceRegister) private sourceRegistersRepository: Repository<SourceRegister>,
        @InjectRepository(StudyType) private studyTypesRepository: Repository<StudyType>,
        @InjectRepository(TargetSizeGroup) private targetSizeGroupsRepository: Repository<TargetSizeGroup>,
        @InjectRepository(TargetSize) private targetSizesRepository: Repository<TargetSize>,
        @InjectRepository(Country) private countriesRepository: Repository<Country>,
        @InjectRepository(ResearchCountry) private researchCountriesRepository: Repository<ResearchCountry>,
    ) {}

    private async searchPhases(s: string): Promise<number[]> {
        const phases = await this.phasesRepository
            .createQueryBuilder('phase')
            .select('phase.id')
            .where('LOWER(value) LIKE :value', { value: `%${s}%` })
            .getMany();
        return phases.map((phase) => phase.id);
    }

    private async searchRecruitmentStatuses(s: string): Promise<number[]> {
        const recruitmentStatuses = await this.recruitmentStatusesRepository
            .createQueryBuilder('recruitment_status')
            .select('recruitment_status.id')
            .where('LOWER(value) LIKE :value', { value: `%${s}%` })
            .getMany();
        return recruitmentStatuses.map((recruitmentStatus) => recruitmentStatus.id);
    }

    private async searchSourceRegisters(s: string): Promise<number[]> {
        const sourceRegisters = await this.sourceRegistersRepository
            .createQueryBuilder('source_register')
            .select('source_register.id')
            .where('LOWER(value) LIKE :value', { value: `%${s}%` })
            .getMany();
        return sourceRegisters.map((sourceRegister) => sourceRegister.id);
    }

    private async searchStudyTypes(s: string): Promise<number[]> {
        const studyTypes = await this.studyTypesRepository
            .createQueryBuilder('study_type')
            .select('study_type.id')
            .where('LOWER(value) LIKE :value', { value: `%${s}%` })
            .getMany();
        return studyTypes.map((studyType) => studyType.id);
    }

    private async searchTargetSizes(s: string): Promise<string[]> {
        let targetSizes: TargetSize[] = [];
        const targetSizeGroups = await this.targetSizeGroupsRepository
            .createQueryBuilder('target_size_group')
            .select('target_size_group.id')
            .where('LOWER(value) LIKE :value', { value: `%${s.toLowerCase()}%` })
            .getMany();
        if (targetSizeGroups.length > 0) {
            targetSizes = await this.targetSizesRepository.find({
                select: {
                    research: {
                        id: true,
                    },
                },
                where: {
                    targetSizeGroup: {
                        id: In(targetSizeGroups.map((tsg) => tsg.id)),
                    },
                },
                relations: {
                    research: true,
                },
            });
        }
        return targetSizes.map((targetSize) => targetSize.research.id);
    }

    private async searchCountries(s: string): Promise<string[]> {
        let researchCountries: ResearchCountry[] = [];
        const countries = await this.countriesRepository
            .createQueryBuilder('country')
            .select('country.id')
            .where('LOWER(value) LIKE :value', { value: `%${s.toLowerCase()}%` })
            .getMany();
        if (countries.length > 0) {
            researchCountries = await this.researchCountriesRepository.find({
                select: {
                    research: {
                        id: true,
                    },
                },
                where: {
                    country: {
                        id: In(countries.map((country) => country.id)),
                    },
                },
                relations: {
                    research: true,
                },
            });
        }
        return researchCountries.map((targetSize) => targetSize.research.id);
    }

    private varcharAttributes = [
        'id',
        'publicTitle',
        'scientificTitle',
        'acronym',
        'primarySponsor',
        'webAddress',
        'inclusionAgeMinType',
        'inclusionAgeMaxType',
        'inclusionGender',
        'studyDesign',
        'contactFirstname',
        'contactLastname',
        'contactAddress',
        'contactEmail',
        'contactTel',
        'contactAffiliation',
        'resultsUrlLink',
    ];
    private textAttributes = ['inclusionCriteria', 'exclusionCriteria', 'condition', 'intervention', 'primaryOutcome', 'secondaryOutcome'];

    async search(options: IPaginationOptions, url: string, s?: string) {
        if (s) {
            const researchIds: string[] = [];
            const phaseIds = await this.searchPhases(s);
            const recruitmentStatusIds = await this.searchRecruitmentStatuses(s);
            const sourceRegisterIds = await this.searchSourceRegisters(s);
            const studyTypeIds = await this.searchStudyTypes(s);
            researchIds.concat(await this.searchTargetSizes(s));
            researchIds.concat(await this.searchCountries(s));

            let whereQuery = '';
            this.varcharAttributes.map((attr) => {
                whereQuery += `LOWER(${attr}) LIKE '%${s.toLowerCase()}%' OR `;
            });
            this.textAttributes.map((attr) => {
                whereQuery += `${attr} LIKE '%${s.toLowerCase()}%' OR `;
            });
            if (phaseIds.length > 0) {
                whereQuery += 'phaseId IN (';
                phaseIds.map((value) => {
                    whereQuery += `${value},`;
                });
                whereQuery = whereQuery.slice(0, -1) + ') OR ';
            }
            if (recruitmentStatusIds.length > 0) {
                whereQuery += 'recruitmentStatusId IN (';
                recruitmentStatusIds.map((value) => {
                    whereQuery += `${value},`;
                });
                whereQuery = whereQuery.slice(0, -1) + ') OR ';
            }
            if (sourceRegisterIds.length > 0) {
                whereQuery += 'sourceRegisterId IN (';
                sourceRegisterIds.map((value) => {
                    whereQuery += `${value},`;
                });
                whereQuery = whereQuery.slice(0, -1) + ') OR ';
            }
            if (studyTypeIds.length > 0) {
                whereQuery += 'studyTypeId IN (';
                studyTypeIds.map((value) => {
                    whereQuery += `${value},`;
                });
                whereQuery = whereQuery.slice(0, -1) + ') OR ';
            }
            whereQuery = whereQuery.slice(0, -4);
            (await this.researchesRepository.createQueryBuilder('research').select('research.id').where(whereQuery).getMany()).map((research) => {
                if (researchIds.findIndex((r) => r == research.id) == -1) researchIds.push(research.id);
            });
            whereQuery = 'id IN(';
            researchIds.map(id => {
                whereQuery += `'${id}',`;
            });
            whereQuery = whereQuery.slice(0, -1) + ')';

            const queryBuilder = this.researchesRepository.createQueryBuilder('research');
            queryBuilder.select([
                    'research.id',
                    'research.publicTitle',
                    'research.lastRefreshedOn',
                    'research.views',
                    'research.primarySponsor',
                    'research.webAddress'
                ])
                .where(whereQuery);
            return paginate<Research>(queryBuilder, options);
        } else {
            const queryBuilder = this.researchesRepository.createQueryBuilder('research');
            queryBuilder.select([
                'research.id',
                'research.publicTitle',
                'research.lastRefreshedOn',
                'research.views',
                'research.primarySponsor',
                'research.webAddress'
            ])
            return paginate<Research>(queryBuilder, options);
        }
    }
}
