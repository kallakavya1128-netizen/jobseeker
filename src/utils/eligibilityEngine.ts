import { UserProfile, ExamOpportunity, DetailedEligibilityResult } from '../types';

/**
 * Calculates exact age in years and months at a given target cut-off date.
 */
export function calculateAgeAtDate(birthDateStr: string, cutOffDateStr: string): { years: number; months: number; totalMonths: number } {
  const birthDate = new Date(birthDateStr);
  const cutOffDate = new Date(cutOffDateStr);

  if (isNaN(birthDate.getTime()) || isNaN(cutOffDate.getTime())) {
    return { years: 22, months: 0, totalMonths: 264 };
  }

  let years = cutOffDate.getFullYear() - birthDate.getFullYear();
  let months = cutOffDate.getMonth() - birthDate.getMonth();

  if (cutOffDate.getDate() < birthDate.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    totalMonths: years * 12 + months
  };
}

/**
 * Normalizes user score to percentage.
 */
export function getUserGraduationPercentage(profile: UserProfile): number {
  if (profile.education.percentageOrCGPA === 'Percentage') {
    return profile.education.graduationScore || 0;
  }
  // Standard AICTE / CBSE conversion formula: CGPA * 9.5
  return Math.min(100, Math.round((profile.education.graduationScore || 0) * 9.5 * 10) / 10);
}

/**
 * Hierarchy ranking for qualification level.
 */
const QUALIFICATION_RANK: Record<string, number> = {
  '10th Pass (Matriculation)': 1,
  '12th Pass (Higher Secondary)': 2,
  'Diploma (Engineering/Technical)': 3,
  "Bachelor's Degree (Graduation)": 4,
  "Master's Degree (Post Graduation)": 5,
  'Doctorate (Ph.D)': 6,
  'Professional Degree (CA/CS/Law/MBBS)': 5
};

