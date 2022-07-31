import { CovidInfo } from '@covid-info/entities/covid-info.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseWorldStats } from '@researches/dto/responses/response-world-stats.dto';
import { Country, Phase, RecruitmentStatus, Research, ResearchCountry, SourceRegister, StudyType, TargetSize, TargetSizeGroup } from '@researches/entities';
import { StatisticsInterface } from '@researches/interfaces/statistics.interface';
import { Between, In, IsNull, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Research)
        private researchRespository: Repository<Research>,
        @InjectRepository(RecruitmentStatus)
        private recruitmentStatusesRespository: Repository<RecruitmentStatus>,
        @InjectRepository(Phase)
        private phasesRespository: Repository<Phase>,
        @InjectRepository(SourceRegister)
        private sourceRegistersRespository: Repository<SourceRegister>,
        @InjectRepository(StudyType)
        private studyTypesRespository: Repository<StudyType>,
        @InjectRepository(TargetSize)
        private targetSizesRespository: Repository<TargetSize>,
        @InjectRepository(TargetSizeGroup)
        private targetSizeGroupsRespository: Repository<TargetSizeGroup>,
        @InjectRepository(Country)
        private countriesRespository: Repository<Country>,
        @InjectRepository(CovidInfo)
        private covidInfoRespository: Repository<CovidInfo>,
        @InjectRepository(ResearchCountry)
        private researchCountriesRespository: Repository<ResearchCountry>,
    ) {}

    private async inclusionGenderStatistics(researchIds: string[]): Promise<{ male: number; female: number; both: number; null: number }> {
        const inclusionGenderMale = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionGender: 'Male',
            },
        });
        const inclusionGenderFemale = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionGender: 'Female',
            },
        });
        const inclusionGenderBoth = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionGender: 'Both',
            },
        });
        const inclusionGenderNull = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionGender: IsNull(),
            },
        });
        return {
            male: inclusionGenderMale,
            female: inclusionGenderFemale,
            both: inclusionGenderBoth,
            null: inclusionGenderNull,
        };
    }

    private async recruitmentStatusStatistics(
        researchIds: string[],
        researchInIds: string,
    ): Promise<{ recruiting: number; notRecruiting: number; authorised: number; notAvailable: number; null: number }> {
        const counts = await Promise.all(
            ['recruiting', 'not recruiting', 'authorised', 'not available'].map(async (value) => {
                let count = 0;
                const recruitmentStatus = await this.recruitmentStatusesRespository.findOne({
                    where: {
                        value,
                    },
                });
                if (recruitmentStatus) {
                    count = await this.researchRespository.count({
                        where: {
                            id: In(researchIds),
                            recruitmentStatus: {
                                id: recruitmentStatus.id,
                            },
                        },
                    });
                }
                return count;
            }),
        );
        const nullValue: number = (
            await this.researchRespository
                .createQueryBuilder('research')
                .select('COUNT(*) as count')
                .where('research.id' + researchInIds + ' AND research.recruitmentStatus IS NULL')
                .getRawOne()
        ).count;

        return {
            recruiting: counts[0],
            notRecruiting: counts[1],
            authorised: counts[2],
            notAvailable: counts[3],
            null: nullValue,
        };
    }

    private async inclusionAgeMinStatistics(researchIds: string[]): Promise<{
        inPregnancy: number;
        under1Year;
        under10Years: number;
        under20Years: number;
        under30Years: number;
        under40Years: number;
        under50Years: number;
        over50Years: number;
        noLimit: number;
        null: number;
    }> {
        const inPregnancy = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMinType: 'weeks of pregnacy',
            },
        });
        const under1Year = await this.researchRespository.count({
            where: [
                {
                    id: In(researchIds),
                    inclusionAgeMinType: 'minutes',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMinType: 'hours',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMinType: 'days',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMinType: 'months',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMinType: 'years',
                    inclusionAgeMin: 0,
                },
            ],
        });
        const counts: number[] = [];
        for (let i = 0; i <= 40; i += 10) {
            counts.push(
                await this.researchRespository.count({
                    where: {
                        id: In(researchIds),
                        inclusionAgeMin: Between(i == 0 ? 1 : i, i + 9),
                        inclusionAgeMinType: 'years',
                    },
                }),
            );
        }
        const over50Years = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMin: MoreThanOrEqual(50),
                inclusionAgeMinType: 'years',
            },
        });
        const noLimit = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMinType: 'no limit',
            },
        });
        const nullValue = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMinType: IsNull(),
            },
        });
        return {
            inPregnancy,
            under1Year,
            under10Years: counts[0],
            under20Years: counts[1],
            under30Years: counts[2],
            under40Years: counts[3],
            under50Years: counts[4],
            over50Years,
            noLimit,
            null: nullValue,
        };
    }

    private async inclusionAgeMaxStatistics(researchIds: string[]): Promise<{
        inPregnancy: number;
        under1Year;
        under10Years: number;
        under20Years: number;
        under30Years: number;
        under40Years: number;
        under50Years: number;
        over50Years: number;
        noLimit: number;
        null: number;
    }> {
        const inPregnancy = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMaxType: 'weeks of pregnacy',
            },
        });
        const under1Year = await this.researchRespository.count({
            where: [
                {
                    id: In(researchIds),
                    inclusionAgeMaxType: 'minutes',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMaxType: 'hours',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMaxType: 'days',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMaxType: 'months',
                },
                {
                    id: In(researchIds),
                    inclusionAgeMaxType: 'years',
                    inclusionAgeMax: 0,
                },
            ],
        });
        const counts: number[] = [];
        for (let i = 0; i <= 40; i += 10) {
            counts.push(
                await this.researchRespository.count({
                    where: {
                        id: In(researchIds),
                        inclusionAgeMax: Between(i == 0 ? 1 : i, i + 9),
                        inclusionAgeMaxType: 'years',
                    },
                }),
            );
        }
        const over50Years = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMax: MoreThanOrEqual(50),
                inclusionAgeMaxType: 'years',
            },
        });
        const noLimit = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMaxType: 'no limit',
            },
        });
        const nullValue = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                inclusionAgeMaxType: IsNull(),
            },
        });
        return {
            inPregnancy,
            under1Year,
            under10Years: counts[0],
            under20Years: counts[1],
            under30Years: counts[2],
            under40Years: counts[3],
            under50Years: counts[4],
            over50Years,
            noLimit,
            null: nullValue,
        };
    }

    private async phasestatistics(
        researchIds: string[],
        researchInIds: string,
    ): Promise<{
        phase0: number;
        phase1: number;
        phase2: number;
        phase3: number;
        phase4: number;
        notApplicable: number;
        other: number;
        null: number;
    }> {
        const phaseIds: number[] = [];
        const counts = await Promise.all(
            ['phase 0', 'phase 1', 'phase 2', 'phase 3', 'phase 4', 'not applicable'].map(async (phaseString) => {
                const phases = await this.phasesRespository.createQueryBuilder('phase').where(`LOWER(phase.value) LIKE '%${phaseString}%'`).getMany();
                if (phases.length > 0) {
                    phases.map((phase) => {
                        if (phaseIds.findIndex((pi) => pi == phase.id) == -1) phaseIds.push(phase.id);
                    });
                    return await this.researchRespository.count({
                        where: {
                            id: In(researchIds),
                            phase: {
                                id: In(phases.map((phase) => phase.id)),
                            },
                        },
                    });
                }
                return 0;
            }),
        );
        let phaseInIds = ' AND research.phase IS NOT NULL AND research.phase NOT IN(';
        phaseIds.map((id) => {
            phaseInIds += id + ',';
        });
        phaseInIds = phaseInIds.slice(0, -1) + ')';
        const other: number = (
            await this.researchRespository
                .createQueryBuilder('research')
                .select('COUNT(*) as count')
                .where('research.id' + researchInIds + phaseInIds)
                .getRawOne()
        ).count;
        const nullValue: number = (
            await this.researchRespository
                .createQueryBuilder('research')
                .select('COUNT(*) as count')
                .where('research.id' + researchInIds + ' AND research.phase IS NULL')
                .getRawOne()
        ).count;
        return {
            phase0: counts[0],
            phase1: counts[1],
            phase2: counts[2],
            phase3: counts[3],
            phase4: counts[4],
            notApplicable: counts[5],
            other,
            null: nullValue,
        };
    }

    private async sourceRegisterStatistics(researchIds: string[], researchInIds: string): Promise<{ name: string; count: number }[]> {
        const sourceRegisterCounts: { name: string; count: number }[] = [];
        const sourceRegisterIds = (
            await this.researchRespository
                .createQueryBuilder('research')
                .select('research.sourceRegister')
                .distinct(true)
                .where('research.id' + researchInIds)
                .getRawMany()
        ).map((value) => value.sourceRegisterId);
        await Promise.all(
            sourceRegisterIds.map(async (sourceRegisterId) => {
                const sourceRegister = await this.sourceRegistersRespository.findOne({
                    where: {
                        id: sourceRegisterId,
                    },
                });
                if (sourceRegister) {
                    const count = await this.researchRespository.count({
                        where: {
                            id: In(researchIds),
                            sourceRegister: {
                                id: sourceRegister.id,
                            },
                        },
                    });
                    sourceRegisterCounts.push({
                        name: sourceRegister.value,
                        count,
                    });
                }
            }),
        );
        return sourceRegisterCounts;
    }

    private async studyTypeStatistics(researchIds: string[], researchInIds: string): Promise<{ name: string; count: number }[]> {
        const studyTypeCounts: { name: string; count: number }[] = [];
        const studyTypeIds = (
            await this.researchRespository
                .createQueryBuilder('research')
                .select('research.studyType')
                .distinct(true)
                .where('research.id' + researchInIds)
                .getRawMany()
        ).map((value) => value.studyTypeId);
        await Promise.all(
            studyTypeIds.map(async (studyTypeId) => {
                const studyType = await this.studyTypesRespository.findOne({
                    where: {
                        id: studyTypeId,
                    },
                });
                if (studyType) {
                    const count = await this.researchRespository.count({
                        where: {
                            id: In(researchIds),
                            studyType: {
                                id: studyType.id,
                            },
                        },
                    });
                    studyTypeCounts.push({
                        name: studyType.value,
                        count,
                    });
                }
            }),
        );
        return studyTypeCounts;
    }

    private async targetSizeStatistics(researchIds: string[], researchInIds: string): Promise<{ name: string; count: number }[]> {
        const targetSizeCounts: { name: string; count: number }[] = [];
        const targetSizeGroupIds = (
            await this.targetSizesRespository
                .createQueryBuilder('target_size')
                .select('target_size.targetSizeGroup as targetSizeGroupId')
                .distinct(true)
                .where('target_size.research' + researchInIds)
                .getRawMany()
        ).map((value) => value.targetSizeGroupId);
        await Promise.all(
            targetSizeGroupIds.map(async (targetSizeGroupId) => {
                if (targetSizeGroupId == null) {
                    const count: number = (
                        await this.targetSizesRespository
                            .createQueryBuilder('target_size')
                            .select('SUM(IsNull(target_size.count, 0)) as sum')
                            .where('target_size.research' + researchInIds + ' AND target_size.targetSizeGroup IS NULL')
                            .getRawOne()
                    ).sum;
                    if (count != null) targetSizeCounts.push({ name: 'null', count });
                } else {
                    const targetSizeGroup = await this.targetSizeGroupsRespository.findOne({
                        where: {
                            id: targetSizeGroupId,
                        },
                    });
                    if (targetSizeGroup) {
                        const count: number = (
                            await this.targetSizesRespository
                                .createQueryBuilder('target_size')
                                .select('SUM(IsNull(target_size.count, 0)) as sum')
                                .where('target_size.research' + researchInIds + ' AND target_size.targetSizeGroup = ' + targetSizeGroup.id)
                                .getRawOne()
                        ).sum;
                        if (count != null) targetSizeCounts.push({ name: targetSizeGroup.value, count });
                    }
                }
            }),
        );
        return targetSizeCounts;
    }

    private async resultStatistics(researchIds: string[]): Promise<{ with: number; without: number }> {
        const withValue: number = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                results: true,
            },
        });
        const without: number = await this.researchRespository.count({
            where: {
                id: In(researchIds),
                results: false,
            },
        });
        return {
            with: withValue,
            without,
        };
    }

    private async separateStatistics(researchIds: string[]): Promise<StatisticsInterface> {
        let researchInIds = ' IN(';
        researchIds.map((research) => {
            researchInIds += "'" + research + "',";
        });
        researchInIds = researchInIds.slice(0, -1) + ')';
        const count = researchIds.length;

        const views: number = (
            await this.researchRespository
                .createQueryBuilder('research')
                .select('SUM(research.views) as sum')
                .where('research.id' + researchInIds)
                .getRawOne()
        ).sum;

        return {
            count,
            views,
            inclusionGender: await this.inclusionGenderStatistics(researchIds),
            recruitmentStatus: await this.recruitmentStatusStatistics(researchIds, researchInIds),
            inclusionAgeMin: await this.inclusionAgeMinStatistics(researchIds),
            inclusionAgeMax: await this.inclusionAgeMaxStatistics(researchIds),
            phase: await this.phasestatistics(researchIds, researchInIds),
            result: await this.resultStatistics(researchIds),
            sourceRegister: await this.sourceRegisterStatistics(researchIds, researchInIds),
            studyType: await this.studyTypeStatistics(researchIds, researchInIds),
            targetSize: await this.targetSizeStatistics(researchIds, researchInIds),
        };
    }

    async statistics(researchIds: string[]): Promise<StatisticsInterface> {
        const response: StatisticsInterface = {
            count: 0,
            views: 0,
            inclusionGender: {
                both: 0,
                female: 0,
                male: 0,
                null: 0,
            },
            recruitmentStatus: {
                authorised: 0,
                notAvailable: 0,
                notRecruiting: 0,
                null: 0,
                recruiting: 0,
            },
            inclusionAgeMax: {
                inPregnancy: 0,
                noLimit: 0,
                null: 0,
                over50Years: 0,
                under10Years: 0,
                under1Year: 0,
                under20Years: 0,
                under30Years: 0,
                under40Years: 0,
                under50Years: 0,
            },
            inclusionAgeMin: {
                inPregnancy: 0,
                noLimit: 0,
                null: 0,
                over50Years: 0,
                under10Years: 0,
                under1Year: 0,
                under20Years: 0,
                under30Years: 0,
                under40Years: 0,
                under50Years: 0,
            },
            phase: {
                notApplicable: 0,
                null: 0,
                other: 0,
                phase0: 0,
                phase1: 0,
                phase2: 0,
                phase3: 0,
                phase4: 0,
            },
            result: {
                with: 0,
                without: 0,
            },
            sourceRegister: [],
            studyType: [],
            targetSize: [],
        };
        const chunkSize = 400;
        for (let i = 0; i < researchIds.length; i += chunkSize) {
            const chunk = researchIds.slice(i, i + chunkSize);
            const researchStatistics = await this.separateStatistics(chunk);

            for (const attr in response) {
                if (attr == 'count' || attr == 'views') {
                    response[attr] += researchStatistics[attr];
                } else if (attr == 'sourceRegister' || attr == 'studyType' || attr == 'targetSize') {
                    researchStatistics[attr].map((value) => {
                        const index = response[attr].findIndex((r) => r.name == value.name);
                        if (index == -1) {
                            response[attr].push(value);
                        } else {
                            response[attr][index].count += value.count;
                        }
                    });
                } else {
                    for (const sub in response[attr]) {
                        response[attr][sub] = researchStatistics[attr][sub];
                    }
                }
            }
        }
        response.sourceRegister = response.sourceRegister.sort((a, b) => b.count - a.count).slice(0, 5);
        response.studyType = response.studyType.sort((a, b) => b.count - a.count).slice(0, 5);
        response.targetSize = response.targetSize.sort((a, b) => b.count - a.count).slice(0, 5);
        return response;
    }

    async worldCovidData() : Promise<ResponseWorldStats[]>{
        const covidInfos = await this.covidInfoRespository.find({
            select: ['iso_code', 'total_cases', 'total_deaths', 'total_vaccinations', 'population', 'population_density'],
        });
        const response = await Promise.all(covidInfos.map(async covidInfo => {
            const country = await this.countriesRespository.findOne({
                where: {
                    covidInfo: {
                        iso_code: covidInfo.iso_code,
                    },
                },
            });
            let count = 0;
            let views = 0;
            if (country) {
                const researchIds = (
                    await this.researchCountriesRespository.find({
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
                count = researchIds.length;
                if (researchIds.length > 0) {
                    let researchInIds = ' IN (';
                    researchIds.map((id) => {
                        researchInIds += `'${id}',`;
                    });
                    researchInIds = researchInIds.slice(0, -1) + ')';
                    views = (
                        await this.researchRespository
                            .createQueryBuilder('research')
                            .select('SUM(research.views) as sum')
                            .where('research.id' + researchInIds)
                            .getRawOne()
                    ).sum;
                }
            }
            return {
                count,
                views,
                'iso_code': covidInfo.iso_code,
                'total_cases': covidInfo.total_cases,
                'total_deaths': covidInfo.total_deaths, 
                'total_vaccinations': covidInfo.total_vaccinations, 
                'population': covidInfo.population, 
                'population_density': covidInfo.population_density
            }
        }));
        return response;
    }
}
