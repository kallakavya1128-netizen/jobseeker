import React, { useState } from 'react';
import { ExamOpportunity, UserProfile, DetailedEligibilityResult, TrackedExam } from '../types';
import { evaluateEligibility } from '../utils/eligibilityEngine';
import { 
  X, CheckCircle2, AlertTriangle, XCircle, ExternalLink, Bookmark,
  Calendar, Briefcase, GraduationCap, Award, ChevronRight, FileText, Check, ShieldAlert
} from 'lucide-react';

interface ExamDetailModalProps {
  exam: ExamOpportunity | null;
  userProfile: UserProfile;
  trackedExam?: TrackedExam;
  onClose: () => void;
  onUpdateTracked: (tracked: TrackedExam) => void;
  onRemoveTracked: (examId: string) => void;
}

export const ExamDetailModal: React.FC<ExamDetailModalProps> = ({
  exam,
  userProfile,
  trackedExam,
  onClose,
  onUpdateTracked,
  onRemoveTracked
}) => {
  const [activeTab, setActiveTab] = useState<'eligibility' | 'job' | 'stages' | 'syllabus'>('eligibility');
  const [trackingStatus, setTrackingStatus] = useState<any>(trackedExam?.status || 'Interested');

  if (!exam) return null;

  const result: DetailedEligibilityResult = evaluateEligibility(userProfile, exam);
  const isTracked = !!trackedExam;

  const handleToggleTracking = () => {
    if (isTracked) {
      onRemoveTracked(exam.id);
    } else {
      onUpdateTracked({
        examId: exam.id,
        status: trackingStatus,
        notes: 'Targeting this notification',
        targetExamYear: 2026,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        documentsPrepared: {
          idProof: true,
          categoryCertificate: false,
          graduationCertificate: false,
          passportPhoto: true,
          signatureFile: true,
          domicileCertificate: false
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{exam.conductingBody}</span>
              <span aria-hidden="true">·</span>
              <span>{exam.sector}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700">{exam.payGroup}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              {exam.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action and Key Stats Bar */}
        <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block">Est. Monthly In-Hand</span>
              <strong className="text-sm text-slate-900 font-mono tabular-nums">
                {exam.approxInHandMonthlySalary.split('(')[0]}
              </strong>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <span className="text-[11px] text-slate-400 block">Vacancies</span>
              <strong className="text-sm text-slate-900 font-mono tabular-nums">
                {exam.vacanciesCount.toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <span className="text-[11px] text-slate-400 block">Application Deadline</span>
              <strong className="text-sm text-rose-600 font-mono">
                {exam.applicationEndDate}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleTracking}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                isTracked
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isTracked ? 'fill-current' : ''}`} />
              <span>{isTracked ? 'Tracking in My Pipeline' : 'Add to My Tracker'}</span>
            </button>

            <a
              href={exam.conductingBodyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'eligibility'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Your Eligibility Breakdown
          </button>
          <button
            onClick={() => setActiveTab('job')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'job'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Role, Salary & Career Growth
          </button>
          <button
            onClick={() => setActiveTab('stages')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'stages'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Selection Stages & Exam Pattern
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'syllabus'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Syllabus & Preparation Strategy
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ELIGIBILITY BREAKDOWN */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              {/* Verdict Banner */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                result.verdict === 'Eligible'
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : result.verdict === 'Eligible with Conditions'
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}>
                {result.verdict === 'Eligible' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                {result.verdict === 'Eligible with Conditions' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                {result.verdict === 'Not Eligible' && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}

                <div>
                  <div className="font-bold text-sm">
                    {result.verdict === 'Eligible' && 'You Meet 100% Official Eligibility Requirements'}
                    {result.verdict === 'Eligible with Conditions' && 'Conditionally Eligible for this Examination'}
                    {result.verdict === 'Not Eligible' && 'Ineligible Under Official Notification Rules'}
                  </div>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {result.verdictSummary}
                  </p>
                </div>
              </div>

              {/* Requirement Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Notification Requirement Verification (Evaluated Against Your Profile)
                </h4>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {/* Age Check */}
                  <div className="p-3.5 bg-white flex items-start gap-3">
                    {result.ageCheck.isPass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">Age & Category Relaxations</strong>
                        <span className={`text-[11px] font-mono ${result.ageCheck.isPass ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {result.ageCheck.isPass ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{result.ageCheck.plainReason}</p>
                    </div>
                  </div>

                  {/* Qualification Check */}
                  <div className="p-3.5 bg-white flex items-start gap-3">
                    {result.qualificationCheck.isPass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">Educational Qualification & Stream</strong>
                        <span className={`text-[11px] font-mono ${result.qualificationCheck.isPass ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {result.qualificationCheck.isPass ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{result.qualificationCheck.plainReason}</p>
                    </div>
                  </div>

                  {/* Score Percentage */}
                  <div className="p-3.5 bg-white flex items-start gap-3">
                    {result.scorePercentageCheck.isPass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">Minimum Academic Percentage Threshold</strong>
                        <span className={`text-[11px] font-mono ${result.scorePercentageCheck.isPass ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {result.scorePercentageCheck.isPass ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{result.scorePercentageCheck.plainReason}</p>
                    </div>
                  </div>

                  {/* Final Year Status */}
                  <div className="p-3.5 bg-white flex items-start gap-3">
                    {result.finalYearCheck.isPass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">Final-Year Appearing Eligibility</strong>
                        <span className={`text-[11px] font-mono ${result.finalYearCheck.isPass ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {result.finalYearCheck.isPass ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{result.finalYearCheck.plainReason}</p>
                    </div>
                  </div>

                  {/* Special criteria */}
                  {exam.requirements.specialRequirements && exam.requirements.specialRequirements.length > 0 && (
                    <div className="p-3.5 bg-white flex items-start gap-3">
                      <FileText className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <strong className="text-slate-900 block mb-1">Official Commission Notes</strong>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600">
                          {exam.requirements.specialRequirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actionable Student Advice */}
              {result.actionableStudentAdvice.length > 0 && (
                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl">
                  <h4 className="text-xs font-bold text-indigo-950 mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span>Next Action Steps For You:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-indigo-900">
                    {result.actionableStudentAdvice.map((adv, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold">·</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: JOB REALITY & SALARY */}
          {activeTab === 'job' && (
            <div className="space-y-5 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-sm text-slate-900 mb-2">What Does This Job Actually Do?</h4>
                <p className="text-slate-700 leading-relaxed">{exam.jobSummarySimple}</p>
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <strong className="text-slate-900 block mb-1">Day-in-the-Life Reality:</strong>
                  <p className="text-slate-600 leading-relaxed">{exam.dayInTheLife}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-sm text-slate-900 mb-2">Pay & Compensation Demystified</h4>
                <div className="space-y-2 text-slate-700">
                  <p>
                    <strong>7th CPC Matrix:</strong> {exam.payLevel7thCPC}
                  </p>
                  <p>
                    <strong>Estimated In-Hand Starting Pay:</strong> <span className="font-mono font-semibold text-slate-900">{exam.approxInHandMonthlySalary}</span>
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    *In-hand salary includes Basic Pay + 50% Dearness Allowance (DA) + House Rent Allowance (27-30% in Class X metro cities like Delhi/Mumbai/Bengaluru) + Transport Allowance (TA) after National Pension System (NPS) deduction.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-sm text-slate-900 mb-2">Long-Term Career Progression</h4>
                <p className="text-slate-700 leading-relaxed">{exam.careerGrowthPlain}</p>
              </div>
            </div>
          )}

          {/* TAB 3: SELECTION STAGES */}
          {activeTab === 'stages' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 mb-2">
                This recruitment follows a multi-stage transparent competitive process. Clear each tier to proceed:
              </div>

              <div className="space-y-3">
                {exam.selectionStages.map((stage, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      {stage.stageNumber}
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-sm text-slate-900">{stage.title}</strong>
                        <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {stage.mode}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{stage.description}</p>
                      {stage.weightage && (
                        <div className="mt-2 text-indigo-700 font-semibold font-mono text-[11px]">
                          Weightage: {stage.weightage}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SYLLABUS & ADVICE */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 mb-2">
                Core subjects and high-scoring areas based on recent trends:
              </div>

              <div className="space-y-3">
                {exam.syllabusOverview.map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-white text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-sm text-slate-900">{item.subject}</strong>
                      <span className={`text-[11px] font-semibold ${
                        item.importance === 'High' ? 'text-rose-600' : 'text-slate-500'
                      }`}>
                        {item.importance} Priority
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-[11px] text-slate-400 block mb-1">High-Frequency Topics:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyTopics.map((topic, tidx) => (
                          <span key={tidx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 text-slate-600">
                      <span className="font-semibold text-slate-800">Student Strategy Tip: </span>
                      {item.plainAdvice}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Source: Official Recruitment Notification ({exam.conductingBody})
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
