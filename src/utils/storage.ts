import { UserProfile, TrackedExam } from '../types';

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: 'demo-rohit-btech',
    personal: {
      fullName: 'Rohit Sharma',
      email: 'rohit.aspirant2026@gmail.com',
      phone: '+91 98765 43210',
      dateOfBirth: '2004-03-15',
      gender: 'Male',
      nationality: 'Citizen of India',
      state: 'Uttar Pradesh',
      district: 'Noida / Gautam Buddha Nagar',
      preferredWorkLocations: ['Pan-India', 'Delhi (NCT)', 'Home State']
    },
    education: {
      highestQualification: "Bachelor's Degree (Graduation)",
      degreeName: 'B.Tech in Computer Science & Engineering',
      branchOrStream: 'Computer Science & Engineering',
      streamCategory: 'Computer Science / IT',
      collegeOrUniversity: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
      graduationStatus: 'Completed',
      graduationYear: 2025,
      percentageOrCGPA: 'CGPA',
      graduationScore: 8.1,
      tenthPercentage: 88.4,
      twelfthPercentage: 84.6,
      twelfthStream: 'Science with Math',
      hasDiploma: false
    },
    eligibility: {
      category: 'OBC-NCL',
      isPwD: false,
      isExServiceman: false,
      workExperienceYears: 1,
      experienceSector: 'Private Sector',
      experienceRole: 'Associate Software Trainee',
      hasNCCCertificate: false,
      hasSportsQuota: false,
      typingProficiencyEnglishWPM: 42,
      typingProficiencyHindiWPM: 0,
      hasDrivingLicenseLMV: true,
      hasDomicileCertificate: true
    },
    privacyMode: false,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-09-28T07:00:00.000Z'
  },
  {
    id: 'demo-ananya-bcom',
    personal: {
      fullName: 'Ananya Iyer',
      email: 'ananya.iyer.grad@gmail.com',
      phone: '+91 94450 12345',
      dateOfBirth: '2005-02-18',
      gender: 'Female',
      nationality: 'Citizen of India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      preferredWorkLocations: ['Home State', 'South Zone', 'Pan-India']
    },
    education: {
      highestQualification: "Bachelor's Degree (Graduation)",
      degreeName: 'Bachelor of Commerce (B.Com Honours)',
      branchOrStream: 'Accounting & Finance',
      streamCategory: 'Commerce, Economics & Finance',
      collegeOrUniversity: 'University of Madras',
      graduationStatus: 'Final Year / Appearing',
      graduationYear: 2026,
      percentageOrCGPA: 'Percentage',
      graduationScore: 72.5,
      tenthPercentage: 91.2,
      twelfthPercentage: 89.0,
      twelfthStream: 'Commerce',
      hasDiploma: false
    },
    eligibility: {
      category: 'EWS',
      isPwD: false,
      isExServiceman: false,
      workExperienceYears: 0,
      experienceSector: 'None',
      hasNCCCertificate: true,
      nccCertificateType: 'B',
      hasSportsQuota: false,
      typingProficiencyEnglishWPM: 38,
      typingProficiencyHindiWPM: 0,
      hasDrivingLicenseLMV: false,
      hasDomicileCertificate: true
    },
    privacyMode: false,
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: '2026-09-28T07:00:00.000Z'
  },
  {
    id: 'demo-vikram-12th',
    personal: {
      fullName: 'Vikram Singh Rathore',
      email: 'vikram.singh.defence@gmail.com',
      phone: '+91 97820 67890',
      dateOfBirth: '2007-08-20',
      gender: 'Male',
      nationality: 'Citizen of India',
      state: 'Rajasthan',
      district: 'Jaipur',
      preferredWorkLocations: ['Pan-India', 'Northern Region']
    },
    education: {
      highestQualification: '12th Pass (Higher Secondary)',
      degreeName: 'Senior Secondary (12th CBSE)',
      branchOrStream: 'Physics, Chemistry, Mathematics',
      streamCategory: 'Pure Science (Physics, Chemistry, Math, Biology)',
      collegeOrUniversity: 'Kendriya Vidyalaya No. 1 Jaipur',
      graduationStatus: 'Completed',
      graduationYear: 2025,
      percentageOrCGPA: 'Percentage',
      graduationScore: 86.4,
      tenthPercentage: 89.0,
      twelfthPercentage: 86.4,
      twelfthStream: 'Science with Math',
      hasDiploma: false
    },
    eligibility: {
      category: 'UR',
      isPwD: false,
      isExServiceman: false,
      workExperienceYears: 0,
      experienceSector: 'None',
      hasNCCCertificate: true,
      nccCertificateType: 'C',
      hasSportsQuota: true,
      sportsLevel: 'State',
      typingProficiencyEnglishWPM: 25,
      typingProficiencyHindiWPM: 0,
      hasDrivingLicenseLMV: false,
      hasDomicileCertificate: true
    },
    privacyMode: false,
    createdAt: '2026-03-01T10:00:00.000Z',
    updatedAt: '2026-09-28T07:00:00.000Z'
  },
  {
    id: 'demo-pooja-diploma',
    personal: {
      fullName: 'Pooja Patel',
      email: 'pooja.patel.civil@gmail.com',
      phone: '+91 98250 88990',
      dateOfBirth: '2003-05-10',
      gender: 'Female',
      nationality: 'Citizen of India',
      state: 'Gujarat',
      district: 'Ahmedabad',
      preferredWorkLocations: ['Home State', 'Western Region', 'Pan-India']
    },
    education: {
      highestQualification: 'Diploma (Engineering/Technical)',
      degreeName: 'Diploma in Civil Engineering',
      branchOrStream: 'Civil Engineering',
      streamCategory: 'Engineering & Technology',
      collegeOrUniversity: 'Gujarat Technological University (GTU)',
      graduationStatus: 'Completed',
      graduationYear: 2024,
      percentageOrCGPA: 'Percentage',
      graduationScore: 74.0,
      tenthPercentage: 81.5,
      twelfthPercentage: 76.0,
      twelfthStream: 'Science with Math',
      hasDiploma: true,
      diplomaBranch: 'Civil Engineering',
      diplomaPercentage: 74.0
    },
    eligibility: {
      category: 'SC',
      isPwD: false,
      isExServiceman: false,
      workExperienceYears: 2,
      experienceSector: 'Private Sector',
      experienceRole: 'Junior Site Engineer',
      hasNCCCertificate: false,
      hasSportsQuota: false,
      typingProficiencyEnglishWPM: 30,
      typingProficiencyHindiWPM: 0,
      hasDrivingLicenseLMV: true,
      hasDomicileCertificate: true
    },
    privacyMode: false,
    createdAt: '2026-01-15T10:00:00.000Z',
    updatedAt: '2026-09-28T07:00:00.000Z'
  }
];

