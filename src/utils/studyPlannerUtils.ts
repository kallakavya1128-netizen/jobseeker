import { ExamOpportunity, TrackedExam } from '../types';
import { EXAMS_DATA } from '../data/examsData';

export type RoutineStyle = 'early_bird' | 'daytime' | 'split_schedule' | 'night_owl';
export type FocusStrategy = 'balanced' | 'speed_drills' | 'deep_theory' | 'revision_mocks';

export interface StudySlot {
  id: string;
  startTime: string; // "06:30 AM"
  endTime: string; // "08:00 AM"
  start24: string; // "06:30"
  end24: string; // "08:00"
  durationMinutes: number;
  subject: string;
  topicAdvice: string;
  activityType: 'Concept' | 'Practice' | 'Revision' | 'Current Affairs' | 'Mock Test' | 'Break';
  applicableExams: string[];
  isCompleted: boolean;
  notes?: string;
}

export interface StudyPlanConfig {
  selectedExamIds: string[];
  dailyHoursTarget: number; // 2, 4, 6, 8, etc.
  routineStyle: RoutineStyle;
  focusStrategy: FocusStrategy;
}

export interface SyllabusSubjectInfo {
  subject: string;
  importance: 'High' | 'Medium' | 'Low';
  keyTopics: string[];
  plainAdvice: string;
  examNames: string[];
}

const STORAGE_CONFIG_KEY = 'gcn_study_plan_config';
const STORAGE_SLOTS_KEY = 'gcn_study_slots';
const STORAGE_DATE_KEY = 'gcn_study_plan_date';

/**
 * Get days remaining until an exam date (YYYY-MM-DD)
 */
export function getDaysRemaining(targetDateStr: string): number {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  } catch {
    return 60;
  }
}

/**
 * Format minutes into "Xh Ym" or "X hrs"
 */
export function formatMinutes(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  return `${mins} mins`;
}

/**
 * Helper to convert minutes from midnight to "HH:MM AM/PM" and "HH:MM" 24h
 */
