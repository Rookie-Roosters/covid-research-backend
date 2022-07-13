import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsOptional,
  IsString,
  MaxLength,
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

  // sourceRegister?: string;

  @IsDefined()
  @IsString()
  @MaxLength(256)
  webAddress: string;

  // recruitmentStatus?: string;

  @IsDefined()
  @IsBoolean()
  otherRecords: boolean;

  // inclusionAgeMin?: string;

  // inclusionAgeMax?: string;

  // inclusionGender?: string;

  @IsOptional()
  @IsDateString()
  dateEnrollement?: Date;

  // targetSize?: string;

  // studyType: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  studyDesign?: string;

  // phase?: string;

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