const PROFILE_KEY = 'gcn_user_profile';
const TRACKED_EXAMS_KEY = 'gcn_tracked_exams';
const ALL_ACCOUNTS_KEY = 'gcn_all_accounts';

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load profile from storage', e);
  }
  // Default to Rohit Sharma as standard demo candidate
  return DEMO_PROFILES[0];
}

export function saveProfile(profile: UserProfile): void {
  try {
    profile.updatedAt = new Date().toISOString();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    
    // Also save into all accounts list
    const accounts = getAllAccounts();
    const existingIndex = accounts.findIndex(a => a.id === profile.id);
    if (existingIndex >= 0) {
      accounts[existingIndex] = profile;
    } else {
      accounts.push(profile);
    }
    localStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save profile to storage', e);
  }
}

export function getAllAccounts(): UserProfile[] {
  try {
    const raw = localStorage.getItem(ALL_ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load accounts', e);
  }
  // Return demo profiles by default
  return DEMO_PROFILES;
}

export function switchAccount(profileId: string): UserProfile {
  const accounts = getAllAccounts();
  const found = accounts.find(a => a.id === profileId) || DEMO_PROFILES.find(d => d.id === profileId) || DEMO_PROFILES[0];
  saveProfile(found);
  return found;
}

export function getTrackedExams(): TrackedExam[] {
  try {
    const raw = localStorage.getItem(TRACKED_EXAMS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load tracked exams', e);
  }
  // Seed with 2 default tracked exams for rich initial experience
  const defaultTracked: TrackedExam[] = [
    {
      examId: 'upsc-cse',
      status: 'Interested',
      notes: 'Planning for next Prelims. Target optionals: History or PSIR.',
      targetExamYear: 2026,
      addedAt: '2026-02-15T08:00:00.000Z',
      updatedAt: '2026-02-15T08:00:00.000Z',
      documentsPrepared: {
        idProof: true,
        categoryCertificate: true,
        graduationCertificate: true,
        passportPhoto: true,
        signatureFile: true,
        domicileCertificate: true
      }
    },
    {
      examId: 'ssc-cgl',
      status: 'Applying Soon',
      notes: 'Applying for Assistant Section Officer (MEA) and Income Tax Inspector posts.',
      applicationNumber: 'SSC-2026-9812450',
      targetExamYear: 2026,
      addedAt: '2026-03-01T09:00:00.000Z',
      updatedAt: '2026-03-01T09:00:00.000Z',
      documentsPrepared: {
        idProof: true,
        categoryCertificate: true,
        graduationCertificate: true,
        passportPhoto: true,
        signatureFile: true,
        domicileCertificate: true
      }
    }
  ];
  return defaultTracked;
}

export function saveTrackedExam(tracked: TrackedExam): TrackedExam[] {
  const current = getTrackedExams();
  const index = current.findIndex(t => t.examId === tracked.examId);
  tracked.updatedAt = new Date().toISOString();
  if (index >= 0) {
    current[index] = tracked;
  } else {
    current.push(tracked);
  }
  try {
    localStorage.setItem(TRACKED_EXAMS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save tracked exam', e);
  }
  return current;
}

export function removeTrackedExam(examId: string): TrackedExam[] {
  const current = getTrackedExams().filter(t => t.examId !== examId);
  try {
    localStorage.setItem(TRACKED_EXAMS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to remove tracked exam', e);
  }
  return current;
}
