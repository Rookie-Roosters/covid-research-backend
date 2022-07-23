interface NameCountDto {
    name: string;
    count: number;
}

export interface StatisticsInterface {
    count: number;
    views: number;
    inclusionGender: {
        male: number;
        female: number;
        both: number;
        null: number
    };
    recruitmentStatus: {
        recruiting: number;
        notRecruiting: number;
        authorised: number;
        notAvailable: number;
        null: number
    };
    inclusionAgeMin: {
        inPregnancy: number;
        under1Year;
        under10Years: number;
        under20Years: number;
        under30Years: number;
        under40Years: number;
        under50Years: number;
        over50Years: number;
        noLimit: number;
        null: number;
    };
    inclusionAgeMax: {
        inPregnancy: number;
        under1Year;
        under10Years: number;
        under20Years: number;
        under30Years: number;
        under40Years: number;
        under50Years: number;
        over50Years: number;
        noLimit: number;
        null: number;
    };
    phase: {
        phase0: number;
        phase1: number;
        phase2: number;
        phase3: number;
        phase4: number;
        notApplicable: number;
        other: number;
        null: number;
    };
    result: {
        with: number;
        without: number
    };
    sourceRegister: NameCountDto[];
    studyType: NameCountDto[];
    targetSize: NameCountDto[];
}
