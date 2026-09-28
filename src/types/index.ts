export type CategoryType = 'UR' | 'EWS' | 'OBC-NCL' | 'SC' | 'ST';

export type GenderType = 'Male' | 'Female' | 'Transgender' | 'Prefer not to say';

export type NationalityType = 'Citizen of India' | 'Subject of Nepal' | 'Subject of Bhutan' | 'Tibetan Refugee (pre-1962)' | 'Other';

export type QualificationLevel = 
  | '10th Pass (Matriculation)'
  | '12th Pass (Higher Secondary)'
  | 'Diploma (Engineering/Technical)'
  | "Bachelor's Degree (Graduation)"
  | "Master's Degree (Post Graduation)"
  | 'Doctorate (Ph.D)'
  | 'Professional Degree (CA/CS/Law/MBBS)';

export type StreamCategory = 
  | 'All Streams / Any Graduate'
  | 'Engineering & Technology'
  | 'Computer Science / IT'
  | 'Commerce, Economics & Finance'
  | 'Humanities, Arts & Social Sciences'
  | 'Pure Science (Physics, Chemistry, Math, Biology)'
  | 'Medicine & Healthcare'
  | 'Law & Legal Studies'
  | 'Agriculture & Allied Sciences';

export type ExamSector = 
  | 'Civil & Administrative Services'
  | 'Banking & Financial Institutions'
  | 'Staff Selection (SSC Central)'
  | 'Railways (RRB)'
  | 'Defense & Armed Forces'
  | 'Police & Paramilitary (CAPF)'
  | 'Engineering & Scientific (ISRO, DRDO, ESE)'
  | 'State Public Service Commissions';

export type PayScaleGroup = 'Group A (Gazetted)' | 'Group B (Gazetted)' | 'Group B (Non-Gazetted)' | 'Group C';

export interface EducationalInfo {
  highestQualification: QualificationLevel;
  degreeName: string; // e.g. B.Tech, B.Sc, B.Com, BA, BCA, MBBS
  branchOrStream: string; // e.g. Computer Science, Mechanical, History, Commerce
  streamCategory: StreamCategory;
  collegeOrUniversity: string;
  graduationStatus: 'Completed' | 'Final Year / Appearing' | 'Pre-final Year';
  graduationYear: number;
  percentageOrCGPA: 'Percentage' | 'CGPA';
  graduationScore: number; // e.g. 74.5 or 8.2
  tenthPercentage: number;
  twelfthPercentage: number;
  twelfthStream?: 'Science with Math' | 'Science with Biology' | 'Commerce' | 'Arts / Humanities';
  hasDiploma: boolean;
  diplomaBranch?: string;
  diplomaPercentage?: number;
}

export interface EligibilityInfo {
  category: CategoryType;
  isPwD: boolean;
  pwdType?: string; // e.g. Locomotor, Visual, Hearing, Multiple
  pwdPercentage?: number; // e.g. 40%+
  isExServiceman: boolean;
  exServicemenYearsOfService?: number;
  workExperienceYears: number; // e.g. 0 for freshers
  experienceSector?: 'None' | 'Private Sector' | 'Government / PSU' | 'Research / Academia';
  experienceRole?: string;
  hasNCCCertificate: boolean;
  nccCertificateType?: 'A' | 'B' | 'C';
  hasSportsQuota: boolean;
  sportsLevel?: 'State' | 'National' | 'International';
  typingProficiencyEnglishWPM: number; // 0 if none, 35 is standard SSC
  typingProficiencyHindiWPM: number;
  hasDrivingLicenseLMV: boolean; // required for Delhi Police SI etc.
  hasDomicileCertificate: boolean;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: GenderType;
  nationality: NationalityType;
  state: string;
  district: string;
  preferredWorkLocations: string[]; // e.g. ['Pan-India', 'Home State', 'Delhi/NCR', 'South Zone']
}

export interface UserProfile {
  id: string;
  personal: PersonalInfo;
  education: EducationalInfo;
  eligibility: EligibilityInfo;
  privacyMode: boolean; // masks phone, email, full address on screen
  createdAt: string;
  updatedAt: string;
}

