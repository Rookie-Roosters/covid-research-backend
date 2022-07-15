export interface ResearchInterface {
  trialID: string;
  lastRefreshedOn: Date;
  publicTitle: string;
  scientificTitle?: string;
  acronym?: string;
  primarySponsor?: string;
  dateRegistration?: Date;
  sourceRegister?: string;
  webAddress: string;
  recruitmentStatus?: string;
  otherRecords: boolean;
  inclusionAgeMin?: number;
  inclusionAgeMinType?: 'years' | 'months' | 'weeks' | 'weeks of pregnacy' | 'days' | 'hours' | 'minutes' | 'no limit';
  inclusionAgeMax?: number;
  inclusionAgeMaxType?: 'years' | 'months' | 'weeks' | 'weeks of pregnacy' | 'days' | 'hours' | 'minutes' | 'no limit';
  inclusionGender?: 'Both' | 'Male' | 'Female';
  dateEnrollement?: Date;
  targetSize: { group?: string; count?: number }[];
  studyType: string;
  studyDesign?: string;
  phase?: string;
  countries?: string;
  contactFirstname?: string;
  contactLastname?: string;
  contactAddress?: string;
  contactEmail?: string;
  contactTel?: string;
  contactAffiliation?: string;
  inclusionCriteria?: string;
  exclusionCriteria?: string;
  condition?: string;
  intervention?: string;
  primaryOutcome?: string;
  secondaryOutcome?: string;
  resultsDatePosted?: Date;
  resultsDateCompleted?: Date;
  resultsUrlLink?: string;
  retrospectiveFlag: boolean;
  bridgingFlag: boolean;
  bridgedType: boolean; //true: "parent"
  results: boolean;
}
