import React from 'react';
import { ExamOpportunity, UserProfile, DetailedEligibilityResult } from '../types';
import { evaluateEligibility } from '../utils/eligibilityEngine';
import { SupportedLanguage, getTranslation } from '../utils/translations';
import { CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Calendar, Bookmark, Building2 } from 'lucide-react';

interface ExamCardProps {
  exam: ExamOpportunity;
  userProfile: UserProfile;
  isTracked: boolean;
  onSelectExam: (exam: ExamOpportunity) => void;
  onToggleTrack: (examId: string) => void;
  currentLang: SupportedLanguage;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  userProfile,
  isTracked,
  onSelectExam,
  onToggleTrack,
  currentLang
}) => {
  const t = (k: string) => getTranslation(currentLang, k);
  const result: DetailedEligibilityResult = evaluateEligibility(userProfile, exam);

  return (
    <div className={`rounded-xl border transition-all p-4 sm:p-5 flex flex-col justify-between hover:shadow-md group ${
      result.verdict === 'Eligible'
        ? 'bg-white border-slate-200 hover:border-emerald-400'
        : result.verdict === 'Eligible with Conditions'
        ? 'bg-white border-slate-200 hover:border-amber-400'
        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 opacity-90'
    }`}>
      <div>
        {/* Top Header: Conducting Body & Sector */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-slate-800">{exam.conductingBody.split(' ')[0]}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{exam.sector}</span>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              onToggleTrack(exam.id);
            }}
            title={isTracked ? t('savedInTracker') : t('saveToTracker')}
            className={`p-1 rounded transition-colors ${
              isTracked
                ? 'text-indigo-600 hover:text-indigo-700 bg-indigo-50'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isTracked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Exam Title */}
        <h3
          onClick={() => onSelectExam(exam)}
          className="font-display text-base font-bold text-slate-900 group-hover:text-indigo-900 cursor-pointer leading-snug mb-2"
        >
          {exam.shortName}
        </h3>

        {/* Clear, student-friendly role explanation */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {exam.jobSummarySimple}
        </p>

        {/* Unboxed clean stats: Salary & Posts */}
        <div className="py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 mb-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-medium">{t('inHandSalary')}</span>
            <span className="font-semibold text-slate-900 font-mono tabular-nums">
              {exam.approxInHandMonthlySalary.split('(')[0]}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">{t('vacancies')}</span>
            <span className="font-semibold text-slate-900 font-mono tabular-nums">
              {exam.vacanciesCount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Dynamic Personal Eligibility Verdict with high visual clarity */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-start gap-2">
            {result.verdict === 'Eligible' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            {result.verdict === 'Eligible with Conditions' && (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            {result.verdict === 'Not Eligible' && (
              <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            )}

            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${
                  result.verdict === 'Eligible'
                    ? 'text-emerald-700'
                    : result.verdict === 'Eligible with Conditions'
                    ? 'text-amber-700'
                    : 'text-rose-700'
                }`}>
                  {result.verdict === 'Eligible' && t('verdictEligible')}
                  {result.verdict === 'Eligible with Conditions' && t('verdictConditional')}
                  {result.verdict === 'Not Eligible' && t('verdictIneligible')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                {result.verdict === 'Eligible' && result.ageCheck.plainReason}
                {result.verdict === 'Eligible with Conditions' && (result.actionableStudentAdvice[0] || result.finalYearCheck.plainReason)}
                {result.verdict === 'Not Eligible' && result.verdictSummary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Deadline & Action */}
      <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{t('lastDate')}: <strong className="text-slate-800 font-mono">{exam.applicationEndDate}</strong></span>
        </div>

        <button
          onClick={() => onSelectExam(exam)}
          className="font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 transition-colors"
        >
          <span>{t('viewDetails')}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