export function evaluateEligibility(
  profile: UserProfile,
  exam: ExamOpportunity
): DetailedEligibilityResult {
  const { requirements } = exam;
  const actionableAdvice: string[] = [];
  const unmetCriteria: string[] = [];

  // 1. Calculate Age & Category Relaxations
  const userAge = calculateAgeAtDate(profile.personal.dateOfBirth, requirements.ageCutOffDate);
  let relaxation = 0;

  if (profile.eligibility.category === 'OBC-NCL') {
    relaxation = Math.max(relaxation, requirements.relaxationOBC);
  } else if (profile.eligibility.category === 'SC' || profile.eligibility.category === 'ST') {
    relaxation = Math.max(relaxation, requirements.relaxationSCST);
  }

  // PwD relaxation (usually 10 years, often cumulative)
  if (profile.eligibility.isPwD && requirements.relaxationPwD > 0) {
    relaxation += requirements.relaxationPwD;
  }

  // Ex-servicemen relaxation
  if (profile.eligibility.isExServiceman && requirements.relaxationExServicemen > 0) {
    relaxation += (profile.eligibility.exServicemenYearsOfService || 0) + requirements.relaxationExServicemen;
  }

  const effectiveMaxAge = requirements.maxAgeGeneral + relaxation;
  const isAgeMinPass = userAge.years >= requirements.minAge;
  const isAgeMaxPass = userAge.years < effectiveMaxAge || (userAge.years === effectiveMaxAge && userAge.months === 0);
  const isAgePass = isAgeMinPass && isAgeMaxPass;

  let ageReason = '';
  if (isAgePass) {
    ageReason = `You are ${userAge.years}y ${userAge.months}m old at cut-off date (${requirements.ageCutOffDate}). Eligible range for your category (${profile.eligibility.category}) is ${requirements.minAge} to ${effectiveMaxAge} years.`;
  } else if (!isAgeMinPass) {
    ageReason = `You are ${userAge.years}y ${userAge.months}m old. The minimum age requirement is ${requirements.minAge} years. You will be eligible in future cycles.`;
    unmetCriteria.push(`Minimum age not met (Current: ${userAge.years}, Required: ${requirements.minAge})`);
  } else {
    ageReason = `Your age is ${userAge.years}y ${userAge.months}m, which exceeds the upper age limit of ${effectiveMaxAge} years (including +${relaxation} years relaxation for ${profile.eligibility.category}).`;
    unmetCriteria.push(`Exceeded maximum age limit of ${effectiveMaxAge} years`);
  }

  // 2. Qualification & Stream Evaluation
  const userQualRank = QUALIFICATION_RANK[profile.education.highestQualification] || 0;
  const minRequiredRank = Math.min(
    ...requirements.acceptedQualifications.map(q => QUALIFICATION_RANK[q] || 0)
  );

  const hasHigherOrEqualQual = userQualRank >= minRequiredRank;

  // Stream compatibility
  const acceptsAnyStream = requirements.acceptedStreamCategories.includes('All Streams / Any Graduate');
  const userStreamMatch = requirements.acceptedStreamCategories.includes(profile.education.streamCategory);
  const isStreamPass = acceptsAnyStream || userStreamMatch;

  let qualReason = '';
  const isQualPass = hasHigherOrEqualQual && isStreamPass;

  if (isQualPass) {
    qualReason = `Your qualification (${profile.education.highestQualification} - ${profile.education.branchOrStream}) fully satisfies the academic requirement.`;
  } else if (!hasHigherOrEqualQual) {
    qualReason = `Requires at least ${requirements.acceptedQualifications[0]}, while your recorded highest qualification is ${profile.education.highestQualification}.`;
    unmetCriteria.push(`Qualification level below minimum standard`);
  } else {
    qualReason = `Notification requires degree in: ${requirements.acceptedStreamCategories.join(', ')}. Your stream is ${profile.education.streamCategory}.`;
    unmetCriteria.push(`Educational stream mismatch`);
  }

  // 3. Score Percentage / CGPA Check
  const userPercent = getUserGraduationPercentage(profile);
  let minGradReq = requirements.minGraduationPercentage || 0;

  if (
    (profile.eligibility.category === 'SC' || profile.eligibility.category === 'ST' || profile.eligibility.isPwD) &&
    requirements.minGraduationPercentageReserved !== undefined
  ) {
    minGradReq = requirements.minGraduationPercentageReserved;
  }

  let isGradScorePass = userPercent >= minGradReq;
  let isTenthScorePass = true;
  let isTwelfthScorePass = true;

  if (requirements.minTenthPercentage && profile.education.tenthPercentage < requirements.minTenthPercentage) {
    isTenthScorePass = false;
  }
  if (requirements.minTwelfthPercentage && profile.education.twelfthPercentage < requirements.minTwelfthPercentage) {
    isTwelfthScorePass = false;
  }

  const isScorePass = isGradScorePass && isTenthScorePass && isTwelfthScorePass;
  let scoreReason = '';

  if (isScorePass) {
    scoreReason = minGradReq > 0
      ? `Your calculated graduation percentage (${userPercent}%) satisfies the minimum threshold of ${minGradReq}%.`
      : 'No minimum percentage required; a passing grade in your degree is sufficient.';
  } else {
    const scoreFailures: string[] = [];
    if (!isGradScorePass) scoreFailures.push(`Graduation (${userPercent}% < ${minGradReq}%)`);
    if (!isTenthScorePass) scoreFailures.push(`10th (${profile.education.tenthPercentage}% < ${requirements.minTenthPercentage}%)`);
    if (!isTwelfthScorePass) scoreFailures.push(`12th (${profile.education.twelfthPercentage}% < ${requirements.minTwelfthPercentage}%)`);
    scoreReason = `Failed score threshold: ${scoreFailures.join(', ')}.`;
    unmetCriteria.push(`Academic percentage cut-off not met: ${scoreFailures.join(', ')}`);
  }

  // 4. Final Year Appearing Check
  let isFinalYearPass = true;
  let finalYearReason = '';

  if (profile.education.graduationStatus === 'Final Year / Appearing') {
    if (requirements.allowedFinalYearAppearing) {
      finalYearReason = `Final-year appearing students are welcome to apply! You must furnish your final marksheet/degree certificate before ${requirements.finalYearCutOffDate || 'interview/document verification'}.`;
      actionableAdvice.push(`Ensure your college semester results are declared prior to ${requirements.finalYearCutOffDate || 'document verification'}.`);
    } else {
      isFinalYearPass = false;
      finalYearReason = `This recruitment commission strictly requires candidates to hold completed degree marksheets on or before the application deadline.`;
      unmetCriteria.push(`Final-year appearing candidates not eligible in this current cycle`);
    }
  } else if (profile.education.graduationStatus === 'Pre-final Year') {
    isFinalYearPass = false;
    finalYearReason = 'Pre-final year students cannot apply for this examination cycle. Focus on foundational preparation.';
    unmetCriteria.push('Currently in pre-final year of study');
  } else {
    finalYearReason = 'Degree completed. You have full educational clearance.';
  }

  // 5. Special Requirements (Gender, PwD exemption, Typing, etc.)
  let isSpecialPass = true;
  let specialReason = 'All specific conditions satisfied.';

  // Gender check
  if (requirements.genderEligibility === 'Male Only' && profile.personal.gender !== 'Male') {
    isSpecialPass = false;
    unmetCriteria.push('Post is restricted to Male candidates only');
  } else if (requirements.genderEligibility === 'Female Only' && profile.personal.gender !== 'Female') {
    isSpecialPass = false;
    unmetCriteria.push('Post is restricted to Female candidates only');
  }

  // Uniformed police / defense PwD check
  if (profile.eligibility.isPwD && requirements.relaxationPwD === 0 && (exam.sector === 'Police & Paramilitary (CAPF)' || exam.sector === 'Defense & Armed Forces')) {
    isSpecialPass = false;
    unmetCriteria.push('PwD reservation is not applicable for combat & uniformed enforcement branches under Ministry of Home Affairs / Defence guidelines.');
  }

  // Driving license requirement
  if (exam.id === 'ssc-cpo' && !profile.eligibility.hasDrivingLicenseLMV) {
    actionableAdvice.push('For Delhi Police SI, get a valid 2-wheeler/4-wheeler driving license before the Physical Test.');
  }

  // Typing speed requirement
  if ((exam.id === 'ssc-chsl' || exam.id === 'sbi-clerk') && profile.eligibility.typingProficiencyEnglishWPM < 35 && profile.eligibility.typingProficiencyHindiWPM < 30) {
    actionableAdvice.push('Start 20 minutes daily typing practice to reach 35 words-per-minute for Tier-2 typing test.');
  }

  // Determine final verdict
  let verdict: 'Eligible' | 'Eligible with Conditions' | 'Not Eligible' = 'Eligible';
  let verdictSummary = '';

  const hardFailures = !isAgePass || !isQualPass || !isScorePass || (!isFinalYearPass && profile.education.graduationStatus === 'Pre-final Year');

  if (hardFailures) {
    verdict = 'Not Eligible';
    verdictSummary = unmetCriteria.join('. ') + '.';
  } else if (!isFinalYearPass || unmetCriteria.length > 0 || actionableAdvice.length > 0) {
    verdict = 'Eligible with Conditions';
    verdictSummary = profile.education.graduationStatus === 'Final Year / Appearing'
      ? 'Eligible to appear for Prelims! Must obtain degree certificate before document verification.'
      : 'Eligible, subject to fulfilling specific document or skill conditions.';
  } else {
    verdict = 'Eligible';
    verdictSummary = 'You satisfy 100% of official age, qualification, category, and score criteria.';
  }

  // Score percentage calculation for recommendation sort
  let scorePercentage = 0;
  if (isAgePass) scorePercentage += 30;
  if (isQualPass) scorePercentage += 35;
  if (isScorePass) scorePercentage += 20;
  if (isFinalYearPass) scorePercentage += 10;
  if (isSpecialPass) scorePercentage += 5;

  return {
    isEligible: verdict !== 'Not Eligible',
    verdict,
    verdictSummary,
    scorePercentage,
    ageCheck: {
      userAgeAtCutoff: userAge.years,
      userMaxAllowedAge: effectiveMaxAge,
      isPass: isAgePass,
      relaxationApplied: relaxation,
      plainReason: ageReason
    },
    qualificationCheck: {
      isPass: isQualPass,
      plainReason: qualReason
    },
    scorePercentageCheck: {
      isPass: isScorePass,
      plainReason: scoreReason
    },
    finalYearCheck: {
      isPass: isFinalYearPass,
      plainReason: finalYearReason
    },
    specialRequirementsCheck: {
      isPass: isSpecialPass,
      plainReason: specialReason,
      unmetCriteria
    },
    actionableStudentAdvice: actionableAdvice
  };
}
