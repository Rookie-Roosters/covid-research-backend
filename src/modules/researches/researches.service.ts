import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CsvService } from '../csv/csv.service';
import { CreateResearchDto } from './dto/create-research.dto';
import { Research } from './entities/research.entity';
import { PhasesService } from './services/phases.service';
import { RecruitmentStatusesService } from './services/recruitment-statuses.service';
import { SourceRegistersService } from './services/source-registers.service';
import { StudyTypesService } from './services/study-types.service';
import { TargetSizesService } from './services/target-sizes.service';

@Injectable()
export class ResearchesService {
  constructor(
    private sourceRegistersService: SourceRegistersService,
    private recruitmentStatusesService: RecruitmentStatusesService,
    private studyTypesService: StudyTypesService,
    private csvService: CsvService,
    private phasesService: PhasesService,
    private targetSizesService: TargetSizesService,
    @InjectRepository(Research)
    private researchRespository: Repository<Research>,
  ) {}

  private async getCleanResearch(
    createResearchDto: CreateResearchDto,
  ): Promise<Research> {
    const research: Research = {
      trialID: this.csvService.getProcessedString(createResearchDto.trialID),
      lastRefreshedOn: createResearchDto.lastRefreshedOn,
      publicTitle: this.csvService.getProcessedString(
        createResearchDto.publicTitle,
      ),
      scientificTitle: this.csvService.getProcessedStringNull(
        createResearchDto.scientificTitle,
      ),
      acronym: this.csvService.getProcessedStringNull(
        createResearchDto.acronym,
      ),
      primarySponsor: this.csvService.getProcessedStringNull(
        createResearchDto.primarySponsor,
      ),
      dateRegistration: createResearchDto.dateRegistration,
      webAddress: this.csvService.getProcessedString(
        createResearchDto.webAddress,
      ),
      otherRecords: createResearchDto.otherRecords,
      inclusionAgeMin: createResearchDto.inclusionAgeMin,
      inclusionAgeMinType: createResearchDto.inclusionAgeMinType,
      inclusionAgeMax: createResearchDto.inclusionAgeMax,
      inclusionAgeMaxType: createResearchDto.inclusionAgeMaxType,
      inclusionGender: createResearchDto.inclusionGender,
      dateEnrollement: createResearchDto.dateEnrollement,
      //targetSize: []
      studyDesign: this.csvService.getProcessedStringNull(
        createResearchDto.studyDesign,
      ),
      //countries: '',
      contactFirstname: this.csvService.getProcessedStringNull(
        createResearchDto.contactFirstname,
      ),
      contactLastname: this.csvService.getProcessedStringNull(
        createResearchDto.contactLastname,
      ),
      contactAddress: this.csvService.getProcessedStringNull(
        createResearchDto.contactAddress,
      ),
      contactEmail: this.csvService.getProcessedStringNull(
        createResearchDto.contactEmail,
      ),
      contactTel: this.csvService.getProcessedStringNull(
        createResearchDto.contactTel,
      ),
      contactAffiliation: this.csvService.getProcessedStringNull(
        createResearchDto.contactAffiliation,
      ),
      inclusionCriteria: this.csvService.getProcessedStringNull(
        createResearchDto.inclusionCriteria,
      ),
      exclusionCriteria: this.csvService.getProcessedStringNull(
        createResearchDto.exclusionCriteria,
      ),
      condition: this.csvService.getProcessedStringNull(
        createResearchDto.condition,
      ),
      intervention: this.csvService.getProcessedStringNull(
        createResearchDto.intervention,
      ),
      primaryOutcome: this.csvService.getProcessedStringNull(
        createResearchDto.primaryOutcome,
      ),
      secondaryOutcome: this.csvService.getProcessedStringNull(
        createResearchDto.secondaryOutcome,
      ),
      resultsDatePosted: createResearchDto.resultsDatePosted,
      resultsDateCompleted: createResearchDto.resultsDateCompleted,
      resultsUrlLink: this.csvService.getProcessedStringNull(
        createResearchDto.resultsUrlLink,
      ),
      retrospectiveFlag: createResearchDto.retrospectiveFlag,
      bridgingFlag: createResearchDto.bridgingFlag,
      bridgedType: createResearchDto.bridgedType,
      results: createResearchDto.results,
      studyType: 0,
    };

    if (createResearchDto.sourceRegister) {
      research.sourceRegister = (
        await this.sourceRegistersService.create({
          value: this.csvService.getProcessedString(
            createResearchDto.sourceRegister,
          ),
        })
      ).id;
    }
    if (createResearchDto.recruitmentStatus) {
      research.recruitmentStatus = (
        await this.recruitmentStatusesService.create({
          value: this.csvService.getProcessedString(
            createResearchDto.recruitmentStatus,
          ),
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

  private async getResearch(
    createResearchDto: CreateResearchDto,
  ): Promise<Research> {
    let research = new Research();
    for (var attr in createResearchDto) {
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

  async create(createResearchDto: CreateResearchDto, clean: boolean = true) {
    const research = await this.researchRespository.save(
      clean
        ? await this.getCleanResearch(createResearchDto)
        : await this.getResearch(createResearchDto),
    );

    for(let target of createResearchDto.targetSize) {
      if(clean && target.group) target.group = this.csvService.getProcessedString(target.group).toLowerCase();
      await this.targetSizesService.create({
        researchTrialID: research.trialID,
        count: target.count,
        targetSizeGroup: target.group
      });
    }
    return research;
  }

  async findAll() {
    return await this.researchRespository.find();
  }

  async findOne(trialID: string) {
    return await this.researchRespository.findOneBy({ trialID });
  }
}
