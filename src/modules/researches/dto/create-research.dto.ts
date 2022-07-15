import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';

export class CreateResearchDto {
  @IsDefined()
  @IsString()
  @MaxLength(64)
  trialID: string;

  @IsDefined()
  @IsDateString()
  lastRefreshedOn: Date;

  @IsDefined()
  @IsString()
  @MaxLength(512)
  publicTitle: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  scientificTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  acronym?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  primarySponsor?: string;

  @IsOptional()
  @IsDateString()
  dateRegistration?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  sourceRegister?: string;

  @IsDefined()
  @IsString()
  @MaxLength(256)
  webAddress: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  recruitmentStatus?: string;

  @IsDefined()
  @IsBoolean()
  otherRecords: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  inclusionAgeMin?: number; //Is missing check if the other are not null

  @IsOptional()
  @IsString()
  @MaxLength(32)
  @IsIn([
    'years',
    'months',
    'weeks',
    'weeks of pregnacy',
    'days',
    'hours',
    'minutes',
    'no limit',
  ])
  inclusionAgeMinType?:
    | 'years'
    | 'months'
    | 'weeks'
    | 'weeks of pregnacy'
    | 'days'
    | 'hours'
    | 'minutes'
    | 'no limit'; //Is missing check if the other are not null

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  inclusionAgeMax?: number; //Is missing check if the other are not null

  @IsOptional()
  @IsString()
  @MaxLength(32)
  @IsIn([
    'years',
    'months',
    'weeks',
    'weeks of pregnacy',
    'days',
    'hours',
    'minutes',
    'no limit',
  ])
  inclusionAgeMaxType?:
    | 'years'
    | 'months'
    | 'weeks'
    | 'weeks of pregnacy'
    | 'days'
    | 'hours'
    | 'minutes'
    | 'no limit'; //Is missing check if the other are not null

  @IsOptional()
  @IsString()
  @IsIn(['Both', 'Male', 'Female'])
  inclusionGender?: 'Both' | 'Male' | 'Female';

  @IsOptional()
  @IsDateString()
  dateEnrollement?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TargetSizeValidator)
  targetSize: { group?: string; count?: number }[];

  @IsDefined()
  @IsString()
  @MaxLength(64)
  studyType: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  studyDesign?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  phase?: string;

  // countries?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  contactFirstname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  contactLastname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  contactAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  contactEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  contactTel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  contactAffiliation?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8192)
  inclusionCriteria?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4096)
  exclusionCriteria?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4096)
  condition?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4096)
  intervention?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16384)
  primaryOutcome?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32768)
  secondaryOutcome?: string;

  @IsDateString()
  @IsOptional()
  resultsDatePosted?: Date;

  @IsDateString()
  @IsOptional()
  resultsDateCompleted?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  resultsUrlLink?: string;

  @IsBoolean()
  @IsDefined()
  retrospectiveFlag: boolean;

  @IsBoolean()
  @IsDefined()
  bridgingFlag: boolean;

  @IsBoolean()
  @IsDefined()
  bridgedType: boolean;

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
