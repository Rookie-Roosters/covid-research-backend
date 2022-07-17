import { ResearchDto } from "./research.dto";

export class ResponseResearchDto extends ResearchDto {
    recruitmentStatus: {
        id: number,
        value: string
    };
    phase?: {
        id: number,
        value: string
    };
    sourceRegister?: {
        id: number,
        value: string
    };
    studyType: {
        id: number,
        value: string
    };
    // targetSize: {
    //     group?: string,
    //     count?: number
    // }[];
    // countries: string[];
}