import { ApiProperty } from '@nestjs/swagger';
import { ResearchDto } from '../research.dto';
import { ResponsePhaseDto } from './response-phase.dto';
import { ResponseRecruitmentStatusDto } from './response-recruitment-status.dto';
import { ResponseResearchCountryDto } from './response-research-country.dto';
import { ResponseSourceRegisterDto } from './response-source-register.dto';
import { ResponseStudyTypeDto } from './response-study-type.dto';
import { ResponseTargetSizeDto } from './response-target-size.dto';

export class ResponseResearchDto extends ResearchDto {
    @ApiProperty({ description: "Research's views" })
    views: number;

    @ApiProperty({ description: "Research's recruitment status" })
    recruitmentStatus: ResponseRecruitmentStatusDto;

    @ApiProperty({ description: "Research's phase" })
    phase?: ResponsePhaseDto;

    @ApiProperty({ description: "Researhc's source register" })
    sourceRegister?: ResponseSourceRegisterDto;

    @ApiProperty({ description: "Research's study type" })
    studyType: ResponseStudyTypeDto;

    @ApiProperty({ type: () => ResponseTargetSizeDto, isArray: true, description: "Research's target sizes" })
    targetSizes: ResponseTargetSizeDto[];

    @ApiProperty({ type: () => ResponseResearchCountryDto, isArray: true, description: "Research's countries" })
    countries: ResponseResearchCountryDto[];
}

export class CompactResponseResearchDto {
    @ApiProperty({ description: "Research's primary key", type: String })
    id: string;

    @ApiProperty({ description: "Research's public title", type: String })
    publicTitle: String;

    @ApiProperty({ description: "Research's last refreshed on", type: Date })
    lastRefreshedOn: Date;

    @ApiProperty({ description: "Research's views", type: Number })
    views: number;
}