function minutesToTime(totalMinutes: number): { display: string; time24: string } {
  const norm = ((totalMinutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(norm / 60);
  const m = norm % 60;
  const time24 = `${h24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const ampm = h24 < 12 ? 'AM' : 'PM';
  const display = `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  return { display, time24 };
}

/**
 * Check if a time slot is currently ongoing based on system clock
 */
export function isSlotActiveNow(start24: string, end24: string): boolean {
  try {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    
    const [sH, sM] = start24.split(':').map(Number);
    const [eH, eM] = end24.split(':').map(Number);
    const startMins = sH * 60 + sM;
    let endMins = eH * 60 + eM;
    
    // If slot spans past midnight
    if (endMins < startMins) {
      return currentMins >= startMins || currentMins < endMins;
    }
    
    return currentMins >= startMins && currentMins < endMins;
  } catch {
    return false;
  }
}

/**
 * Extract aggregated syllabus subjects with exam associations
 */
export function getAggregatedSyllabus(selectedExamIds: string[]): SyllabusSubjectInfo[] {
  const exams = EXAMS_DATA.filter(e => selectedExamIds.includes(e.id));
  const subjectMap = new Map<string, SyllabusSubjectInfo>();

  exams.forEach(exam => {
    exam.syllabusOverview.forEach(item => {
      // Normalize subject key
      const key = item.subject.trim();
      const existing = subjectMap.get(key);
      if (existing) {
        if (!existing.examNames.includes(exam.shortName)) {
          existing.examNames.push(exam.shortName);
        }
        item.keyTopics.forEach(t => {
          if (!existing.keyTopics.includes(t)) {
            existing.keyTopics.push(t);
          }
        });
      } else {
        subjectMap.set(key, {
          subject: item.subject,
          importance: item.importance,
          keyTopics: [...item.keyTopics],
          plainAdvice: item.plainAdvice,
          examNames: [exam.shortName]
        });
      }
    });
  });

  return Array.from(subjectMap.values());
}

/**
 * Default starter routine presets
 */
export function generateSmartStudySchedule(config: StudyPlanConfig): StudySlot[] {
  const { selectedExamIds, dailyHoursTarget, routineStyle, focusStrategy } = config;
  const exams = EXAMS_DATA.filter(e => selectedExamIds.includes(e.id));
  const examNames = exams.length > 0 ? exams.map(e => e.shortName) : ['All Competitive Exams'];

  const syllabusList = getAggregatedSyllabus(selectedExamIds);
  
  // Categorize syllabus subjects
  const mathReasoning = syllabusList.filter(s => 
    s.subject.toLowerCase().includes('math') || 
    s.subject.toLowerCase().includes('quant') || 
    s.subject.toLowerCase().includes('reasoning') ||
    s.subject.toLowerCase().includes('intelligence')
  );
  
  const gsAndCore = syllabusList.filter(s => 
    !mathReasoning.includes(s) && 
    !s.subject.toLowerCase().includes('current') &&
    !s.subject.toLowerCase().includes('english')
  );

  const currentAffairs = syllabusList.filter(s =>
    s.subject.toLowerCase().includes('current') ||
    s.subject.toLowerCase().includes('gk') ||
    s.subject.toLowerCase().includes('awareness')
  );

  const englishOrLang = syllabusList.filter(s =>
    s.subject.toLowerCase().includes('english') ||
    s.subject.toLowerCase().includes('comprehension')
  );

  // Fallbacks if list is empty
  const defaultGS = gsAndCore[0]?.subject || 'General Studies & Polity (M. Laxmikanth / NCERT)';
  const defaultGSTopics = gsAndCore[0]?.keyTopics.slice(0, 3).join(', ') || 'Constitutional Framework, Fundamental Rights & DPSP';
  const defaultMath = mathReasoning[0]?.subject || 'Quantitative Aptitude & Speed Math';
  const defaultMathTopics = mathReasoning[0]?.keyTopics.slice(0, 3).join(', ') || 'Percentages, Ratio & Proportion, Number Systems';
  const defaultCA = currentAffairs[0]?.subject || 'Current Affairs & Editorial Reading';
  const defaultCATopics = currentAffairs[0]?.keyTopics.slice(0, 3).join(', ') || 'The Hindu/Indian Express, Government Schemes & RBI Updates';
  const defaultEnglish = englishOrLang[0]?.subject || 'English Grammar & Vocabulary Drills';
  const defaultEnglishTopics = englishOrLang[0]?.keyTopics.slice(0, 3).join(', ') || 'Reading Comprehension, Error Spotting, Vocab Flashcards';

  // Determine starting minute from midnight based on routineStyle
  let startMinute = 390; // 06:30 AM
  if (routineStyle === 'early_bird') {
    startMinute = 360; // 06:00 AM
  } else if (routineStyle === 'daytime') {
    startMinute = 510; // 08:30 AM
  } else if (routineStyle === 'split_schedule') {
    startMinute = 390; // 06:30 AM morning session
  } else if (routineStyle === 'night_owl') {
    startMinute = 840; // 02:00 PM
  }

  const slots: StudySlot[] = [];
  let currentMinute = startMinute;

  const pushSlot = (
    durationMins: number,
    subject: string,
    topicAdvice: string,
    activityType: StudySlot['activityType'],
    applicable: string[],
    notes?: string
  ) => {
    const s = minutesToTime(currentMinute);
    const e = minutesToTime(currentMinute + durationMins);
    slots.push({
      id: `slot-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      startTime: s.display,
      endTime: e.display,
      start24: s.time24,
      end24: e.time24,
      durationMinutes: durationMins,
      subject,
      topicAdvice,
      activityType,
      applicableExams: applicable,
      isCompleted: false,
      notes
    });
    currentMinute += durationMins;
  };

  const pushBreak = (durationMins: number, label: string) => {
    const s = minutesToTime(currentMinute);
    const e = minutesToTime(currentMinute + durationMins);
    slots.push({
      id: `break-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      startTime: s.display,
      endTime: e.display,
      start24: s.time24,
      end24: e.time24,
      durationMinutes: durationMins,
      subject: label,
      topicAdvice: 'Hydrate, step away from screens, light stretch or eye rest.',
      activityType: 'Break',
      applicableExams: [],
      isCompleted: false
    });
    currentMinute += durationMins;
  };

  // Generate pattern based on hours target
  if (dailyHoursTarget <= 2) {
    // 2-hour high-impact plan
    if (routineStyle === 'split_schedule') {
      // 1 hr morning, 1 hr evening
      pushSlot(60, defaultCA, `Read national daily editorial + note 5 key current affairs events: ${defaultCATopics}`, 'Current Affairs', examNames, 'Highlight PIB press releases');
      // Evening jump
      currentMinute = 1170; // 07:30 PM
      pushSlot(60, defaultMath, `25 targeted speed math questions: ${defaultMathTopics}`, 'Practice', examNames, 'Use stopwatch timer (45 secs / question)');
    } else {
      pushSlot(60, defaultGS, `Conceptual textbook reading: ${defaultGSTopics}`, 'Concept', examNames, 'Summarize key points into 1 page notes');
      pushBreak(15, 'Quick Rejuvenation Break');
      pushSlot(60, defaultMath, `Solve 20 PYQ problems: ${defaultMathTopics}`, 'Practice', examNames, 'Analyze missed formulas');
    }
  } else if (dailyHoursTarget <= 4) {
    // 4-hour balanced plan
    if (routineStyle === 'split_schedule') {
      // 90m morning
      pushSlot(90, defaultGS, `Core static theory: ${defaultGSTopics}`, 'Concept', examNames, 'High focus deep work window');
      // Evening 150m (2.5 hrs)
      currentMinute = 1140; // 07:00 PM
      pushSlot(60, defaultMath, `Quantitative problem drills: ${defaultMathTopics}`, 'Practice', examNames);
      pushBreak(15, 'Evening Tea & Stretches');
      pushSlot(45, defaultCA, `Daily editorial & current events: ${defaultCATopics}`, 'Current Affairs', examNames);
      pushBreak(10, 'Eye Rest');
      pushSlot(45, defaultEnglish, `Grammar rules, idioms & PYQ comprehension: ${defaultEnglishTopics}`, 'Revision', examNames);
    } else {
      pushSlot(90, defaultGS, `Core Syllabus Deep Dive: ${defaultGSTopics}`, 'Concept', examNames, 'Deep work, phones on silent');
      pushBreak(20, 'Breakfast / Restorative Break');
      pushSlot(75, defaultMath, `Speed Arithmetic & Reasoning Puzzles: ${defaultMathTopics}`, 'Practice', examNames, 'Time-boxed problem drills');
      pushBreak(15, 'Short Walk & Water');
      pushSlot(45, defaultCA, `Newspaper analysis & PIB summary: ${defaultCATopics}`, 'Current Affairs', examNames);
      pushSlot(30, 'Active Recall & Formula Revision', 'Flashcards of tricky formulas, historical timelines, constitutional articles.', 'Revision', examNames);
    }
  } else if (dailyHoursTarget <= 6) {
    // 6-hour intensive plan
    pushSlot(105, defaultGS, `Morning Deep Work - Static Pillar: ${defaultGSTopics}`, 'Concept', examNames, 'Peak mental energy slot');
    pushBreak(25, 'Nutritious Breakfast & Sunlight');
    pushSlot(90, defaultMath, `Numerical & Analytical Reasoning Marathon: ${defaultMathTopics}`, 'Practice', examNames, 'Solve 40-50 real exam questions');
    pushBreak(30, 'Midday Break & Lunch');
    pushSlot(60, defaultCA, `Daily Newspaper & Monthly Current Affairs Magazine: ${defaultCATopics}`, 'Current Affairs', examNames);
    pushBreak(15, 'Power Refresh Break');
    pushSlot(60, defaultEnglish, `English Language Proficiency & Comprehension: ${defaultEnglishTopics}`, 'Practice', examNames);
    pushBreak(15, 'Evening Stretches');
    pushSlot(45, 'Active Recall & Topic Revision', 'Revise today notes using the Blurting method. Review errors made in math drills.', 'Revision', examNames);
  } else {
    // 8+ hour dedicated full-time aspirant blueprint
    pushSlot(120, defaultGS, `Block 1: Primary Syllabus Subject: ${defaultGSTopics}`, 'Concept', examNames, 'M. Laxmikanth / Spectrum / NCERT');
    pushBreak(30, 'Healthy Breakfast & Walk');
    pushSlot(120, defaultMath, `Block 2: High-Yield Quantitative & Reasoning: ${defaultMathTopics}`, 'Practice', examNames, 'Previous 5 Years Question Papers');
    pushBreak(45, 'Lunch & Rest (Power Nap)');
    pushSlot(75, defaultCA, `Block 3: Current Affairs, The Hindu & PIB Notes: ${defaultCATopics}`, 'Current Affairs', examNames);
    pushBreak(15, 'Hydration & Snack');
    pushSlot(90, defaultEnglish, `Block 4: Language, Static GK & Mock Sectional Test: ${defaultEnglishTopics}`, 'Mock Test', examNames);
    pushBreak(20, 'Evening Walk & Decompression');
    pushSlot(75, 'Block 5: Daily Consolidation & Error Diary', 'Update your personal error logbook. Re-solve questions you got wrong today.', 'Revision', examNames);
  }

  // Adjust for focus strategy
  if (focusStrategy === 'speed_drills') {
    slots.forEach(s => {
      if (s.activityType === 'Practice') {
        s.topicAdvice = `[Speed Focus] Solve under strict 45-second timer per question. Focus on shortcuts and elimination tricks.`;
      }
    });
  } else if (focusStrategy === 'deep_theory') {
    slots.forEach(s => {
      if (s.activityType === 'Concept') {
        s.topicAdvice = `[Deep Concept] Read standard author textbooks; make mind maps and flowcharts for revision.`;
      }
    });
  } else if (focusStrategy === 'revision_mocks') {
    slots.forEach(s => {
      if (s.activityType === 'Revision' || s.activityType === 'Mock Test') {
        s.topicAdvice = `[Exam Readiness] Full sectional mock test + 45-min detailed solution audit of wrong attempts.`;
      }
    });
  }

  return slots;
}

/**
 * Load saved configuration or initialize default
 */
export function getStoredStudyPlanConfig(trackedExams: TrackedExam[]): StudyPlanConfig {
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.selectedExamIds)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load study plan config', e);
  }

  // Default: use tracked exams or top 2 popular exams
  const trackedIds = trackedExams.map(t => t.examId);
  const selectedExamIds = trackedIds.length > 0 
    ? trackedIds 
    : ['upsc-cse', 'ssc-cgl'];

  return {
    selectedExamIds,
    dailyHoursTarget: 4,
    routineStyle: 'daytime',
    focusStrategy: 'balanced'
  };
}

