import React, { useState, useEffect, useMemo } from 'react';
import { 
  StudySlot, 
  StudyPlanConfig, 
  RoutineStyle, 
  FocusStrategy,
  getDaysRemaining, 
  formatMinutes, 
  isSlotActiveNow,
  getStoredStudyPlanConfig, 
  saveStudyPlanConfig,
  getStoredStudySlots, 
  saveStudySlots,
  generateSmartStudySchedule, 
  formatScheduleAsText,
  getAggregatedSyllabus 
} from '../utils/studyPlannerUtils';
import { TrackedExam, ExamOpportunity } from '../types';
import { EXAMS_DATA } from '../data/examsData';
import { 
  Calendar, Clock, CheckCircle2, Circle, Play, Pause, RotateCcw, 
  Sparkles, Copy, Check, Printer, Plus, Trash2, Sliders, 
  Sun, Moon, Zap, Coffee, ArrowUpRight, 
  ChevronDown, ChevronUp, Layers, Target, BookOpen, AlertCircle
} from 'lucide-react';

interface StudyPlannerProps {
  trackedExams: TrackedExam[];
  onSelectExam?: (exam: ExamOpportunity) => void;
  onGoToOpportunities?: () => void;
  onToggleTrack?: (examId: string) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  trackedExams,
  onSelectExam,
  onGoToOpportunities,
  onToggleTrack
}) => {
  // Load configuration
  const [config, setConfig] = useState<StudyPlanConfig>(() => getStoredStudyPlanConfig(trackedExams));
  
  // Load slots
  const [slots, setSlots] = useState<StudySlot[]>(() => getStoredStudySlots(config));

  // UI state
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTimerSlot, setActiveTimerSlot] = useState<StudySlot | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerTotalMinutes, setTimerTotalMinutes] = useState<number>(25);

  // New slot modal / form state
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [newSlotSubject, setNewSlotSubject] = useState('');
  const [newSlotTopic, setNewSlotTopic] = useState('');
  const [newSlotStart, setNewSlotStart] = useState('06:00 PM');
  const [newSlotDuration, setNewSlotDuration] = useState(60);
  const [newSlotType, setNewSlotType] = useState<StudySlot['activityType']>('Practice');

  // Keep active slot clock updated every 30s
  const [currentTick, setCurrentTick] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTick(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  // Sync config when trackedExams changes if user has no selected exams
  useEffect(() => {
    if (config.selectedExamIds.length === 0 && trackedExams.length > 0) {
      const updatedConfig = {
        ...config,
        selectedExamIds: trackedExams.map(t => t.examId)
      };
      setConfig(updatedConfig);
      saveStudyPlanConfig(updatedConfig);
      const newSlots = generateSmartStudySchedule(updatedConfig);
      setSlots(newSlots);
      saveStudySlots(newSlots);
    }
  }, [trackedExams]);

  // Pomodoro countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Auto mark slot as completed if one is active
      if (activeTimerSlot) {
        toggleComplete(activeTimerSlot.id, true);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft, activeTimerSlot]);

  // Calculate stats
  const activeExams = useMemo(() => {
    return EXAMS_DATA.filter(e => config.selectedExamIds.includes(e.id));
  }, [config.selectedExamIds]);

  const studySlotsOnly = useMemo(() => {
    return slots.filter(s => s.activityType !== 'Break');
  }, [slots]);

  const completedCount = useMemo(() => {
    return studySlotsOnly.filter(s => s.isCompleted).length;
  }, [studySlotsOnly]);

  const totalStudyMinutes = useMemo(() => {
    return studySlotsOnly.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  }, [studySlotsOnly]);

  const completedStudyMinutes = useMemo(() => {
    return studySlotsOnly.filter(s => s.isCompleted).reduce((acc, curr) => acc + curr.durationMinutes, 0);
  }, [studySlotsOnly]);

  const completionPercent = useMemo(() => {
    if (studySlotsOnly.length === 0) return 0;
    return Math.round((completedCount / studySlotsOnly.length) * 100);
  }, [completedCount, studySlotsOnly.length]);

  // Nearest exam date calculation
  const nearestExam = useMemo(() => {
    if (activeExams.length === 0) return null;
    const sorted = [...activeExams].sort((a, b) => {
      const daysA = getDaysRemaining(a.tentativeExamDate);
      const daysB = getDaysRemaining(b.tentativeExamDate);
      return daysA - daysB;
    });
    return sorted[0];
  }, [activeExams]);

  // Toggle slot completion
  const toggleComplete = (slotId: string, forceStatus?: boolean) => {
    const updated = slots.map(slot => {
      if (slot.id === slotId) {
        return {
          ...slot,
          isCompleted: forceStatus !== undefined ? forceStatus : !slot.isCompleted
        };
      }
      return slot;
    });
    setSlots(updated);
    saveStudySlots(updated);
  };

  // Reset today's progress
  const handleResetCheckmarks = () => {
    if (window.confirm("Reset all checkmarks for today's schedule?")) {
      const updated = slots.map(s => ({ ...s, isCompleted: false }));
      setSlots(updated);
      saveStudySlots(updated);
    }
  };

  // Re-generate schedule based on current config
  const handleRegenerate = (customConfig?: StudyPlanConfig) => {
    const cfg = customConfig || config;
    const newSlots = generateSmartStudySchedule(cfg);
    setSlots(newSlots);
    saveStudySlots(newSlots);
  };

  // Exam toggle in plan
  const handleToggleExamInPlan = (examId: string) => {
    const exists = config.selectedExamIds.includes(examId);
    let updatedIds: string[];
    if (exists) {
      updatedIds = config.selectedExamIds.filter(id => id !== examId);
    } else {
      updatedIds = [...config.selectedExamIds, examId];
    }
    const updatedConfig = { ...config, selectedExamIds: updatedIds };
    setConfig(updatedConfig);
    saveStudyPlanConfig(updatedConfig);
    handleRegenerate(updatedConfig);
  };

  // Update target hours
  const handleUpdateHours = (hours: number) => {
    const updatedConfig = { ...config, dailyHoursTarget: hours };
    setConfig(updatedConfig);
    saveStudyPlanConfig(updatedConfig);
    handleRegenerate(updatedConfig);
  };

  // Update routine rhythm
  const handleUpdateRoutine = (routine: RoutineStyle) => {
    const updatedConfig = { ...config, routineStyle: routine };
    setConfig(updatedConfig);
    saveStudyPlanConfig(updatedConfig);
    handleRegenerate(updatedConfig);
  };

  // Update focus strategy
  const handleUpdateStrategy = (strategy: FocusStrategy) => {
    const updatedConfig = { ...config, focusStrategy: strategy };
    setConfig(updatedConfig);
    saveStudyPlanConfig(updatedConfig);
    handleRegenerate(updatedConfig);
  };

  // Delete slot
  const handleDeleteSlot = (slotId: string) => {
    const updated = slots.filter(s => s.id !== slotId);
    setSlots(updated);
    saveStudySlots(updated);
  };

  // Copy schedule to clipboard
  const handleCopySchedule = () => {
    const text = formatScheduleAsText(slots, config);
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(() => {
      // Fallback
    });
  };

  // Print schedule
  const handlePrintSchedule = () => {
    window.print();
  };

  // Launch focus timer for a slot
  const handleStartTimerForSlot = (slot: StudySlot) => {
    setActiveTimerSlot(slot);
    const duration = Math.min(slot.durationMinutes, 50);
    setTimerTotalMinutes(duration);
    setTimerSecondsLeft(duration * 60);
    setIsTimerRunning(true);
  };

  // Add custom slot handler
  const handleAddCustomSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotSubject.trim()) return;

    const newSlot: StudySlot = {
      id: `custom-${Date.now()}`,
      startTime: newSlotStart,
      endTime: 'Custom',
      start24: '18:00',
      end24: '19:00',
      durationMinutes: newSlotDuration,
      subject: newSlotSubject.trim(),
      topicAdvice: newSlotTopic.trim() || 'Custom targeted study session',
      activityType: newSlotType,
      applicableExams: activeExams.map(e => e.shortName),
      isCompleted: false
    };

    const updated = [...slots, newSlot];
    setSlots(updated);
    saveStudySlots(updated);
    setIsAddSlotOpen(false);
    setNewSlotSubject('');
    setNewSlotTopic('');
  };

  // Today formatted
  const todayFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-medium border border-indigo-400/20 backdrop-blur-xs">
              <Calendar className="w-3.5 h-3.5 text-indigo-300" />
              <span>{todayFormatted}</span>
              <span className="w-1 h-1 rounded-full bg-indigo-300"></span>
              <span>Intelligent Daily Study Schedule</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Study Planner & Routine Compass
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl leading-relaxed">
              Designed around the exams you are tracking. Aligns your daily hours with the common 70% syllabus overlap so you prepare smarter with zero burnout.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {nearestExam && (
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-xl p-3.5 min-w-[140px] text-center">
                <span className="text-[11px] text-indigo-200 font-medium block uppercase tracking-wider">
                  Nearest Target
                </span>
                <span className="text-lg font-bold text-white block mt-0.5 truncate max-w-[160px]">
                  {nearestExam.shortName}
                </span>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-semibold border border-emerald-400/30">
                  {getDaysRemaining(nearestExam.tentativeExamDate)} days to exam
                </span>
              </div>
            )}

            <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-xl p-3.5 min-w-[140px] text-center">
              <span className="text-[11px] text-indigo-200 font-medium block uppercase tracking-wider">
                Today's Target
              </span>
              <span className="text-lg font-bold text-white block mt-0.5">
                {formatMinutes(completedStudyMinutes)} / {formatMinutes(totalStudyMinutes)}
              </span>
              <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 font-semibold border border-indigo-400/30">
                {completedCount} of {studySlotsOnly.length} sessions ({completionPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Action Toolstrip */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5 border border-white/10"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isConfigOpen ? 'Hide Routine Settings' : 'Customize Routine & Hours'}</span>
              {isConfigOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleRegenerate()}
              className="px-3.5 py-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium transition-colors flex items-center gap-1.5 border border-indigo-400/30"
              title="Rebalance schedule using AI optimizer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Auto-Optimize Schedule</span>
            </button>

            <button
              onClick={() => setIsAddSlotOpen(true)}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5 border border-white/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Block</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySchedule}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5 border border-white/10"
              title="Copy formatted schedule for WhatsApp or Notion"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied to Clipboard!' : 'Share / Copy Text'}</span>
            </button>

            <button
              onClick={handlePrintSchedule}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10"
              title="Print schedule"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetCheckmarks}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10"
              title="Reset today's checkboxes"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tracked Exams Selection Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Target Examinations Driving This Daily Schedule</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select which exams you are actively preparing for today. The planner merges their high-yield syllabus topics.
            </p>
          </div>

          {onGoToOpportunities && (
            <button
              onClick={onGoToOpportunities}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore More Exams</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Exams Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {EXAMS_DATA.map(exam => {
            const isTracked = trackedExams.some(t => t.examId === exam.id);
            const isSelectedInPlan = config.selectedExamIds.includes(exam.id);

            // Show tracked exams or popular ones
            if (!isTracked && !exam.isPopular && !isSelectedInPlan) return null;

            const daysLeft = getDaysRemaining(exam.tentativeExamDate);

            return (
              <button
                key={exam.id}
                onClick={() => {
                  handleToggleExamInPlan(exam.id);
                  if (!isTracked && onToggleTrack) {
                    onToggleTrack(exam.id);
                  }
                }}
                className={`group relative px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 border ${
                  isSelectedInPlan
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  isSelectedInPlan ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isSelectedInPlan && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="text-left">
                  <span className="font-semibold block">{exam.shortName}</span>
                  <span className="text-[10px] text-slate-500 block">
                    {exam.conductingBody.split('(')[0].trim()} • {daysLeft > 0 ? `${daysLeft}d left` : 'Ongoing'}
                  </span>
                </div>

                {isTracked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Tracked in your pipeline" />
                )}
              </button>
            );
          })}
        </div>

        {/* Synergy notification when 2+ exams are chosen */}
        {activeExams.length >= 2 && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-semibold">Syllabus Synergy Active:</strong> Preparing for{' '}
              {activeExams.map(e => e.shortName).join(' & ')} together. The common 70% core (Arithmetic, General Intelligence, Indian Polity, and Modern History) is consolidated so you avoid duplicate preparation!
            </div>
          </div>
        )}
      </div>

      {/* Routine Configuration Panel (Collapsible) */}
      {isConfigOpen && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Customize Your Study Capacity & Circadian Rhythm</span>
              </h4>
              <p className="text-xs text-slate-500">
                Adapt your study schedule to fit college classes, part-time jobs, or full-time aspirant routines.
              </p>
            </div>
            <button
              onClick={() => setIsConfigOpen(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Daily Hours Budget */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Daily Study Target
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { hrs: 2, label: '2 Hours', desc: 'College / Working' },
                  { hrs: 4, label: '4 Hours', desc: 'Final Year / Serious' },
                  { hrs: 6, label: '6 Hours', desc: 'Intensive Aspirant' },
                  { hrs: 8, label: '8 Hours', desc: 'Full-Time Dedicated' }
                ].map(item => (
                  <button
                    key={item.hrs}
                    onClick={() => handleUpdateHours(item.hrs)}
                    className={`p-2.5 rounded-lg text-left border transition-all text-xs ${
                      config.dailyHoursTarget === item.hrs
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold block">{item.label}</span>
                    <span className={`text-[10px] block ${config.dailyHoursTarget === item.hrs ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Routine Rhythm */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Circadian Routine Style
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'early_bird', name: 'Early Bird (06:00 AM)', icon: Sun, desc: 'Fresh morning focus for heavy GK' },
                  { id: 'daytime', name: 'Standard Day (08:30 AM)', icon: Clock, desc: 'Balanced library / daytime rhythm' },
                  { id: 'split_schedule', name: 'Split Morning & Evening', icon: Zap, desc: 'Ideal for college & office goers' },
                  { id: 'night_owl', name: 'Night Owl (02:00 PM)', icon: Moon, desc: 'Afternoon & late night study sessions' }
                ].map(r => {
                  const Icon = r.icon;
                  const isSelected = config.routineStyle === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleUpdateRoutine(r.id as RoutineStyle)}
                      className={`w-full p-2 rounded-lg text-left border transition-all text-xs flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <div>
                        <span className="font-bold block">{r.name}</span>
                        <span className={`text-[10px] block ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {r.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Focus Strategy */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Preparation Focus Strategy
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'balanced', name: 'Balanced Foundation', desc: 'Equal split between theory, math drills & news' },
                  { id: 'speed_drills', name: 'Speed & MCQ Drills', desc: 'High-intensity math shortcut practice' },
                  { id: 'deep_theory', name: 'Deep Textbook Theory', desc: 'NCERT & Laxmikanth conceptual reading' },
                  { id: 'revision_mocks', name: 'Revision & Mock Crunch', desc: 'For students with exams within 45 days' }
                ].map(f => {
                  const isSelected = config.focusStrategy === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleUpdateStrategy(f.id as FocusStrategy)}
                      className={`w-full p-2.5 rounded-lg text-left border transition-all text-xs ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-bold block">{f.name}</span>
                      <span className={`text-[10px] block ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {f.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Focus Timer Floating Bar (When active) */}
      {activeTimerSlot && (
        <div className="bg-slate-900 text-white rounded-xl p-4 shadow-xl border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/30 border border-indigo-500 text-indigo-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">
                Live Focus Session
              </div>
              <div className="text-sm font-bold text-white truncate max-w-sm">
                {activeTimerSlot.subject}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-2xl font-mono font-bold text-amber-400">
              {Math.floor(timerSecondsLeft / 60).toString().padStart(2, '0')}:
              {(timerSecondsLeft % 60).toString().padStart(2, '0')}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Resume'}</span>
              </button>

              <button
                onClick={() => {
                  toggleComplete(activeTimerSlot.id, true);
                  setActiveTimerSlot(null);
                  setIsTimerRunning(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Completed</span>
              </button>

              <button
                onClick={() => {
                  setActiveTimerSlot(null);
                  setIsTimerRunning(false);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Close Timer"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              Today's Schedule Progress
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {completionPercent}% Achieved
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {completedCount} of {studySlotsOnly.length} Study Slots Finished ({formatMinutes(completedStudyMinutes)} studied)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              completionPercent === 100
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'bg-gradient-to-r from-indigo-500 to-indigo-600'
            }`}
            style={{ width: `${Math.min(completionPercent, 100)}%` }}
          />
        </div>

        {completionPercent === 100 && (
          <div className="mt-3 p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Outstanding consistency! You have completed all scheduled study sessions for today. Time for restorative sleep!</span>
          </div>
        )}
      </div>

      {/* Timeline Schedule Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Today's Chronological Schedule</span>
          </h3>
          <span className="text-xs text-slate-500">
            Click checkbox to mark session as done
          </span>
        </div>

        <div className="space-y-3">
          {slots.map((slot) => {
            const isBreak = slot.activityType === 'Break';
            const isActiveNow = !isBreak && isSlotActiveNow(slot.start24, slot.end24);

            if (isBreak) {
              return (
                <div
                  key={slot.id}
                  className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs text-slate-500"
                >
                  <div className="flex items-center gap-2.5">
                    <Coffee className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="font-medium text-slate-700">{slot.subject}</span>
                      <span className="text-[11px] text-slate-500 ml-2">({slot.startTime} - {slot.endTime} • {slot.durationMinutes} mins)</span>
                    </div>
                  </div>
                  <span className="text-[11px] italic text-slate-400 hidden sm:inline">
                    {slot.topicAdvice}
                  </span>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                    title="Remove break"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            }

            // Regular study slot
            const typeColorMap = {
              'Concept': 'bg-indigo-50 text-indigo-700 border-indigo-200',
              'Practice': 'bg-violet-50 text-violet-700 border-violet-200',
              'Current Affairs': 'bg-emerald-50 text-emerald-700 border-emerald-200',
              'Revision': 'bg-amber-50 text-amber-700 border-amber-200',
              'Mock Test': 'bg-rose-50 text-rose-700 border-rose-200',
              'Break': 'bg-slate-50 text-slate-700 border-slate-200'
            };

            return (
              <div
                key={slot.id}
                className={`relative rounded-xl border p-4 sm:p-5 transition-all shadow-xs ${
                  slot.isCompleted
                    ? 'bg-slate-50/80 border-slate-200 opacity-80'
                    : isActiveNow
                    ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleComplete(slot.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                    title={slot.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {slot.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-6 h-6 hover:text-indigo-600" />
                    )}
                  </button>

                  {/* Slot Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {/* Time Pill */}
                      <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                        {slot.startTime} - {slot.endTime} ({slot.durationMinutes}m)
                      </span>

                      {/* Activity Badge */}
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${typeColorMap[slot.activityType]}`}>
                        {slot.activityType}
                      </span>

                      {/* Active Now Pill */}
                      {isActiveNow && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          Active Right Now
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold mb-1 ${slot.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {slot.subject}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                      {slot.topicAdvice}
                    </p>

                    {/* Footer tags & applicable exams */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5 text-slate-500">
                        <span className="text-[11px] font-medium text-slate-400">Covers:</span>
                        {slot.applicableExams.map((examName, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                          >
                            {examName}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartTimerForSlot(slot)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1"
                          title="Start dedicated focus session with timer"
                        >
                          <Play className="w-3 h-3" />
                          <span>Focus Timer</span>
                        </button>

                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-md transition-colors"
                          title="Delete slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom Slot Modal */}
      {isAddSlotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Add Custom Study Block
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add your own college assignment, revision session, or library block to today's schedule.
            </p>

            <form onSubmit={handleAddCustomSlot} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject / Activity Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern History Spectrum Chapter 5"
                  value={newSlotSubject}
                  onChange={e => setNewSlotSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic Focus / Tasks
                </label>
                <input
                  type="text"
                  placeholder="e.g. Read 20 pages + solve 15 PYQs"
                  value={newSlotTopic}
                  onChange={e => setNewSlotTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={newSlotStart}
                    onChange={e => setNewSlotStart(e.target.value)}
                    placeholder="06:00 PM"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={240}
                    step={15}
                    value={newSlotDuration}
                    onChange={e => setNewSlotDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Session Type
                </label>
                <select
                  value={newSlotType}
                  onChange={e => setNewSlotType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Concept">Concept Theory</option>
                  <option value="Practice">Practice & Problem Solving</option>
                  <option value="Current Affairs">Current Affairs & Editorial</option>
                  <option value="Revision">Revision & Active Recall</option>
                  <option value="Mock Test">Mock Test / Sectional Test</option>
                  <option value="Break">Rest / Break</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddSlotOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
