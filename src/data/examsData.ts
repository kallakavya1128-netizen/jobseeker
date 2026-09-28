import { ExamOpportunity } from '../types';

export const EXAMS_DATA: ExamOpportunity[] = [
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services Examination (CSE)',
    shortName: 'UPSC CSE (IAS / IPS / IFS / IRS)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    conductingBodyWebsite: 'https://upsc.gov.in',
    officialNotificationUrl: 'https://upsc.gov.in/examinations/active-exams',
    applicationPortalUrl: 'https://upsconline.nic.in',
    sector: 'Civil & Administrative Services',
    payGroup: 'Group A (Gazetted)',
    payLevel7thCPC: 'Level 10 (Basic Pay ₹56,100 - ₹1,77,500)',
    approxInHandMonthlySalary: '₹85,000 - ₹1,05,000 / month (plus Govt Bungalow, official car, security)',
    vacanciesCount: 1056,
    jobSummarySimple: 'India’s most prestigious leadership examination. Successful candidates become District Magistrates (IAS), Superintendents of Police (IPS), Ambassadors/Diplomats (IFS), or Commissioners of Tax/Customs (IRS). You shape government policy, supervise district development, and uphold law & order.',
    dayInTheLife: 'As an IAS or IPS officer, your day involves inspecting public infrastructure, reviewing law enforcement, managing disaster response, listening to citizen grievances, coordinating health and school systems, and meeting government ministers.',
    careerGrowthPlain: 'Starts as Sub-Divisional Magistrate (SDM) / Assistant Commissioner -> District Collector / DM -> Departmental Secretary -> Chief Secretary of State / Cabinet Secretary of India (highest civil servant in India).',
    requirements: {
      minAge: 21,
      maxAgeGeneral: 32,
      ageCutOffDate: '2026-08-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 5,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)",
        'Doctorate (Ph.D)',
        'Professional Degree (CA/CS/Law/MBBS)'
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Computer Science / IT',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Medicine & Healthcare',
        'Law & Legal Studies',
        'Agriculture & Allied Sciences'
      ],
      allowedFinalYearAppearing: true,
      finalYearCutOffDate: '2026-09-30',
      minGraduationPercentage: 0, // No minimum mark required, mere pass in degree!
      genderEligibility: 'All',
      specialRequirements: ['Citizen of India for IAS & IPS; subjects of Nepal/Bhutan can apply for other services.']
    },
    applicationStartDate: '2026-02-14',
    applicationEndDate: '2026-03-05',
    tentativeExamDate: '2026-05-24',
    examPatternSummary: 'Stage 1 Prelims (Objective MCQs) -> Stage 2 Mains (Written Descriptive Papers) -> Stage 3 Personality Test (Interview in UPSC Dholpur House, New Delhi)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Civil Services Preliminary Examination',
        mode: 'Pen & Paper',
        description: 'Two papers of 200 marks each. Paper 1 (General Studies) determines qualifying cut-off. Paper 2 (CSAT Aptitude) is qualifying only (requires 33% = 66 marks).',
        weightage: 'Qualifying for Mains only'
      },
      {
        stageNumber: 2,
        title: 'Civil Services Main Examination',
        mode: 'Pen & Paper',
        description: '9 subjective descriptive papers over 5 days (Essay, 4 General Studies papers, 2 Optional Subject papers, and 2 qualifying language papers). Total 1750 marks.',
        weightage: '1750 marks (Counted for final merit)'
      },
      {
        stageNumber: 3,
        title: 'Personality Test & Interview',
        mode: 'Interview',
        description: 'Board interview evaluating intellectual caliber, social traits, mental alertness, balance of judgment, and moral integrity.',
        weightage: '275 marks'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Indian Polity & Constitution',
        importance: 'High',
        keyTopics: ['Fundamental Rights', 'Parliament', 'Judiciary', 'Panchayati Raj', 'Constitutional Bodies'],
        plainAdvice: 'Master M. Laxmikanth and read supreme court landmark judgments.'
      },
      {
        subject: 'Modern Indian History & Culture',
        importance: 'High',
        keyTopics: ['Freedom Struggle 1857-1947', 'Socio-religious reform movements', 'Art, Architecture & Literature'],
        plainAdvice: 'Read NCERT Class 11-12 and Spectrum Modern History.'
      },
      {
        subject: 'Current Affairs & Economy',
        importance: 'High',
        keyTopics: ['Union Budget', 'Economic Survey', 'Inflation & RBI Policies', 'Government Welfare Schemes'],
        plainAdvice: 'Read The Hindu or Indian Express daily; keep note of government initiatives.'
      }
    ],
    isPopular: true
  },
  {
    id: 'ssc-cgl',
    name: 'SSC Combined Graduate Level Examination (CGL)',
    shortName: 'SSC CGL (Inspectors & Section Officers)',
    conductingBody: 'Staff Selection Commission (SSC)',
    conductingBodyWebsite: 'https://ssc.gov.in',
    officialNotificationUrl: 'https://ssc.gov.in/candidate-corner/tentative-calendar-of-examinations',
    applicationPortalUrl: 'https://ssc.gov.in',
    sector: 'Staff Selection (SSC Central)',
    payGroup: 'Group B (Non-Gazetted)',
    payLevel7thCPC: 'Level 7 (Pay Matrix ₹44,900 - ₹1,42,400) / Level 8 for AAO',
    approxInHandMonthlySalary: '₹68,000 - ₹82,000 / month (Metro cities including DA 50% + HRA 30%)',
    vacanciesCount: 17727,
    jobSummarySimple: 'The largest graduate-level recruitment in Central Government. Selected candidates become Income Tax Inspectors, Central Excise / GST Inspectors, CBI Sub-Inspectors, Enforcement Officers (ED), and Assistant Section Officers in the Ministry of External Affairs, Defense, and Central Secretariat.',
    dayInTheLife: 'Working in central ministries or field commissionerates. An Assistant Section Officer drafts government policy files, approves files in e-office, while an Inspector inspects goods, audits tax filings, or participates in enforcement operations.',
    careerGrowthPlain: 'Starts as Inspector / ASO -> Superintendent / Under Secretary -> Assistant Commissioner / Deputy Secretary -> Joint Commissioner.',
    requirements: {
      minAge: 18,
      maxAgeGeneral: 30,
      ageCutOffDate: '2026-08-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 3,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)",
        'Doctorate (Ph.D)',
        'Professional Degree (CA/CS/Law/MBBS)'
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Computer Science / IT',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Medicine & Healthcare',
        'Law & Legal Studies'
      ],
      allowedFinalYearAppearing: true,
      finalYearCutOffDate: '2026-08-01',
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['Computer Knowledge module qualifying test and Data Entry Speed Test (DEST) are compulsory for all posts in Tier 2.']
    },
    applicationStartDate: '2026-06-11',
    applicationEndDate: '2026-07-10',
    tentativeExamDate: '2026-09-15',
    examPatternSummary: 'Tier 1 (Computer Based Exam - 100 questions, 200 marks, Qualifying) -> Tier 2 (Computer Based Exam + Computer Test + Typing Speed Test)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Tier-1 Computer Based Examination',
        mode: 'Computer Based Test',
        description: '100 MCQs in 60 minutes: General Intelligence & Reasoning (25 Q), General Awareness (25 Q), Quantitative Aptitude (25 Q), English Comprehension (25 Q).',
        weightage: 'Qualifying screening test'
      },
      {
        stageNumber: 2,
        title: 'Tier-2 Final Merit Examination',
        mode: 'Computer Based Test',
        description: 'Section I (Maths & Reasoning - 180 marks), Section II (English & GK - 210 marks), Section III (Computer Module qualifying + Data Entry Speed test 2000 key depressions in 15 mins).',
        weightage: '390 marks (Final Merit Basis)'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Quantitative Aptitude (Mathematics)',
        importance: 'High',
        keyTopics: ['Arithmetic (Profit/Loss, Percentage, Ratio)', 'Advanced Math (Geometry, Mensuration, Trigonometry, Algebra)'],
        plainAdvice: 'Focus equally on Arithmetic and Advanced Maths. Practice calculation shortcuts.'
      },
      {
        subject: 'English Comprehension & Grammar',
        importance: 'High',
        keyTopics: ['Reading Comprehension', 'Cloze Test', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Idioms & Vocabulary'],
        plainAdvice: 'Read English editorials and memorize high-frequency vocabulary.'
      },
      {
        subject: 'General Intelligence & Reasoning',
        importance: 'Medium',
        keyTopics: ['Syllogism', 'Blood Relations', 'Analogy', 'Coding-Decoding', 'Non-verbal Puzzles'],
        plainAdvice: 'High-scoring section; solve previous year papers with a stopwatch.'
      }
    ],
    isPopular: true
  },
  {
    id: 'ibps-po',
    name: 'IBPS Probationary Officer (PO / Management Trainee)',
    shortName: 'IBPS PO (Public Sector Bank Officer)',
    conductingBody: 'Institute of Banking Personnel Selection (IBPS)',
    conductingBodyWebsite: 'https://ibps.in',
    officialNotificationUrl: 'https://ibps.in/index.php/probationary-officers-management-trainees',
    applicationPortalUrl: 'https://ibps.in',
    sector: 'Banking & Financial Institutions',
    payGroup: 'Group A (Gazetted)',
    payLevel7thCPC: 'Scale-I Officer (Basic ₹48,480 under 12th Bipartite Settlement)',
    approxInHandMonthlySalary: '₹62,000 - ₹72,000 / month (plus Leased Accommodation up to ₹25,000)',
    vacanciesCount: 4455,
    jobSummarySimple: 'Fast-track managerial career across 11 nationalized public sector banks including Punjab National Bank, Bank of Baroda, Canara Bank, and Union Bank of India. You will learn branch management, commercial lending, corporate loans, and retail credit operations.',
    dayInTheLife: 'Approving education and home loans, evaluating SME balance sheets, overseeing branch cashiers, helping retail customers with financial products, and ensuring RBI compliance.',
    careerGrowthPlain: 'Officer Scale I (Assistant Manager) -> Scale II (Manager) -> Scale III (Senior Manager) -> Chief Manager -> AGM -> General Manager -> Executive Director -> Bank MD & CEO.',
    requirements: {
      minAge: 20,
      maxAgeGeneral: 30,
      ageCutOffDate: '2026-08-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 5,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)",
        'Doctorate (Ph.D)',
        'Professional Degree (CA/CS/Law/MBBS)'
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Computer Science / IT',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Medicine & Healthcare',
        'Law & Legal Studies'
      ],
      allowedFinalYearAppearing: false, // Strict requirement: degree must be completed before application end date!
      finalYearCutOffDate: '2026-08-25',
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['Operating and working knowledge in computer systems is mandatory (Certificate/Diploma/Degree in computer operations).']
    },
    applicationStartDate: '2026-08-01',
    applicationEndDate: '2026-08-25',
    tentativeExamDate: '2026-10-19',
    examPatternSummary: 'Prelims (100 Q, 1 Hour, Sectional Timing) -> Mains (Descriptive + Objective, 3.5 Hours) -> Face-to-Face Interview in Regional Zonal Office',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'IBPS PO Preliminary Exam',
        mode: 'Computer Based Test',
        description: 'English (30 Q, 20 mins), Quantitative Aptitude (35 Q, 20 mins), Reasoning Ability (35 Q, 20 mins). Negative marking 0.25.',
        weightage: 'Qualifying for Mains'
      },
      {
        stageNumber: 2,
        title: 'IBPS PO Main Exam & Letter Writing',
        mode: 'Computer Based Test',
        description: 'Reasoning & Computer Aptitude (60 marks), Data Analysis & Interpretation (60 marks), General/Economy/Banking Awareness (40 marks), English Language (40 marks) + English Letter & Essay (25 marks).',
        weightage: '80% weightage in final combined merit'
      },
      {
        stageNumber: 3,
        title: 'Common Personal Interview',
        mode: 'Interview',
        description: 'Conducted by participating banks and coordinated by IBPS at select centers. Minimum qualifying score 40% (35% for SC/ST/OBC/PwD).',
        weightage: '20% weightage in final combined merit'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Data Analysis & Interpretation',
        importance: 'High',
        keyTopics: ['Bar Graphs', 'Radar Charts', 'Caselets', 'Probability', 'Arithmetic DI'],
        plainAdvice: 'Mains banking exams test conceptual calculation depth rather than simple formulas.'
      },
      {
        subject: 'Banking & Financial Awareness',
        importance: 'High',
        keyTopics: ['Monetary Policy', 'NPA Management', 'Priority Sector Lending', 'UPI & Digital Banking'],
        plainAdvice: 'Follow RBI notifications, monthly banking awareness capsules, and banking current events.'
      },
      {
        subject: 'High-Level Logical Puzzles',
        importance: 'High',
        keyTopics: ['Floor Puzzles', 'Circular Seating with variables', 'Input-Output Machines'],
        plainAdvice: 'Speed and selection of easy vs difficult puzzles is the key to clearing sectional cut-offs.'
      }
    ],
    isPopular: true
  },
  {
    id: 'rbi-grade-b',
    name: 'Reserve Bank of India (RBI) Grade B Officer (General)',
    shortName: 'RBI Grade B Officer (Central Bank Manager)',
    conductingBody: 'Reserve Bank of India Services Board',
    conductingBodyWebsite: 'https://rbi.org.in',
    officialNotificationUrl: 'https://opportunities.rbi.org.in/scripts/vacancies.aspx',
    applicationPortalUrl: 'https://ibpsonline.ibps.in',
    sector: 'Banking & Financial Institutions',
    payGroup: 'Group A (Gazetted)',
    payLevel7thCPC: 'Executive Grade B (Basic ₹55,200 with bank allowances)',
    approxInHandMonthlySalary: '₹1,15,000 - ₹1,30,000 / month (plus RBI VIP Quarters in Mumbai / Metro cities)',
    vacanciesCount: 94,
    jobSummarySimple: 'The most prestigious financial regulatory post in India. Working at India’s central bank, you oversee currency circulation, monetary policy execution, bank inspection, foreign exchange reserves, and fintech regulatory sandboxes.',
    dayInTheLife: 'Analyzing macro-economic indicators, evaluating systemic liquidity, drafting directives for commercial banks, auditing treasury operations, and representing India at international economic forums.',
    careerGrowthPlain: 'Grade B (Manager) -> Grade C (Assistant General Manager) -> Grade D (DGM) -> Grade E (General Manager) -> Grade F (Chief General Manager) -> Executive Director -> Deputy Governor of RBI.',
    requirements: {
      minAge: 21,
      maxAgeGeneral: 30,
      ageCutOffDate: '2026-07-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 5,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)",
        'Doctorate (Ph.D)',
        'Professional Degree (CA/CS/Law/MBBS)'
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Commerce, Economics & Finance',
        'Computer Science / IT',
        'Humanities, Arts & Social Sciences',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Law & Legal Studies'
      ],
      allowedFinalYearAppearing: false,
      finalYearCutOffDate: '2026-07-01',
      minGraduationPercentage: 60, // 60% in Graduation AND 60% in 10th & 12th! (50% for SC/ST/PwD)
      minGraduationPercentageReserved: 50,
      minTenthPercentage: 60,
      minTwelfthPercentage: 60,
      genderEligibility: 'All',
      specialRequirements: ['Strict criteria: Minimum 60% marks in Graduation AND in 10th and 12th standard (50% for SC/ST/PwD). Unreserved candidates have maximum 6 attempts in Phase-I.']
    },
    applicationStartDate: '2026-07-15',
    applicationEndDate: '2026-08-16',
    tentativeExamDate: '2026-09-08',
    examPatternSummary: 'Phase I (Objective Online Test, 200 marks) -> Phase II (Descriptive + Objective Online Exam, 300 marks) -> Phase III (Interview, 75 marks)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Phase-I Online Examination',
        mode: 'Computer Based Test',
        description: '200 questions in 120 minutes: General Awareness (80 Q), English (30 Q), Quantitative Aptitude (30 Q), Reasoning (60 Q). High cut-off in General Awareness.',
        weightage: 'Screening only'
      },
      {
        stageNumber: 2,
        title: 'Phase-II Descriptive & Objective Exam',
        mode: 'Computer Based Test',
        description: 'Paper 1: Economic & Social Issues (100 marks), Paper 2: English Writing Skills (100 marks), Paper 3: Finance and Management (100 marks). Typed on computer keyboard.',
        weightage: '300 marks (Final merit)'
      },
      {
        stageNumber: 3,
        title: 'Phase-III Personality Interview',
        mode: 'Interview',
        description: 'Conducted at RBI Central Office Mumbai or major metro centers. Focuses on economics, financial stability, and management leadership.',
        weightage: '75 marks'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Economic & Social Issues (ESI)',
        importance: 'High',
        keyTopics: ['Growth and Development', 'Sustainable Development Goals', 'Indian Economic Reforms', 'Social Structure & Demographics'],
        plainAdvice: 'Study NITI Aayog reports, Economic Survey, and government social schemes.'
      },
      {
        subject: 'Finance & Management',
        importance: 'High',
        keyTopics: ['Indian Financial System', 'Corporate Governance', 'Leadership Styles', 'Motivation & Communication Theories'],
        plainAdvice: 'Clear fundamental finance concepts: derivatives, bonds, balance sheets, and organizational behavior.'
      }
    ],
    isPopular: true
  },
  {
    id: 'ssc-chsl',
    name: 'SSC Combined Higher Secondary Level (10+2) Examination',
    shortName: 'SSC CHSL (Clerks & Data Entry Operators)',
    conductingBody: 'Staff Selection Commission (SSC)',
    conductingBodyWebsite: 'https://ssc.gov.in',
    officialNotificationUrl: 'https://ssc.gov.in',
    applicationPortalUrl: 'https://ssc.gov.in',
    sector: 'Staff Selection (SSC Central)',
    payGroup: 'Group C',
    payLevel7thCPC: 'Level 2 (₹19,900 - ₹63,200) / Level 4 for DEO (₹25,500 - ₹81,100)',
    approxInHandMonthlySalary: '₹34,000 - ₹46,000 / month (Metro cities)',
    vacanciesCount: 3712,
    jobSummarySimple: 'Ideal first government job for students right after 12th standard or during early college years. Recruits Lower Division Clerks (LDC), Junior Secretariat Assistants (JSA), and Data Entry Operators (DEO) across Central Government ministries and departments.',
    dayInTheLife: 'Managing inward-outward official registers, digitizing paper archives, data entry of government records, public service desk duties, and maintaining departmental files.',
    careerGrowthPlain: 'LDC -> Upper Division Clerk (UDC) -> Assistant Section Officer (ASO) -> Section Officer.',
    requirements: {
      minAge: 18,
      maxAgeGeneral: 27,
      ageCutOffDate: '2026-08-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 3,
      acceptedQualifications: [
        '12th Pass (Higher Secondary)',
        'Diploma (Engineering/Technical)',
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)"
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Engineering & Technology'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['For DEO Grade A in CAG/MoPNG: 12th Standard pass in Science stream with Mathematics. Typing speed test required in Tier 2 (35 WPM English or 30 WPM Hindi).']
    },
    applicationStartDate: '2026-04-02',
    applicationEndDate: '2026-05-01',
    tentativeExamDate: '2026-07-02',
    examPatternSummary: 'Tier 1 (Computer Based Exam - 100 MCQs, Qualifying) -> Tier 2 (Computer Based Exam + Typing / Skill Test)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Tier-1 Online Objective Examination',
        mode: 'Computer Based Test',
        description: '100 questions (200 marks) in 60 mins: English (25 Q), General Intelligence (25 Q), Quantitative Aptitude Basic Arithmetic (25 Q), General Awareness (25 Q).',
        weightage: 'Qualifying for Tier-2'
      },
      {
        stageNumber: 2,
        title: 'Tier-2 Exam & Typing Skill Test',
        mode: 'Computer Based Test',
        description: 'Section I (Maths & Reasoning - 180 marks), Section II (English & General Awareness - 180 marks), Section III (Computer Module + Typing Test at 35 wpm).',
        weightage: '360 marks (Final Merit)'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Basic Arithmetic & Algebra',
        importance: 'High',
        keyTopics: ['Decimals and Fractions', 'Percentages', 'Ratio and Proportion', 'Square roots', 'Simple & Compound Interest'],
        plainAdvice: 'NCERT Mathematics up to Class 10 is sufficient. Speed is everything in Tier 1.'
      },
      {
        subject: 'English Language (Basic)',
        importance: 'High',
        keyTopics: ['Spot the Error', 'Fill in the Blanks', 'Synonyms/Antonyms', 'Spellings', 'One-word substitution'],
        plainAdvice: 'Practice 20 vocabulary questions daily from previous papers.'
      }
    ],
    isPopular: true
  },
  {
    id: 'sbi-clerk',
    name: 'State Bank of India (SBI) Junior Associates (Clerk)',
    shortName: 'SBI Clerk (Customer Support & Sales)',
    conductingBody: 'State Bank of India',
    conductingBodyWebsite: 'https://sbi.co.in',
    officialNotificationUrl: 'https://sbi.co.in/web/careers',
    applicationPortalUrl: 'https://bank.sbi/careers',
    sector: 'Banking & Financial Institutions',
    payGroup: 'Group C',
    payLevel7thCPC: 'Clerical Cadre (Basic ₹24,050 under revised wage settlement)',
    approxInHandMonthlySalary: '₹37,000 - ₹43,000 / month (plus medical cover, conveyance, pension)',
    vacanciesCount: 8283,
    jobSummarySimple: 'Join India’s largest commercial bank as a customer associate. Handle daily branch transactions, savings accounts, fixed deposits, foreign exchange currency notes, debit cards, and customer digital onboarding.',
    dayInTheLife: 'Greeting customers at cash and non-cash counters, verifying KYC documents, processing NEFT/RTGS requests, resolving internet banking queries, and assisting senior loan officers.',
    careerGrowthPlain: 'Junior Associate -> Senior Associate -> Special Associate -> Trainee Officer / Scale I Officer (JMGS-I) through internal fast-track promotion exams in just 3-4 years.',
    requirements: {
      minAge: 20,
      maxAgeGeneral: 28,
      ageCutOffDate: '2026-04-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 5,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)",
        'Doctorate (Ph.D)',
        'Professional Degree (CA/CS/Law/MBBS)'
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Commerce, Economics & Finance',
        'Engineering & Technology',
        'Computer Science / IT',
        'Humanities, Arts & Social Sciences',
        'Pure Science (Physics, Chemistry, Math, Biology)'
      ],
      allowedFinalYearAppearing: true,
      finalYearCutOffDate: '2026-12-31',
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['Candidate must be proficient (reading, writing, speaking, and understanding) in the specified opted local language of the applied state. Local Language Test (LPT) is conducted before joining.']
    },
    applicationStartDate: '2026-01-05',
    applicationEndDate: '2026-01-26',
    tentativeExamDate: '2026-03-20',
    examPatternSummary: 'Preliminary Exam (100 marks, 1 hour) -> Main Examination (200 marks, 2 hours 40 mins) -> Local Language Test (No interview)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'SBI Clerk Preliminary Examination',
        mode: 'Computer Based Test',
        description: '100 MCQs in 1 hour with 20 minutes sectional timer: English Language (30 Q), Numerical Ability (35 Q), Reasoning Ability (35 Q).',
        weightage: 'Qualifying for Mains'
      },
      {
        stageNumber: 2,
        title: 'SBI Clerk Main Examination',
        mode: 'Computer Based Test',
        description: '190 questions for 200 marks: General/Financial Awareness (50 Q, 50 M), General English (40 Q, 40 M), Quantitative Aptitude (50 Q, 50 M), Reasoning Ability & Computer Aptitude (50 Q, 60 M).',
        weightage: 'Final merit strictly based on Mains score'
      },
      {
        stageNumber: 3,
        title: 'Language Proficiency Test (LPT)',
        mode: 'Skill Test',
        description: 'Conducted for candidates who did not study the local state language in 10th or 12th standard. It is qualifying in nature.',
        weightage: 'Qualifying'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Numerical Ability (Speed Math)',
        importance: 'High',
        keyTopics: ['Simplification & Approximation', 'Number Series', 'Quadratic Equations', 'Data Interpretation'],
        plainAdvice: 'Master Vedic math calculation techniques, tables up to 30, and squares/cubes.'
      },
      {
        subject: 'Financial Awareness',
        importance: 'High',
        keyTopics: ['SBI in news', 'Repo rate & Reverse Repo', 'Monetary Policy', 'Digital banking trends'],
        plainAdvice: 'Read last 4 months of banking current affairs before the Mains exam.'
      }
    ],
    isPopular: true
  },
  {
    id: 'rrb-ntpc',
    name: 'RRB Non-Technical Popular Categories (NTPC)',
    shortName: 'RRB NTPC (Station Master & Train Clerks)',
    conductingBody: 'Railway Recruitment Boards (Ministry of Railways)',
    conductingBodyWebsite: 'https://indianrailways.gov.in',
    officialNotificationUrl: 'https://www.rrbchennai.gov.in',
    applicationPortalUrl: 'https://www.rrbapply.gov.in',
    sector: 'Railways (RRB)',
    payGroup: 'Group C',
    payLevel7thCPC: 'Level 2 to Level 6 (₹19,900 to ₹35,400 basic)',
    approxInHandMonthlySalary: '₹38,000 - ₹62,000 / month (plus Free Railway Pass, Running Allowances)',
    vacanciesCount: 11558,
    jobSummarySimple: 'Prestigious operational and commercial railway posts including Station Master, Goods Train Manager (Guard), Senior Commercial cum Ticket Clerk, and Accounts Clerk across all Indian Railway zones.',
    dayInTheLife: 'A Station Master coordinates train movements, signals, platform allocations, and emergency operations. Commercial clerks manage ticketing, freight billing, and passenger amenities.',
    careerGrowthPlain: 'Station Master -> Traffic Inspector -> Assistant Operations Manager (AOM - Group B) -> Divisional Operations Manager (DOM).',
    requirements: {
      minAge: 18,
      maxAgeGeneral: 33, // Relaxed age limit in recent railway notifications
      ageCutOffDate: '2026-07-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 3,
      acceptedQualifications: [
        '12th Pass (Higher Secondary)',
        'Diploma (Engineering/Technical)',
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)"
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Pure Science (Physics, Chemistry, Math, Biology)'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['Medical Fitness standards are very strict (A-2 medical standard for Station Master, with 6/9 distant vision without glasses). Color blindness is not permitted for Station Master and Goods Guard.']
    },
    applicationStartDate: '2026-09-14',
    applicationEndDate: '2026-10-13',
    tentativeExamDate: '2026-12-10',
    examPatternSummary: 'CBT 1 (100 Q, 90 mins, Screening) -> CBT 2 (120 Q, 90 mins) -> Computer Based Aptitude Test (CBAT for Station Master) / Typing Skill Test',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'CBT Stage-1 (Screening Test)',
        mode: 'Computer Based Test',
        description: '100 questions: General Awareness (40 Q), Mathematics (30 Q), General Intelligence and Reasoning (30 Q). Time: 90 minutes. Negative marking 1/3.',
        weightage: 'Screening to shortlist 15x candidates for CBT 2'
      },
      {
        stageNumber: 2,
        title: 'CBT Stage-2 (Merit Test)',
        mode: 'Computer Based Test',
        description: '120 questions: General Awareness (50 Q), Mathematics (35 Q), Reasoning (35 Q). Time: 90 minutes.',
        weightage: '70% weightage for Station Master, 100% for other posts'
      },
      {
        stageNumber: 3,
        title: 'CBAT (Psycho Test for Station Master)',
        mode: 'Computer Based Test',
        description: 'Assesses concentration, selective attention, spatial scanning, and information ordering. 30% weightage for Station Master merit.',
        weightage: '30% weightage (Station Master only)'
      }
    ],
    syllabusOverview: [
      {
        subject: 'General Awareness & Railways Knowledge',
        importance: 'High',
        keyTopics: ['Current National/International Events', 'History of Indian Railways', 'General Science (Physics, Chemistry, Biology up to 10th CBSE)'],
        plainAdvice: 'NCERT Science up to Class 10 carries huge weightage in Railway exams.'
      },
      {
        subject: 'Mathematics',
        importance: 'High',
        keyTopics: ['BODMAS', 'Percentages', 'Time and Work', 'Time and Distance', 'SI and CI', 'Elementary Statistics'],
        plainAdvice: 'Solve previous RRB NTPC papers from 2019-2022 to get familiar with Railway-specific questions.'
      }
    ],
    isPopular: true
  },
  {
    id: 'cds-exam',
    name: 'UPSC Combined Defence Services (CDS) Examination',
    shortName: 'UPSC CDS (Army / Navy / Air Force Officer)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    conductingBodyWebsite: 'https://upsc.gov.in',
    officialNotificationUrl: 'https://upsc.gov.in/examinations/active-exams',
    applicationPortalUrl: 'https://upsconline.nic.in',
    sector: 'Defense & Armed Forces',
    payGroup: 'Group A (Gazetted)',
    payLevel7thCPC: 'Level 10 (Lieutenant / Sub Lieutenant / Flying Officer - ₹56,100 basic + Military Service Pay ₹15,500)',
    approxInHandMonthlySalary: '₹95,000 - ₹1,15,000 / month (plus Canteen, Defence Officer Mess, Subsidized Housing)',
    vacanciesCount: 459,
    jobSummarySimple: 'Commissioned Officer entry into Indian Military Academy (IMA Dehradun), Indian Naval Academy (INA Ezhimala), Air Force Academy (AFA Hyderabad), or Officers Training Academy (OTA Chennai for Men and Women). You command troops, lead combat units, and defend the nation’s borders.',
    dayInTheLife: 'Leading morning military parades, physical fitness runs, tactical combat simulations, weapon firing drills, unit administration, and safeguarding international borders and air/sea space.',
    careerGrowthPlain: 'Lieutenant -> Captain -> Major -> Lieutenant Colonel -> Colonel (Unit Commanding Officer) -> Brigadier -> Major General -> Lieutenant General -> General (Army Chief).',
    requirements: {
      minAge: 19,
      maxAgeGeneral: 24, // 25 for OTA
      ageCutOffDate: '2026-07-01',
      relaxationOBC: 0, // No category relaxation in Armed Forces Commission exams!
      relaxationSCST: 0, // No age relaxation in Defence Commission!
      relaxationPwD: 0,
      relaxationExServicemen: 0,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)",
        'Professional Degree (CA/CS/Law/MBBS)'
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Computer Science / IT',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences'
      ],
      allowedFinalYearAppearing: true,
      finalYearCutOffDate: '2026-07-01',
      minGraduationPercentage: 0,
      genderEligibility: 'All', // OTA is open for both Men and Women; IMA/INA/AFA for Unmarried Men
      specialRequirements: ['For Navy (INA): Degree in Engineering is compulsory. For Air Force (AFA): Degree with Physics and Math at 10+2 OR Bachelor of Engineering. For Army (IMA & OTA): Any graduate degree. Rigorous 5-day SSB interview and strict physical/medical standards.']
    },
    applicationStartDate: '2026-05-13',
    applicationEndDate: '2026-06-02',
    tentativeExamDate: '2026-09-06',
    examPatternSummary: 'Written Examination (English, GK, Elementary Maths for IMA/INA/AFA; English + GK for OTA) -> 5-Day Services Selection Board (SSB) Interview -> Medical Board',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'UPSC Written Examination',
        mode: 'Pen & Paper',
        description: 'For IMA, INA, AFA: English (100 M), General Knowledge (100 M), Elementary Mathematics (100 M). For OTA: English (100 M) + General Knowledge (100 M). Duration 2 hours per paper.',
        weightage: '300 marks (200 for OTA)'
      },
      {
        stageNumber: 2,
        title: '5-Day SSB Interview (Services Selection Board)',
        mode: 'Interview',
        description: 'Stage I: Officer Intelligence Rating (OIR) and Picture Perception & Discussion Test (PPDT). Stage II: Psychology tests, Group Testing Officer (GTO) outdoor tasks, Personal Interview, and Final Board Conference.',
        weightage: '300 marks (200 for OTA)'
      },
      {
        stageNumber: 3,
        title: 'Special Medical Board Examination',
        mode: 'Physical Test',
        description: 'Conducted at military base hospitals. Tests vision, hearing, spine alignment, chest expansion, and physical endurance.',
        weightage: 'Qualifying'
      }
    ],
    syllabusOverview: [
      {
        subject: 'General Knowledge & Current Defence Affairs',
        importance: 'High',
        keyTopics: ['Indian History and Geography', 'Defence Missiles & Equipment', 'International Relations & Quad', 'Constitution of India'],
        plainAdvice: 'Keep track of joint military exercises and Indian defence procurement.'
      },
      {
        subject: 'English Comprehension & Grammar',
        importance: 'High',
        keyTopics: ['Ordering of Words in Sentence', 'Spotting Errors', 'Antonyms/Synonyms', 'Idioms & Phrases'],
        plainAdvice: 'UPSC CDS English is formulaic; practice 10 past year papers to score 70+.'
      }
    ],
    isPopular: true
  },
  {
    id: 'isro-scientist',
    name: 'ISRO Centralised Recruitment Board (ICRB) - Scientist / Engineer ‘SC’',
    shortName: 'ISRO Scientist / Engineer ‘SC’',
    conductingBody: 'Indian Space Research Organisation (ISRO)',
    conductingBodyWebsite: 'https://isro.gov.in',
    officialNotificationUrl: 'https://www.isro.gov.in/Careers.html',
    applicationPortalUrl: 'https://apps.isac.gov.in',
    sector: 'Engineering & Scientific (ISRO, DRDO, ESE)',
    payGroup: 'Group A (Gazetted)',
    payLevel7thCPC: 'Level 10 (₹56,100 basic + PRIS Incentive + Space allowances)',
    approxInHandMonthlySalary: '₹88,000 - ₹98,000 / month (plus ISRO Staff Quarters in Bengaluru, Sriharikota, Thiruvananthapuram)',
    vacanciesCount: 303,
    jobSummarySimple: 'Contribute to India’s space missions including Gaganyaan (crewed human spaceflight), Chandrayaan, Aditya-L1, and launch vehicle engineering (PSLV, LVM3). Design satellites, rocket propulsion systems, avionics, payload software, and deep-space telemetry.',
    dayInTheLife: 'Working in cleanrooms, simulating rocket trajectories, programming onboard flight computers, testing cryogenic engine valves, or monitoring satellite telemetry at ISTRAC.',
    careerGrowthPlain: 'Scientist/Engineer ‘SC’ -> ‘SD’ -> ‘SE’ -> ‘SF’ -> ‘SG’ -> Outstanding Scientist / Director of Space Center -> Chairman, ISRO / Secretary, Department of Space.',
    requirements: {
      minAge: 21,
      maxAgeGeneral: 28,
      ageCutOffDate: '2026-06-14',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 3,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)"
      ],
      acceptedStreamCategories: [
        'Engineering & Technology',
        'Computer Science / IT'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 65, // Mandatory 65% aggregate or 6.84/10 CGPA
      genderEligibility: 'All',
      specialRequirements: ['Mandatory B.E / B.Tech or equivalent in Mechanical, Electronics, Electrical, or Computer Science Engineering with minimum 65% marks or 6.84/10 CGPA. First Class degree is strictly compulsory.']
    },
    applicationStartDate: '2026-05-25',
    applicationEndDate: '2026-06-14',
    tentativeExamDate: '2026-08-09',
    examPatternSummary: 'Computer Based Written Test (Discipline Specific 80 marks + Aptitude 20 marks) -> Technical Interview (100 marks, min 60% required)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Written Examination',
        mode: 'Computer Based Test',
        description: 'Part A: 80 Discipline-specific engineering questions (GATE standard). Part B: 15 questions in Aptitude/Reasoning (20 marks). Total 100 questions in 120 minutes.',
        weightage: 'Shortlisting for Interview (1:5 ratio)'
      },
      {
        stageNumber: 2,
        title: 'Technical Personality Interview',
        mode: 'Interview',
        description: 'Comprehensive technical interview before a panel of senior ISRO scientists. Candidate is tested on engineering core fundamentals, B.Tech project work, and design problems.',
        weightage: 'Final merit 50% written + 50% interview (or 100% interview depending on notification cycle)'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Core Engineering Fundamentals (GATE Level)',
        importance: 'High',
        keyTopics: ['Thermodynamics / Machine Design (for Mech)', 'Signals & Systems / Microprocessors (for ECE)', 'Data Structures / Algorithms / OS (for CSE)'],
        plainAdvice: 'Solve GATE previous 15 years question papers. Master basic derivations.'
      }
    ],
    isPopular: true
  },
  {
    id: 'ssc-cpo',
    name: 'SSC Central Police Organization (CPO) - Sub-Inspector in Delhi Police & CAPFs',
    shortName: 'SSC CPO (Sub-Inspector in Delhi Police, BSF, CRPF, CISF, ITBP, SSB)',
    conductingBody: 'Staff Selection Commission (SSC)',
    conductingBodyWebsite: 'https://ssc.gov.in',
    officialNotificationUrl: 'https://ssc.gov.in',
    applicationPortalUrl: 'https://ssc.gov.in',
    sector: 'Police & Paramilitary (CAPF)',
    payGroup: 'Group B (Non-Gazetted)',
    payLevel7thCPC: 'Level 6 (₹35,400 - ₹1,12,400)',
    approxInHandMonthlySalary: '₹55,000 - ₹66,000 / month (plus Ration money allowance, Uniform allowance, Risk & Hardship allowance for borders)',
    vacanciesCount: 4187,
    jobSummarySimple: 'Direct recruitment as Sub-Inspector (SI - Two Stars on shoulders) in Delhi Police or Central Armed Police Forces (BSF at borders, CISF at airports/industrial units, CRPF for internal security, ITBP at high altitudes, SSB at open borders).',
    dayInTheLife: 'Leading police station investigation teams, filing FIRs and charge-sheets, maintaining airport or metro security, tactical border patrolling, anti-insurgency operations.',
    careerGrowthPlain: 'Sub-Inspector -> Inspector -> Assistant Commissioner of Police (ACP) / Deputy Commandant -> Additional DCP / Commandant -> Superintendent of Police (IPS induction).',
    requirements: {
      minAge: 20,
      maxAgeGeneral: 25,
      ageCutOffDate: '2026-08-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 0, // Uniformed police force: PwD is not applicable
      relaxationExServicemen: 3,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)"
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Law & Legal Studies'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['For Delhi Police Sub-Inspector: Male candidates must possess a valid Driving License for LMV (Motorcycle and Car) on the date of Physical Endurance Test. Physical Standards: Male height min 170 cm (chest 80-85 cm); Female height min 157 cm. Physical Endurance Test includes 1600m race, 100m sprint, long jump, high jump, and shot put.']
    },
    applicationStartDate: '2026-03-04',
    applicationEndDate: '2026-03-28',
    tentativeExamDate: '2026-05-09',
    examPatternSummary: 'Paper 1 (Computer Based Test) -> Physical Standard Test (PST) & Physical Endurance Test (PET) -> Paper 2 (English Comprehension) -> Detailed Medical Examination (DME)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Paper-1 Online Exam',
        mode: 'Computer Based Test',
        description: '200 questions in 2 hours: Reasoning (50 Q), General Knowledge (50 Q), Quantitative Aptitude (50 Q), English (50 Q).',
        weightage: 'Counted in final merit'
      },
      {
        stageNumber: 2,
        title: 'Physical Endurance Test (PET) & PST',
        mode: 'Physical Test',
        description: 'For Males: 1600m run in 6.5 mins, 100m sprint in 16 sec, Long Jump 3.65m, High Jump 1.2m, Shot Put 4.5m. For Females: 800m run in 4 mins, 100m in 18 sec, Long Jump 2.7m, High Jump 0.9m.',
        weightage: 'Qualifying'
      },
      {
        stageNumber: 3,
        title: 'Paper-2 English Language & Comprehension',
        mode: 'Computer Based Test',
        description: '200 questions in 2 hours testing English grammar, comprehension, vocabulary, and active/passive voice.',
        weightage: 'Counted in final merit (Paper 1 + Paper 2 = 400 marks total)'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Physical Endurance Preparation',
        importance: 'High',
        keyTopics: ['1600 meter running stamina', 'Long jump technique', 'Cardiovascular fitness'],
        plainAdvice: 'Start running 3 km every morning right from the day you fill out the application form.'
      },
      {
        subject: 'English Language & Comprehension (Paper 2)',
        importance: 'High',
        keyTopics: ['Grammar rules', 'Direct & Indirect Speech', 'Reading Passages'],
        plainAdvice: 'Paper 2 carries 200 marks; scoring 170+ ensures selection in prestigious Delhi Police.'
      }
    ],
    isPopular: true
  },
  {
    id: 'afcat-exam',
    name: 'Air Force Common Admission Test (AFCAT)',
    shortName: 'AFCAT (Indian Air Force Flying & Ground Officer)',
    conductingBody: 'Indian Air Force (IAF)',
    conductingBodyWebsite: 'https://afcat.cdac.in',
    officialNotificationUrl: 'https://afcat.cdac.in/AFCAT',
    applicationPortalUrl: 'https://afcat.cdac.in',
    sector: 'Defense & Armed Forces',
    payGroup: 'Group A (Gazetted)',
    payLevel7thCPC: 'Level 10 (Flying Officer - ₹56,100 basic + Flying Allowance ₹25,000 for pilots + MSP ₹15,500)',
    approxInHandMonthlySalary: '₹1,05,000 - ₹1,30,000 / month (plus IAF Mess, Flying Club, Adventure Training)',
    vacanciesCount: 317,
    jobSummarySimple: 'Commissioned Officer entry into Indian Air Force. Options include Flying Branch (Fighter, Transport, and Helicopter Pilots), Ground Duty Technical (Aeronautical Engineers maintaining Su-30MKI, Rafale, Tejas jets), and Ground Duty Non-Technical (Air Traffic Control, Logistics, Accounts, Education).',
    dayInTheLife: 'Flying combat aircraft sorties, controlling airspace traffic on radar, troubleshooting avionics and radar arrays, maintaining precision missiles, or commanding IAF air bases.',
    careerGrowthPlain: 'Flying Officer -> Flight Lieutenant -> Squadron Leader -> Wing Commander -> Group Captain (Station Commander) -> Air Commodore -> Air Vice Marshal -> Air Marshal -> Air Chief Marshal (Chief of the Air Staff).',
    requirements: {
      minAge: 20,
      maxAgeGeneral: 24, // 20 to 24 for Flying Branch; 20 to 26 for Ground Duty
      ageCutOffDate: '2026-07-01',
      relaxationOBC: 0,
      relaxationSCST: 0,
      relaxationPwD: 0,
      relaxationExServicemen: 0,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)"
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Computer Science / IT',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Commerce, Economics & Finance'
      ],
      allowedFinalYearAppearing: true,
      finalYearCutOffDate: '2026-06-30',
      minGraduationPercentage: 60, // Mandatory 60% in graduation!
      requiresTwelfthMath: true, // For Flying Branch: 50% in Math & Physics at 10+2
      requiresScienceStream: false,
      genderEligibility: 'All', // Open to both Men and Women
      specialRequirements: ['For Flying Branch: Minimum 50% marks each in Maths and Physics at 10+2 level AND minimum 60% in Graduation / B.Tech. Age limit 20-24 years. Must pass CPSS (Computerized Pilot Selection System) once in a lifetime. For Ground Duty Non-Tech: Any Graduate with 60%, age 20-26.']
    },
    applicationStartDate: '2026-06-01',
    applicationEndDate: '2026-06-30',
    tentativeExamDate: '2026-08-23',
    examPatternSummary: 'AFCAT Online Exam (100 Q, 300 Marks, 2 Hours) -> 5-Day Air Force Selection Board (AFSB Interview) -> CPSS Test (for Pilots) -> Medical Examination',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'AFCAT Online Examination',
        mode: 'Computer Based Test',
        description: '100 questions (300 marks): General Awareness, Verbal Ability in English, Numerical Ability, Reasoning and Military Aptitude. No sectional timing.',
        weightage: 'Shortlisting for AFSB'
      },
      {
        stageNumber: 2,
        title: '5-Day AFSB Testing (Dehradun/Mysuru/Gandhinagar/Varanasi)',
        mode: 'Interview',
        description: 'Stage I: Screening (OIR + PPDT). Stage II: Psychological Tests, Group Tests (GTO indoor and outdoor), Personal Interview. CPSS for Flying candidates.',
        weightage: 'Final merit combines AFCAT + AFSB'
      },
      {
        stageNumber: 3,
        title: 'Aviation Medical Examination',
        mode: 'Physical Test',
        description: 'Conducted at Institute of Aerospace Medicine (IAM Bengaluru) or AFCME New Delhi. Strict anthropometric measurements (sitting height, leg length) for cockpit ergonomics.',
        weightage: 'Qualifying'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Military Aptitude & Spatial Reasoning',
        importance: 'High',
        keyTopics: ['Spatial ability', 'Rotated figures', 'Embedded shapes', 'Analogy'],
        plainAdvice: 'AFCAT military aptitude is visual and pattern-based; practice 500 questions.'
      },
      {
        subject: 'Verbal Ability & General Awareness',
        importance: 'High',
        keyTopics: ['Aviation terms', 'Defence history', 'Geography & Science', 'Comprehension'],
        plainAdvice: 'Know the names of IAF fighter squadrons, bases, and missiles.'
      }
    ],
    isPopular: true
  },
  {
    id: 'state-psc-group-1',
    name: 'State Public Service Commission (Combined State Civil Services)',
    shortName: 'State PSC Group 1 (Deputy Collector & DSP)',
    conductingBody: 'State Public Service Commissions (UPPSC, BPSC, MPSC, TNPSC, APPSC, KPSC, etc.)',
    conductingBodyWebsite: 'https://uppsc.up.nic.in',
    officialNotificationUrl: 'https://uppsc.up.nic.in',
    applicationPortalUrl: 'https://uppsc.up.nic.in',
    sector: 'State Public Service Commissions',
    payGroup: 'Group A (Gazetted)',
    payLevel7thCPC: 'Level 10 (State Pay Matrix ₹56,100 - ₹1,77,500)',
    approxInHandMonthlySalary: '₹75,000 - ₹90,000 / month (plus Govt residence in home state)',
    vacanciesCount: 650,
    jobSummarySimple: 'The premier administrative examination of your state government. Selected officers serve as Deputy Collectors (SDM), Deputy Superintendents of Police (DySP / DSP), Commercial Tax Officers, Block Development Officers (BDO), and District Panchayati Raj Officers (DPRO).',
    dayInTheLife: 'Working in the revenue sub-division of your own state, supervising land records, conducting anti-encroachment drives, executing state welfare schemes, and coordinating municipal affairs.',
    careerGrowthPlain: 'Deputy Collector / SDM -> Additional District Magistrate (ADM) -> Induction into Indian Administrative Service (IAS) with presidential warrant -> District Collector.',
    requirements: {
      minAge: 21,
      maxAgeGeneral: 40, // Many State PSCs allow general candidates up to 35-40 years!
      ageCutOffDate: '2026-07-01',
      relaxationOBC: 3, // 5 years in several states like UP/Bihar
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 5,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)",
        'Doctorate (Ph.D)',
        'Professional Degree (CA/CS/Law/MBBS)'
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Humanities, Arts & Social Sciences',
        'Engineering & Technology',
        'Commerce, Economics & Finance',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Law & Legal Studies'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['Candidates from other states are treated as Unreserved (General) category candidates. Home state domicile candidates receive state reservation benefits. Knowledge of State Official Language and State History/Geography is essential.']
    },
    applicationStartDate: '2026-01-10',
    applicationEndDate: '2026-02-09',
    tentativeExamDate: '2026-04-18',
    examPatternSummary: 'Prelims (GS + CSAT) -> Mains (Descriptive Papers including dedicated State Special papers) -> Interview',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'State PSC Preliminary Exam',
        mode: 'Pen & Paper',
        description: 'General Studies Paper I (150 Q, 200 M) determines cut-off. Paper II (CSAT) requires 33% qualifying marks.',
        weightage: 'Qualifying'
      },
      {
        stageNumber: 2,
        title: 'State Civil Services Main Exam',
        mode: 'Pen & Paper',
        description: 'Written descriptive papers: Essay, General Studies 1-4, and dedicated State General Knowledge papers (State history, geography, economy, schemes).',
        weightage: '1500 marks'
      },
      {
        stageNumber: 3,
        title: 'State Personality Interview',
        mode: 'Interview',
        description: 'Interview assessing administrative suitability, leadership in grassroots rural and urban administration.',
        weightage: '100 marks'
      }
    ],
    syllabusOverview: [
      {
        subject: 'State History, Geography & Economy',
        importance: 'High',
        keyTopics: ['State-specific freedom fighters', 'Rivers & agriculture of the state', 'State Budget and Industrial policies', 'Local dialects and cultural heritage'],
        plainAdvice: 'Dedicated state GK books give 30-40 extra marks in both Prelims and Mains.'
      }
    ],
    isPopular: true
  },
  {
    id: 'ssc-je',
    name: 'SSC Junior Engineer (JE) Examination (Civil, Electrical, Mechanical)',
    shortName: 'SSC JE (Central Government Junior Engineer)',
    conductingBody: 'Staff Selection Commission (SSC)',
    conductingBodyWebsite: 'https://ssc.gov.in',
    officialNotificationUrl: 'https://ssc.gov.in',
    applicationPortalUrl: 'https://ssc.gov.in',
    sector: 'Engineering & Scientific (ISRO, DRDO, ESE)',
    payGroup: 'Group B (Non-Gazetted)',
    payLevel7thCPC: 'Level 6 (₹35,400 - ₹1,12,400)',
    approxInHandMonthlySalary: '₹52,000 - ₹62,000 / month (plus Engineering field allowances)',
    vacanciesCount: 1324,
    jobSummarySimple: 'Direct recruitment for Diploma and B.Tech engineering graduates in prime central engineering bodies: Central Public Works Department (CPWD), Military Engineer Services (MES), Border Roads Organisation (BRO), and Central Water Commission (CWC).',
    dayInTheLife: 'Supervising highway construction, inspecting government building foundations, reviewing electrical grids and substations, preparing contractor estimates and quality audit reports.',
    careerGrowthPlain: 'Junior Engineer (JE) -> Assistant Engineer (AE) -> Executive Engineer (EE) -> Superintending Engineer (SE) -> Chief Engineer (CE).',
    requirements: {
      minAge: 18,
      maxAgeGeneral: 30, // 32 in CPWD
      ageCutOffDate: '2026-08-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 3,
      acceptedQualifications: [
        'Diploma (Engineering/Technical)',
        "Bachelor's Degree (Graduation)"
      ],
      acceptedStreamCategories: [
        'Engineering & Technology'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 0,
      genderEligibility: 'All', // Note: Border Roads Organisation (BRO) is for male candidates only
      specialRequirements: ['Degree in Civil/Electrical/Mechanical Engineering OR 3-Year Diploma in Civil/Electrical/Mechanical Engineering. In MES and BRO, Diploma holders require 2 years of relevant engineering experience; Degree holders do not need experience.']
    },
    applicationStartDate: '2026-03-28',
    applicationEndDate: '2026-04-18',
    tentativeExamDate: '2026-06-05',
    examPatternSummary: 'Paper 1 (CBT - General Intelligence, GK & Engineering Core) -> Paper 2 (CBT - Detailed Engineering Domain)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Paper-1 Computer Based Exam',
        mode: 'Computer Based Test',
        description: '200 questions in 2 hours: Reasoning (50 Q), General Awareness (50 Q), Engineering Domain (Civil/Elec/Mech - 100 Q).',
        weightage: '200 marks (counted for merit)'
      },
      {
        stageNumber: 2,
        title: 'Paper-2 Computer Based Engineering Exam',
        mode: 'Computer Based Test',
        description: '100 in-depth core engineering questions for 300 marks in 2 hours with calculator allowed on screen.',
        weightage: '300 marks (Paper 1 + Paper 2 = 500 marks total)'
      }
    ],
    syllabusOverview: [
      {
        subject: 'Engineering Core (Civil / Electrical / Mechanical)',
        importance: 'High',
        keyTopics: ['Building Materials & Surveying (Civil)', 'Machines & Circuit Law (Electrical)', 'Theory of Machines & Fluid Mechanics (Mechanical)'],
        plainAdvice: 'Revise Diploma standard technical formulas and standard IS codes.'
      }
    ],
    isPopular: false
  },
  {
    id: 'ssc-mts',
    name: 'SSC Multi-Tasking (Non-Technical) Staff & Havaldar Examination',
    shortName: 'SSC MTS & Havaldar (10th Pass Central Govt Entry)',
    conductingBody: 'Staff Selection Commission (SSC)',
    conductingBodyWebsite: 'https://ssc.gov.in',
    officialNotificationUrl: 'https://ssc.gov.in',
    applicationPortalUrl: 'https://ssc.gov.in',
    sector: 'Staff Selection (SSC Central)',
    payGroup: 'Group C',
    payLevel7thCPC: 'Level 1 (₹18,000 - ₹56,900)',
    approxInHandMonthlySalary: '₹28,000 - ₹34,000 / month (Metro cities)',
    vacanciesCount: 9583,
    jobSummarySimple: 'The benchmark entry-level examination for candidates who have passed 10th standard. Recruits Multi-Tasking Staff in central ministries, departments, and Havaldar in Central Board of Indirect Taxes and Customs (CBIC) and Central Bureau of Narcotics (CBN).',
    dayInTheLife: 'Assisting in general office maintenance, photocopy and file delivery, computer record sorting, dispatching official letters, and physical security support for Havaldar.',
    careerGrowthPlain: 'MTS -> Lower Division Clerk (LDC through departmental quota exam) -> Assistant Section Officer.',
    requirements: {
      minAge: 18,
      maxAgeGeneral: 25, // 27 for some posts and Havaldar
      ageCutOffDate: '2026-08-01',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 10,
      relaxationExServicemen: 3,
      acceptedQualifications: [
        '10th Pass (Matriculation)',
        '12th Pass (Higher Secondary)',
        'Diploma (Engineering/Technical)',
        "Bachelor's Degree (Graduation)"
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Engineering & Technology'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['Candidate must have passed Matriculation (10th Class) Examination from a recognized board. For Havaldar posts: Walking test (1600m in 15 mins for male, 1km in 20 mins for female).']
    },
    applicationStartDate: '2026-05-07',
    applicationEndDate: '2026-06-06',
    tentativeExamDate: '2026-07-28',
    examPatternSummary: 'Computer Based Examination in 13 regional languages + Physical Test only for Havaldar',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Computer Based Examination (Session I & II)',
        mode: 'Computer Based Test',
        description: 'Session I: Numerical Math & Reasoning (40 Q, no negative marking, qualifying). Session II: General Awareness & English (50 Q, 150 marks, with negative marking).',
        weightage: 'Final merit decided SOLELY by Session II marks'
      }
    ],
    syllabusOverview: [
      {
        subject: 'General Awareness (Session II)',
        importance: 'High',
        keyTopics: ['Social Studies (History, Geography, Art and Culture, Civics, Economics)', 'General Science', 'Environmental studies up to 10th standard'],
        plainAdvice: 'Since Session II alone decides your rank, General Awareness and English must be studied meticulously.'
      }
    ],
    isPopular: false
  },
  {
    id: 'ib-acio',
    name: 'Intelligence Bureau Assistant Central Intelligence Officer (IB ACIO Grade-II/Exe)',
    shortName: 'IB ACIO (Intelligence Bureau Officer)',
    conductingBody: 'Ministry of Home Affairs (MHA)',
    conductingBodyWebsite: 'https://mha.gov.in',
    officialNotificationUrl: 'https://mha.gov.in/en/notifications/vacancies',
    applicationPortalUrl: 'https://cdn.digialm.com',
    sector: 'Police & Paramilitary (CAPF)',
    payGroup: 'Group C',
    payLevel7thCPC: 'Level 7 (₹44,900 - ₹1,42,400 + Special Security Allowance 20%)',
    approxInHandMonthlySalary: '₹76,000 - ₹88,000 / month (including 20% Special Security Allowance)',
    vacanciesCount: 995,
    jobSummarySimple: 'India’s domestic intelligence agency officer. You collect actionable intelligence on national security, counter-terrorism, border security, espionage, and cyber threats, coordinating directly with state and central intelligence bureaus.',
    dayInTheLife: 'Covert field intelligence gathering, monitoring suspicious networks, source development, threat assessment analysis, and coordinating security for VVIPs.',
    careerGrowthPlain: 'ACIO-II -> ACIO-I -> Deputy Central Intelligence Officer (DCIO) -> Assistant Director (AD) -> Joint Director (JD) -> Special Director.',
    requirements: {
      minAge: 18,
      maxAgeGeneral: 27,
      ageCutOffDate: '2026-01-15',
      relaxationOBC: 3,
      relaxationSCST: 5,
      relaxationPwD: 0, // Not eligible for field operational executive posts
      relaxationExServicemen: 3,
      acceptedQualifications: [
        "Bachelor's Degree (Graduation)",
        "Master's Degree (Post Graduation)"
      ],
      acceptedStreamCategories: [
        'All Streams / Any Graduate',
        'Engineering & Technology',
        'Computer Science / IT',
        'Pure Science (Physics, Chemistry, Math, Biology)',
        'Commerce, Economics & Finance',
        'Humanities, Arts & Social Sciences',
        'Law & Legal Studies'
      ],
      allowedFinalYearAppearing: false,
      minGraduationPercentage: 0,
      genderEligibility: 'All',
      specialRequirements: ['Knowledge of computers is desirable. All-India service liability (candidate must be ready to serve in any remote border or sensitive station in India).']
    },
    applicationStartDate: '2026-01-02',
    applicationEndDate: '2026-01-25',
    tentativeExamDate: '2026-03-15',
    examPatternSummary: 'Tier 1 (100 Q, 1 Hour CBT) -> Tier 2 (Descriptive English Paper 50 M) -> Tier 3 (Interview & Psychometric Evaluation 100 M)',
    selectionStages: [
      {
        stageNumber: 1,
        title: 'Tier-1 Online Examination',
        mode: 'Computer Based Test',
        description: '100 MCQs in 1 hour: Current Affairs (20 Q), General Studies (20 Q), Numerical Aptitude (20 Q), Reasoning (20 Q), English (20 Q). Negative 0.25.',
        weightage: 'Shortlists 10x candidates'
      },
      {
        stageNumber: 2,
        title: 'Tier-2 Descriptive Written Test',
        mode: 'Pen & Paper',
        description: 'Essay on security, counter-terror, or national unity (30 marks) + English Comprehension and Precis writing (20 marks). Total 50 marks in 1 hour.',
        weightage: 'Counted in final merit'
      },
      {
        stageNumber: 3,
        title: 'Tier-3 Interview & Personality Test',
        mode: 'Interview',
        description: 'Interview testing mental alertness, patriotism, crisis management, and psychometric aptitude.',
        weightage: '100 marks'
      }
    ],
    syllabusOverview: [
      {
        subject: 'National Security & Current Geopolitics',
        importance: 'High',
        keyTopics: ['Cyber warfare', 'Internal security challenges in J&K, Northeast, and LWE regions', 'Neighbourhood relations (China, Pakistan)'],
        plainAdvice: 'Focus on internal security challenges and international relations.'
      }
    ],
    isPopular: true
  }
];
