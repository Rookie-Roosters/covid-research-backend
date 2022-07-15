import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Phase } from "./phase.entity";
import { RecruitmentStatus } from "./recruitment-status.entity";
import { SourceRegister } from "./source-register.entity";
import { StudyType } from "./study-type.entity";


@Entity()
export class Research {
  @PrimaryColumn({ type: String, length: 64 })
  trialID: string;

  @Column({ type: Date })
  lastRefreshedOn: Date;

  @Column({ type: String, length: 512 })
  publicTitle: string;

  @Column({ type: String, length: 2048, nullable: true })
  scientificTitle?: string;

  @Column({ type: String, length: 64, nullable: true })
  acronym?: string;

  @Column({ type: String, length: 256, nullable: true })
  primarySponsor?: string;

  @Column({ type: Date, nullable: true })
  dateRegistration?: Date;

  @ManyToOne(() => SourceRegister, (sourceRegister) => sourceRegister.id, {
    nullable: true,
  })
  sourceRegister?: number;

  @Column({ type: String, length: 128 })
  webAddress: string;

  @ManyToOne(
    () => RecruitmentStatus,
    (recruitmentStatus) => recruitmentStatus.id,
    {
      nullable: true,
    },
  )
  recruitmentStatus?: number;

  @Column({ type: Boolean })
  otherRecords: boolean;

  @Column({ type: Number, nullable: true })
  inclusionAgeMin?: number;

  @Column({ type: String, length: 32, nullable: true })
  inclusionAgeMinType:
    | 'years'
    | 'months'
    | 'weeks'
    | 'weeks of pregnacy'
    | 'days'
    | 'hours'
    | 'minutes'
    | 'no limit';

  @Column({ type: Number, nullable: true })
  inclusionAgeMax?: number;

  @Column({ type: String, length: 32, nullable: true })
  inclusionAgeMaxType:
    | 'years'
    | 'months'
    | 'weeks'
    | 'weeks of pregnacy'
    | 'days'
    | 'hours'
    | 'minutes'
    | 'no limit';

  @Column({ type: String, length: 6, nullable: true })
  inclusionGender?: 'Both' | 'Male' | 'Female';

  @Column({ type: Date, nullable: true })
  dateEnrollement?: Date;

  // targetSize?: string

  @ManyToOne(() => StudyType, (studyType) => studyType.id)
  studyType: number;

  @Column({ type: String, length: 1024, nullable: true })
  studyDesign?: string;

  @ManyToOne(() => Phase, (phase) => phase.id)
  phase?: number;

  // countries?: string

  @Column({ type: String, length: 128, nullable: true })
  contactFirstname?: string;

  @Column({ type: String, length: 1024, nullable: true })
  contactLastname?: string;

  @Column({ type: String, length: 512, nullable: true })
  contactAddress?: string;

  @Column({ type: String, length: 256, nullable: true })
  contactEmail?: string;

  @Column({ type: String, length: 64, nullable: true })
  contactTel?: string;

  @Column({ type: String, length: 2048, nullable: true })
  contactAffiliation?: string;

  @Column({ type: 'text', nullable: true })
  inclusionCriteria?: string;

  @Column({ type: 'text', nullable: true })
  exclusionCriteria?: string;

  @Column({ type: 'text', nullable: true })
  condition?: string;

  @Column({ type: 'text', nullable: true })
  intervention?: string;

  @Column({ type: 'text', nullable: true })
  primaryOutcome?: string;

  @Column({ type: 'text', nullable: true })
  secondaryOutcome?: string;

  @Column({ type: Date, nullable: true })
  resultsDatePosted?: Date;

  @Column({ type: Date, nullable: true })
  resultsDateCompleted?: Date;

  @Column({ type: String, length: 128, nullable: true })
  resultsUrlLink?: string;

  @Column({ type: Boolean })
  retrospectiveFlag: boolean;

  @Column({ type: Boolean })
  bridgingFlag: boolean;

  @Column({ type: Boolean })
  bridgedType: boolean;

  @Column({ type: Boolean })
  results: boolean;
}
