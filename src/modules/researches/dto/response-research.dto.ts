import { ApiProperty } from '@nestjs/swagger';
import { ResearchDto } from './research.dto';

export class TargetSizeType {
    group?: number;
    count?: number;
}

export class ResponseResearchDto extends ResearchDto {
    recruitmentStatus: {
        id: number;
        value: string;
    };
    phase?: {
        id: number;
        value: string;
    };
    sourceRegister?: {
        id: number;
        value: string;
    };
    studyType: {
        id: number;
        value: string;
    };

    @ApiProperty({ type: () => TargetSizeType, isArray: true })
    targetSizes?: TargetSizeType[];

    //@ApiProperty({ type: () => ITargetSize })
    // targetSize: [
    //     {
    //         group?: string;
    //         count?: number;
    //     },
    // ];
    //countries: string[];
}
