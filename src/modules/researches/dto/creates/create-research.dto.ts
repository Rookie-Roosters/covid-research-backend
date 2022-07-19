import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { ResearchDto } from '../research.dto';

export class CreateResearchDto extends ResearchDto {
    @IsOptional()
    @IsString()
    @MaxLength(32)
    recruitmentStatus?: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    phase?: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    sourceRegister?: string;

    @IsDefined()
    @IsString()
    @MaxLength(64)
    studyType: string;

    @IsDefined()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TargetSizeValidator)
    targetSize: { group?: string; count?: number }[];

    @IsDefined()
    @IsArray()
    @IsString({ each: true })
    countries: string[];
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
