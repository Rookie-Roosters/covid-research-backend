import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Phase } from './phase.entity';
import { RecruitmentStatus } from './recruitment-status.entity';
import { SourceRegister } from './source-register.entity';
import { StudyType } from './study-type.entity';
import { TargetSize } from './target-size.entity';

@Entity()
export class Research {
    @ApiProperty({ description: "Research's primary key" })
    @PrimaryColumn({ type: String, length: 64 })
    id: string;

    @ApiProperty({ description: "Research's last refreshed date" })
    @Column({ type: Date })
    lastRefreshedOn: Date;

    @ApiProperty({ description: "Research's public title" })
    @Column({ type: String, length: 512 })
    publicTitle: string;

    @ApiProperty({ description: "Research's scientific title" })
    @Column({ type: String, length: 2048, nullable: true })
    scientificTitle?: string;

    @ApiProperty({ description: "Research's acronym" })
    @Column({ type: String, length: 64, nullable: true })
    acronym?: string;

    @ApiProperty({ description: "Research's primary sponsor" })
    @Column({ type: String, length: 256, nullable: true })
    primarySponsor?: string;

    @ApiProperty({ description: "Research's registration date" })
    @Column({ type: Date, nullable: true })
    dateRegistration?: Date;

    @ApiProperty({ description: "Research's source register id" })
    @ManyToOne(() => SourceRegister, (sourceRegister) => sourceRegister.id, {
        nullable: true,
    })
    sourceRegister?: number;

    @ApiProperty({ description: "Research's web address" })
    @Column({ type: String, length: 128 })
    webAddress: string;

    @ApiProperty({ description: "Research's id recruitment status" })
    @ManyToOne(() => RecruitmentStatus, (recruitmentStatus) => recruitmentStatus.id, {
        nullable: true,
    })
    recruitmentStatus?: number;

    @ApiProperty({ description: 'There are other records of the research' })
    @Column({ type: Boolean })
    otherRecords: boolean;

    @ApiProperty({ description: 'Minimum age for inclusion of the research' })
    @Column({ type: Number, nullable: true })
    inclusionAgeMin?: number;

    @ApiProperty({ description: 'Type age of minium for inclusion of the research' })
    @Column({ type: String, length: 32, nullable: true })
    inclusionAgeMinType: 'years' | 'months' | 'weeks' | 'weeks of pregnacy' | 'days' | 'hours' | 'minutes' | 'no limit';

    @ApiProperty({ description: 'Maximum age for inclusion of the research' })
    @Column({ type: Number, nullable: true })
    inclusionAgeMax?: number;

    @ApiProperty({ description: 'Type age of maximum for inclusion of the research' })
    @Column({ type: String, length: 32, nullable: true })
    inclusionAgeMaxType: 'years' | 'months' | 'weeks' | 'weeks of pregnacy' | 'days' | 'hours' | 'minutes' | 'no limit';

    @ApiProperty({ description: "Research's inclusion gender" })
    @Column({ type: String, length: 6, nullable: true })
    inclusionGender?: 'Both' | 'Male' | 'Female';

    @ApiProperty({ description: "Research's enrollement date" })
    @Column({ type: Date, nullable: true })
    dateEnrollement?: Date;

    @ApiProperty({ description: "Research's is study type" })
    @ManyToOne(() => StudyType, (studyType) => studyType.id)
    studyType: number;

    @ApiProperty({ description: "Research's study design" })
    @Column({ type: String, length: 1024, nullable: true })
    studyDesign?: string;

    @ApiProperty({ description: "Research's id phase" })
    @ManyToOne(() => Phase, (phase) => phase.id)
    phase?: number;

    @ApiProperty({ description: "Research's contact first name" })
    @Column({ type: String, length: 128, nullable: true })
    contactFirstname?: string;

    @ApiProperty({ description: "Research's contact last name" })
    @Column({ type: String, length: 1024, nullable: true })
    contactLastname?: string;

    @ApiProperty({ description: "Research's contact address" })
    @Column({ type: String, length: 512, nullable: true })
    contactAddress?: string;

    @ApiProperty({ description: "Research's contact email" })
    @Column({ type: String, length: 256, nullable: true })
    contactEmail?: string;

    @ApiProperty({ description: "Research's contact phone" })
    @Column({ type: String, length: 64, nullable: true })
    contactTel?: string;

    @ApiProperty({ description: "Research's contact affiliation" })
    @Column({ type: String, length: 2048, nullable: true })
    contactAffiliation?: string;

    @ApiProperty({ description: "Research's inclusion criteria" })
    @Column({ type: 'text', nullable: true })
    inclusionCriteria?: string;

    @ApiProperty({ description: "Research's exclusion critera" })
    @Column({ type: 'text', nullable: true })
    exclusionCriteria?: string;

    @ApiProperty({ description: "Research's condition" })
    @Column({ type: 'text', nullable: true })
    condition?: string;

    @ApiProperty({ description: "Research's intevention" })
    @Column({ type: 'text', nullable: true })
    intervention?: string;

    @ApiProperty({ description: "Researh's primary outcome" })
    @Column({ type: 'text', nullable: true })
    primaryOutcome?: string;

    @ApiProperty({ description: "Research's secondary outcome" })
    @Column({ type: 'text', nullable: true })
    secondaryOutcome?: string;

    @ApiProperty({ description: "Research's results date posted" })
    @Column({ type: Date, nullable: true })
    resultsDatePosted?: Date;

    @ApiProperty({ description: "Research's results date completed" })
    @Column({ type: Date, nullable: true })
    resultsDateCompleted?: Date;

    @ApiProperty({ description: "Research's results url link" })
    @Column({ type: String, length: 128, nullable: true })
    resultsUrlLink?: string;

    @ApiProperty({ description: "Research's retrospective flag" })
    @Column({ type: Boolean })
    retrospectiveFlag: boolean;

    @ApiProperty({ description: "Research's bridging flag" })
    @Column({ type: Boolean })
    bridgingFlag: boolean;

    @ApiProperty({ description: 'There are "parent" bridge of the research' })
    @Column({ type: Boolean })
    bridgedType: boolean;

    @ApiProperty({ description: 'There are results of the research' })
    @Column({ type: Boolean })
    results: boolean;
}
