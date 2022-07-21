import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsDefined, IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';

export class ResearchDto {
    @ApiProperty({ description: "Research's primary key" })
    @IsDefined()
    @IsString()
    @MaxLength(64)
    id: string;

    @ApiProperty({ description: "Research's last refreshed date" })
    @IsDefined()
    @IsDateString()
    lastRefreshedOn: Date;

    @ApiProperty({ description: "Research's public title" })
    @IsDefined()
    @IsString()
    @MaxLength(512)
    publicTitle: string;

    @ApiProperty({ description: "Research's scientific title" })
    @IsOptional()
    @IsString()
    @MaxLength(512)
    scientificTitle?: string;

    @ApiProperty({ description: "Research's acronym" })
    @IsOptional()
    @IsString()
    @MaxLength(64)
    acronym?: string;

    @ApiProperty({ description: "Research's primary sponsor" })
    @IsOptional()
    @IsString()
    @MaxLength(256)
    primarySponsor?: string;

    @ApiProperty({ description: "Research's registration date" })
    @IsOptional()
    @IsDateString()
    dateRegistration?: Date;

    @ApiProperty({ description: "Research's web address" })
    @IsDefined()
    @IsString()
    @MaxLength(256)
    webAddress: string;

    @ApiProperty({ description: 'There are other records of the research' })
    @IsDefined()
    @IsBoolean()
    otherRecords: boolean;

    @ApiProperty({ description: 'Minimum age for inclusion of the research' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(120)
    inclusionAgeMin?: number; //Is missing check if the other are not null

    @ApiProperty({
        description: 'Type age of minium for inclusion of the research',
        enum: ['years', 'months', 'weeks', 'weeks of pregnacy', 'days', 'hours', 'minutes', 'no limit'],
    })
    @IsOptional()
    @IsString()
    @MaxLength(32)
    @IsIn(['years', 'months', 'weeks', 'weeks of pregnacy', 'days', 'hours', 'minutes', 'no limit'])
    inclusionAgeMinType?: 'years' | 'months' | 'weeks' | 'weeks of pregnacy' | 'days' | 'hours' | 'minutes' | 'no limit'; //Is missing check if the other are not null

    @ApiProperty({ description: 'Maximum age for inclusion of the research' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(120)
    inclusionAgeMax?: number; //Is missing check if the other are not null

    @ApiProperty({
        description: 'Type age of maximum for inclusion of the research',
        enum: ['years', 'months', 'weeks', 'weeks of pregnacy', 'days', 'hours', 'minutes', 'no limit'],
    })
    @IsOptional()
    @IsString()
    @MaxLength(32)
    @IsIn(['years', 'months', 'weeks', 'weeks of pregnacy', 'days', 'hours', 'minutes', 'no limit'])
    inclusionAgeMaxType?: 'years' | 'months' | 'weeks' | 'weeks of pregnacy' | 'days' | 'hours' | 'minutes' | 'no limit'; //Is missing check if the other are not null

    @ApiProperty({ description: "Research's inclusion gender", enum: ['Both', 'Male', 'Female'] })
    @IsOptional()
    @IsString()
    @IsIn(['Both', 'Male', 'Female'])
    inclusionGender?: 'Both' | 'Male' | 'Female';

    @ApiProperty({ description: "Research's enrollement date" })
    @IsOptional()
    @IsDateString()
    dateEnrollement?: Date;

    @ApiProperty({ description: "Research's study design" })
    @IsOptional()
    @IsString()
    @MaxLength(1024)
    studyDesign?: string;

    @ApiProperty({ description: "Research's contact first name" })
    @IsOptional()
    @IsString()
    @MaxLength(128)
    contactFirstname?: string;

    @ApiProperty({ description: "Research's contact last name" })
    @IsOptional()
    @IsString()
    @MaxLength(1024)
    contactLastname?: string;

    @ApiProperty({ description: "Research's contact address" })
    @IsOptional()
    @IsString()
    @MaxLength(512)
    contactAddress?: string;

    @ApiProperty({ description: "Research's contact email" })
    @IsOptional()
    @IsString()
    @MaxLength(256)
    contactEmail?: string;

    @ApiProperty({ description: "Research's contact phone" })
    @IsOptional()
    @IsString()
    @MaxLength(64)
    contactTel?: string;

    @ApiProperty({ description: "Research's contact affiliation" })
    @IsOptional()
    @IsString()
    @MaxLength(2048)
    contactAffiliation?: string;

    @ApiProperty({ description: "Research's inclusion criteria" })
    @IsOptional()
    @IsString()
    @MaxLength(8192)
    inclusionCriteria?: string;

    @ApiProperty({ description: "Research's exclusion critera" })
    @IsOptional()
    @IsString()
    @MaxLength(4096)
    exclusionCriteria?: string;

    @ApiProperty({ description: "Research's condition" })
    @IsOptional()
    @IsString()
    @MaxLength(4096)
    condition?: string;

    @ApiProperty({ description: "Research's intevention" })
    @IsOptional()
    @IsString()
    @MaxLength(4096)
    intervention?: string;

    @ApiProperty({ description: "Researh's primary outcome" })
    @IsOptional()
    @IsString()
    @MaxLength(16384)
    primaryOutcome?: string;

    @ApiProperty({ description: "Research's secondary outcome" })
    @IsOptional()
    @IsString()
    @MaxLength(32768)
    secondaryOutcome?: string;

    @ApiProperty({ description: "Research's results date posted" })
    @IsDateString()
    @IsOptional()
    resultsDatePosted?: Date;

    @ApiProperty({ description: "Research's results date completed" })
    @IsDateString()
    @IsOptional()
    resultsDateCompleted?: Date;

    @ApiProperty({ description: "Research's results url link" })
    @IsOptional()
    @IsString()
    @MaxLength(128)
    resultsUrlLink?: string;

    @ApiProperty({ description: "Research's retrospective flag" })
    @IsBoolean()
    @IsDefined()
    retrospectiveFlag: boolean;

    @ApiProperty({ description: "Research's bridging flag" })
    @IsBoolean()
    @IsDefined()
    bridgingFlag: boolean;

    @ApiProperty({ description: 'There are "parent" bridge of the research' })
    @IsBoolean()
    @IsDefined()
    bridgedType: boolean;

    @ApiProperty({ description: 'There are results of the research' })
    @IsBoolean()
    @IsDefined()
    results: boolean;
}

class TargetSizeValidator {
    @IsOptional()
    @IsString()
    @MaxLength(64)
    group?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    count?: number;
}