export interface EligibilityRequirement {
  minAge: number;
  maxAgeGeneral: number;
  ageCutOffDate: string; // e.g. '2026-08-01'
  relaxationOBC: number; // typically +3
  relaxationSCST: number; // typically +5
  relaxationPwD: number; // typically +10
  relaxationExServicemen: number; // typically service + 3
  acceptedQualifications: QualificationLevel[];
  acceptedStreamCategories: StreamCategory[];
  allowedFinalYearAppearing: boolean;
  finalYearCutOffDate?: string;
  minGraduationPercentage?: number; // e.g. 60% for RBI Grade B
  minGraduationPercentageReserved?: number; // e.g. 50% for SC/ST
  minTenthPercentage?: number;
  minTwelfthPercentage?: number;
  requiresTwelfthMath?: boolean;
  requiresScienceStream?: boolean;
  minWorkExperienceYears?: number;
  genderEligibility: 'All' | 'Male Only' | 'Female Only';
  specialRequirements?: string[];
}

export interface ExamOpportunity {
  id: string;
  name: string;
  shortName: string;
  conductingBody: string; // e.g., UPSC, SSC, IBPS, NTA, RRB
  conductingBodyWebsite: string;
  officialNotificationUrl: string;
  applicationPortalUrl: string;
  sector: ExamSector;
  payGroup: PayScaleGroup;
  payLevel7thCPC: string; // e.g., 'Level 7 (Pay Matrix ₹44,900 - ₹1,42,400)'
  approxInHandMonthlySalary: string; // e.g., '₹68,000 - ₹78,000 / month'
  vacanciesCount: number;
  jobSummarySimple: string; // Plain-English student friendly description
  dayInTheLife: string; // What you actually do
  careerGrowthPlain: string; // How promotions work
  requirements: EligibilityRequirement;
  applicationStartDate: string;
  applicationEndDate: string;
  tentativeExamDate: string;
  examPatternSummary: string; // e.g. 'Tier 1 (MCQ), Tier 2 (Descriptive + MCQ), Interview'
  selectionStages: {
    stageNumber: number;
    title: string;
    mode: 'Computer Based Test' | 'Pen & Paper' | 'Interview' | 'Physical Test' | 'Skill Test';
    description: string;
    weightage?: string;
  }[];
  syllabusOverview: {
    subject: string;
    importance: 'High' | 'Medium' | 'Low';
    keyTopics: string[];
    plainAdvice: string;
  }[];
  isPopular: boolean;
}

export interface DetailedEligibilityResult {
  isEligible: boolean;
  verdict: 'Eligible' | 'Eligible with Conditions' | 'Not Eligible';
  verdictSummary: string;
  scorePercentage: number; // 0 to 100 compatibility
  ageCheck: {
    userAgeAtCutoff: number;
    userMaxAllowedAge: number;
    isPass: boolean;
    relaxationApplied: number;
    plainReason: string;
  };
  qualificationCheck: {
    isPass: boolean;
    plainReason: string;
  };
  scorePercentageCheck: {
    isPass: boolean;
    plainReason: string;
  };
  finalYearCheck: {
    isPass: boolean;
    plainReason: string;
  };
  specialRequirementsCheck: {
    isPass: boolean;
    plainReason: string;
    unmetCriteria: string[];
  };
  actionableStudentAdvice: string[];
}

export type ApplicationTrackingStatus = 
  | 'Interested'
  | 'Applying Soon'
  | 'Application Submitted'
  | 'Admit Card Released'
  | 'Exam Appeared'
  | 'Result Awaited'
  | 'Selected / Qualified';

export interface TrackedExam {
  examId: string;
  status: ApplicationTrackingStatus;
  notes: string;
  applicationNumber?: string;
  rollNumber?: string;
  targetExamYear: number;
  addedAt: string;
  updatedAt: string;
  documentsPrepared: {
    idProof: boolean;
    categoryCertificate: boolean;
    graduationCertificate: boolean;
    passportPhoto: boolean;
    signatureFile: boolean;
    domicileCertificate: boolean;
  };
}