export function saveStudyPlanConfig(config: StudyPlanConfig): void {
  try {
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save study plan config', e);
  }
}

/**
 * Load stored slots or generate fresh ones
 */
export function getStoredStudySlots(config: StudyPlanConfig): StudySlot[] {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem(STORAGE_DATE_KEY);
    const raw = localStorage.getItem(STORAGE_SLOTS_KEY);
    
    if (raw) {
      const parsed: StudySlot[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If it's a new calendar day, reset completion checkboxes
        if (savedDate !== todayStr) {
          const reset = parsed.map(p => ({ ...p, isCompleted: false }));
          localStorage.setItem(STORAGE_DATE_KEY, todayStr);
          localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(reset));
          return reset;
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load study slots', e);
  }

  const generated = generateSmartStudySchedule(config);
  saveStudySlots(generated);
  return generated;
}

export function saveStudySlots(slots: StudySlot[]): void {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_DATE_KEY, todayStr);
    localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(slots));
  } catch (e) {
    console.error('Failed to save study slots', e);
  }
}

/**
 * Generate formatted text for copying to WhatsApp/Notion/Notes
 */
export function formatScheduleAsText(slots: StudySlot[], config: StudyPlanConfig): string {
  const exams = EXAMS_DATA.filter(e => config.selectedExamIds.includes(e.id));
  const examTitles = exams.map(e => e.shortName).join(' & ');
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const lines: string[] = [];
  lines.push(`📚 DAILY STUDY SCHEDULE (${today})`);
  lines.push(`🎯 Target Exams: ${examTitles || 'Competitive Exams'}`);
  lines.push(`⏱️ Daily Target: ${config.dailyHoursTarget} Hours | Rhythm: ${config.routineStyle.replace('_', ' ').toUpperCase()}`);
  lines.push(`----------------------------------------`);

  slots.forEach(slot => {
    if (slot.activityType === 'Break') {
      lines.push(`☕ ${slot.startTime} - ${slot.endTime} (${slot.durationMinutes}m): ${slot.subject}`);
    } else {
      const mark = slot.isCompleted ? '[x]' : '[ ]';
      lines.push(`${mark} ${slot.startTime} - ${slot.endTime} (${slot.durationMinutes}m) | ${slot.subject}`);
      lines.push(`   Focus: ${slot.topicAdvice}`);
      if (slot.applicableExams.length > 0) {
        lines.push(`   Applies to: ${slot.applicableExams.join(', ')}`);
      }
    }
  });

  lines.push(`----------------------------------------`);
  lines.push(`Created with GovtCareers Compass Study Planner`);
  return lines.join('\n');
}
